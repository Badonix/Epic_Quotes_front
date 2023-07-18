import { NotificationsContext } from '@/context';
import { fetchPosts } from '@/services';
import { PostType, UserType } from '@/types';
import { useContext, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

export const useNewsFeed = (quotes: PostType[], user: UserType) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [posts, setPosts] = useState(quotes);
  const [currentPage, setCurrentPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<PostType[]>([]);
  const loadMoreRef = useRef(null);
  const { setNotifications } = useContext(NotificationsContext);
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
    setNotifications(user.notifications);
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
    searchResult,
    setSearchResult,
  };
};
