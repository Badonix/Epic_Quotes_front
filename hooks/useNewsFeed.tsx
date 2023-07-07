import { fetchPosts } from '@/services';
import { useEffect, useRef, useState } from 'react';

export const useNewsFeed = (quotes: any) => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [posts, setPosts] = useState(quotes);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loadMoreRef = useRef(null);
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const fetchNewPosts = async () => {
    setIsLoading(true);
    try {
      const newPosts = await fetchPosts(currentPage);
      setPosts((prevPosts: any) => [...prevPosts, ...newPosts.data.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    currentPage !== 1 && fetchNewPosts();
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
  };
};
