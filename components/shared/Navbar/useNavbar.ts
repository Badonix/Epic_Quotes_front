import { NotificationsContext } from '@/context';
import { instantiatePusher } from '@/helpers';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const { notifCount } = useContext(NotificationsContext);
  const { t } = useTranslation();
  useEffect(() => {
    instantiatePusher();
  }, []);
  return {
    notificationsActive,
    setNotificationsActive,
    notifCount,
    useTranslation,
    t,
  };
};
