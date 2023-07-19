import { NotificationsContext } from '@/context';
import { instantiatePusher } from '@/helpers';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { logout } from '@/services';
import { useRouter } from 'next/router';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();
  const { notifCount } = useContext(NotificationsContext);
  instantiatePusher();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      console.log('logged out');
    } catch (e) {
      console.log(e);
    }
  };
  return {
    notificationsActive,
    setNotificationsActive,
    notifCount,
    t,
    handleLogout,
  };
};
