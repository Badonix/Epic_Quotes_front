import { fetchPosts } from '@/services';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useNewsFeed = (quotes: any) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [posts, setPosts] = useState(quotes);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const loadMoreRef = useRef(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['projects'],
    getNextPageParam: (prevData: any) => {
      if (prevData.data.next_page_url) {
        return prevData.data.next_page_url[
          prevData.data?.next_page_url.length - 1
        ];
      } else {
        return undefined;
      }
    },
    queryFn: async ({ pageParam = 2 }) => {
      const response = await fetchPosts(pageParam);
      return response;
    },
  });
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchNextPage();
  }, [currentPage]);
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return {
    sidebarActive,
    setSidebarActive,
    searchActive,
    setSearchActive,
    posts,
    loadMoreRef,
    setPosts,
    data,
  };
};
