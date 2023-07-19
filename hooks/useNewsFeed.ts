import { checkAuth } from '@/helpers';
import { fetchMovies, fetchPosts, getUser } from '@/services';
import { PostType } from '@/types';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useNewsFeed = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<PostType[]>([]);
  const loadMoreRef = useRef(null);
  const router = useRouter();
  const { locale } = useRouter();
  const { data, fetchNextPage } = useInfiniteQuery({
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
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetchPosts(pageParam);
      return response;
    },
    retry: 0,
    onError(err) {
      checkAuth(err, router, locale);
    },
  });

  const { data: moviesData } = useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const res = await fetchMovies();
      return res.data;
    },
    retry: 0,
    onError(err) {
      checkAuth(err, router, locale);
    },
  });
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser();
      return res.data;
    },
    retry: 0,
    onError(err) {
      checkAuth(err, router, locale);
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
    loadMoreRef,
    data,
    searchResult,
    setSearchResult,
    userData,
    moviesData,
  };
};
