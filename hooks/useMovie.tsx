import { deleteMovie } from '@/services';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const useMovie = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const response = await deleteMovie(id);
    if (response.status === 200) {
      router.push('/movies');
    }
  };

  return { sidebarActive, handleDelete, setSidebarActive };
};
