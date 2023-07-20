import { NotificationsContext } from '@/context';
import { instantiatePusher } from '@/helpers';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { logout } from '@/services';
import { useRouter } from 'next/router';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const { notifCount } = useContext(NotificationsContext);
  const { t } = useTranslation();
  const router = useRouter();
  useEffect(() => {
    instantiatePusher();
  }, []);
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };
  return {
    notificationsActive,
    setNotificationsActive,
    notifCount,
    useTranslation,
    handleLogout,
    t,
  };
};
