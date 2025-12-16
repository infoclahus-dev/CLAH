const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://blog.clah.us/wp-json/wp/v2';
const REQUEST_TIMEOUT = 8000;
const MAX_REDIRECTS = 5;

interface CircuitBreakerState {
  isBroken: boolean;
  failureCount: number;
  lastFailureTime: number;
}

const circuitBreaker: CircuitBreakerState = {
  isBroken: false,
  failureCount: 0,
  lastFailureTime: 0,
};

function resetCircuitBreakerIfNeeded() {
  const now = Date.now();
  if (circuitBreaker.isBroken && now - circuitBreaker.lastFailureTime > 30000) {
    circuitBreaker.isBroken = false;
    circuitBreaker.failureCount = 0;
  }
}

function recordFailure() {
  circuitBreaker.failureCount++;
  circuitBreaker.lastFailureTime = Date.now();
  if (circuitBreaker.failureCount >= 3) {
    circuitBreaker.isBroken = true;
  }
}

export interface WPAuthor {
  id: number;
  name: string;
  description: string;
  avatar_urls: {
    '24': string;
    '48': string;
    '96': string;
  };
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  featured_media: number;
  categories: number[];
  author: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
    author?: WPAuthor[];
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface FetchPostsParams {
  page?: number;
  perPage?: number;
  categories?: number[];
  search?: string;
}

export interface FetchPostsResponse {
  posts: WPPost[];
  totalPages: number;
  totalPosts: number;
}

async function fetchWithTimeout(url: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

export async function fetchPosts(params: FetchPostsParams = {}): Promise<FetchPostsResponse> {
  resetCircuitBreakerIfNeeded();

  if (circuitBreaker.isBroken) {
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }

  const { page = 1, perPage = 9, categories, search } = params;

  const queryParams = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    _embed: 'true',
  });

  if (categories && categories.length > 0) {
    queryParams.set('categories', categories.join(','));
  }

  if (search) {
    queryParams.set('search', search);
  }

  try {
    const response = await fetchWithTimeout(`${WP_API_URL}/posts?${queryParams}`);

    if (!response.ok) {
      recordFailure();
      return { posts: [], totalPages: 0, totalPosts: 0 };
    }

    const posts: WPPost[] = await response.json();
    circuitBreaker.failureCount = 0;
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);

    return { posts, totalPages, totalPosts };
  } catch (error) {
    recordFailure();
    return { posts: [], totalPages: 0, totalPosts: 0 };
  }
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  resetCircuitBreakerIfNeeded();

  if (circuitBreaker.isBroken) {
    return null;
  }

  try {
    const response = await fetchWithTimeout(`${WP_API_URL}/posts?slug=${slug}&_embed=true`);

    if (!response.ok) {
      recordFailure();
      return null;
    }

    const posts: WPPost[] = await response.json();
    circuitBreaker.failureCount = 0;
    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    recordFailure();
    return null;
  }
}

export async function fetchCategories(): Promise<WPCategory[]> {
  resetCircuitBreakerIfNeeded();

  if (circuitBreaker.isBroken) {
    return [];
  }

  try {
    const response = await fetchWithTimeout(`${WP_API_URL}/categories?per_page=100`);

    if (!response.ok) {
      recordFailure();
      return [];
    }

    const categories = await response.json();
    circuitBreaker.failureCount = 0;
    return categories;
  } catch (error) {
    recordFailure();
    return [];
  }
}

export function getPostFeaturedImage(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (media?.source_url) {
    return media.source_url;
  }
  return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
}

export function getPostCategory(post: WPPost): string {
  const terms = post._embedded?.['wp:term']?.[0];
  if (terms && terms.length > 0) {
    return terms[0].name;
  }
  return 'Blog';
}

export function formatPostDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getPostAuthor(post: WPPost): WPAuthor | null {
  const authors = post._embedded?.author;
  if (authors && authors.length > 0) {
    return authors[0];
  }
  return null;
}

export async function fetchRelatedPosts(
  categoryIds: number[],
  excludeId: number,
  limit: number = 3
): Promise<WPPost[]> {
  resetCircuitBreakerIfNeeded();

  if (categoryIds.length === 0 || circuitBreaker.isBroken) {
    return [];
  }

  const queryParams = new URLSearchParams({
    per_page: String(limit + 1),
    categories: categoryIds.join(','),
    exclude: String(excludeId),
    _embed: 'true',
  });

  try {
    const response = await fetchWithTimeout(`${WP_API_URL}/posts?${queryParams}`);

    if (!response.ok) {
      recordFailure();
      return [];
    }

    const posts: WPPost[] = await response.json();
    circuitBreaker.failureCount = 0;
    return posts.slice(0, limit);
  } catch (error) {
    recordFailure();
    return [];
  }
}
