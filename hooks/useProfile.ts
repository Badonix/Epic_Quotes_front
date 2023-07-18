import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NotificationsContext } from '@/context';
import { UserType } from '@/types';
export const useProfile = (user: UserType) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const { setNotifications } = useContext(NotificationsContext);
  useEffect(() => {
    setNotifications(user.notifications);
  }, []);
  const router = useRouter();
  return {
    sidebarActive,
    setSidebarActive,
    router,
    confirmation,
    setConfirmation,
  };
};
