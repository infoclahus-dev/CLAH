import { useState, useEffect } from 'react';
import {
  fetchPostBySlug,
  fetchRelatedPosts,
  WPPost,
} from '../services/wordpressService';

interface UseWordPressPostReturn {
  post: WPPost | null;
  relatedPosts: WPPost[];
  loading: boolean;
  error: string | null;
}

export function useWordPressPost(slug: string): UseWordPressPostReturn {
  const [post, setPost] = useState<WPPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<WPPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedPost = await fetchPostBySlug(slug);

        if (!fetchedPost) {
          setError('Post not found');
          setPost(null);
          setRelatedPosts([]);
          return;
        }

        setPost(fetchedPost);

        if (fetchedPost.categories && fetchedPost.categories.length > 0) {
          const related = await fetchRelatedPosts(
            fetchedPost.categories,
            fetchedPost.id,
            3
          );
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
        setPost(null);
        setRelatedPosts([]);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  return {
    post,
    relatedPosts,
    loading,
    error,
  };
}
