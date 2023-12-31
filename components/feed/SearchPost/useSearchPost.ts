import { search } from '@/services';
import { SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchType } from './types';
import { useWatch } from 'react-hook-form';
import { PostType } from '@/types';
import { checkAuth } from '@/helpers';
import { useRouter } from 'next/router';
export const useSearchPost = (
  searchResult: PostType[],
  setSearchResult: React.Dispatch<SetStateAction<PostType[]>>,
  setSearchActive: React.Dispatch<SetStateAction<boolean>>
) => {
  const { register, handleSubmit, control } = useForm<SearchType>();
  const [windowWidth, setWindowWidth] = useState<number>(1);
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  const { search: searchValue } = useWatch({ control });
  const onSubmit = async (data: SearchType) => {
    try {
      if (searchValue) {
        let posts = await search(data);
        setSearchResult(posts.data);
        setSearchActive(false);
      }
    } catch (e) {
      checkAuth(e, router);
    }
  };
  useEffect(() => {
    if (searchResult && !searchValue) {
      setSearchResult([]);
    }
  }, [searchValue]);
  return { register, handleSubmit, onSubmit, windowWidth, searchResult };
};
