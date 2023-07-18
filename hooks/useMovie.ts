import { deleteMovie } from '@/services';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { NotificationsContext } from '@/context';
import { UserType } from '@/types';

export const useMovie = (user: UserType) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { setNotifications } = useContext(NotificationsContext);
  setNotifications(user.notifications);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const response = await deleteMovie(id);
    if (response.status === 200) {
      router.push('/movies');
    }
  };

  return { sidebarActive, handleDelete, setSidebarActive };
};
