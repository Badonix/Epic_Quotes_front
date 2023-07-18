import { NotificationsContext } from '@/context';
import { instantiatePusher } from '@/helpers';
import { useContext, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const { t } = useTranslation();
  const { notifCount } = useContext(NotificationsContext);
  instantiatePusher();
  return {
    notificationsActive,
    setNotificationsActive,
    notifCount,
    t,
  };
};
