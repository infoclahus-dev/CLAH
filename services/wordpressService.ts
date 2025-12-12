const WP_API_URL = import.meta.env.VITE_WORDPRESS_API_URL || 'https://blog.clah.us/wp-json/wp/v2';

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

export async function fetchPosts(params: FetchPostsParams = {}): Promise<FetchPostsResponse> {
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

  const response = await fetch(`${WP_API_URL}/posts?${queryParams}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const posts: WPPost[] = await response.json();
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
  const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10);

  return { posts, totalPages, totalPosts };
}

export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
  const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed=true`);

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`);
  }

  const posts: WPPost[] = await response.json();
  return posts.length > 0 ? posts[0] : null;
}

export async function fetchCategories(): Promise<WPCategory[]> {
  const response = await fetch(`${WP_API_URL}/categories?per_page=100`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  return response.json();
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
    const categoryName = terms[0].name.toLowerCase();
    if (categoryName.includes('news')) return 'News';
    if (categoryName.includes('case') || categoryName.includes('study')) return 'Case Study';
    if (categoryName.includes('press')) return 'Press Release';
    if (categoryName.includes('blog')) return 'Blog';
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

export function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
