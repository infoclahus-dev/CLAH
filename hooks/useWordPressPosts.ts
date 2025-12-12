import { useState, useEffect, useCallback } from 'react';
import {
  fetchPosts,
  fetchCategories,
  getPostFeaturedImage,
  getPostCategory,
  formatPostDate,
  WPPost,
  WPCategory,
} from '../services/wordpressService';
import { ResourceItem } from '../types';
import { SAMPLE_RESOURCES } from '../constants';

interface UseWordPressPostsOptions {
  perPage?: number;
  categorySlug?: string;
}

interface UseWordPressPostsReturn {
  posts: ResourceItem[];
  categories: WPCategory[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  totalPosts: number;
}

function mapWPPostToResource(post: WPPost): ResourceItem {
  return {
    id: String(post.id),
    title: {
      vn: post.title.rendered,
      en: post.title.rendered,
    },
    category: getPostCategory(post),
    date: formatPostDate(post.date),
    image: getPostFeaturedImage(post),
    link: post.link,
  };
}

export function useWordPressPosts(options: UseWordPressPostsOptions = {}): UseWordPressPostsReturn {
  const { perPage = 9, categorySlug } = options;

  const [posts, setPosts] = useState<ResourceItem[]>([]);
  const [categories, setCategories] = useState<WPCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const loadPosts = useCallback(async (pageNum: number, append: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const categoryIds: number[] = [];
      if (categorySlug && categorySlug !== 'all') {
        const matchedCategory = categories.find(
          (cat) => cat.slug.toLowerCase() === categorySlug.toLowerCase()
        );
        if (matchedCategory) {
          categoryIds.push(matchedCategory.id);
        }
      }

      const response = await fetchPosts({
        page: pageNum,
        perPage,
        categories: categoryIds.length > 0 ? categoryIds : undefined,
      });

      const mappedPosts = response.posts.map(mapWPPostToResource);

      if (append) {
        setPosts((prev) => [...prev, ...mappedPosts]);
      } else {
        setPosts(mappedPosts);
      }

      setTotalPages(response.totalPages);
      setTotalPosts(response.totalPosts);
    } catch (err) {
      console.error('Error fetching WordPress posts:', err);
      setError('Failed to load posts');
      if (!append && posts.length === 0) {
        setPosts(SAMPLE_RESOURCES);
      }
    } finally {
      setLoading(false);
    }
  }, [categorySlug, categories, perPage, posts.length]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const wpCategories = await fetchCategories();
        setCategories(wpCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    setPage(1);
    loadPosts(1, false);
  }, [categorySlug, categories]);

  const loadMore = useCallback(() => {
    if (page < totalPages && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPosts(nextPage, true);
    }
  }, [page, totalPages, loading, loadPosts]);

  return {
    posts,
    categories,
    loading,
    error,
    hasMore: page < totalPages,
    loadMore,
    totalPosts,
  };
}
