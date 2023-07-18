import { NotificationsContext } from '@/context';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

export const useNotifications = () => {
  const { notifications, handleReadAll } = useContext(NotificationsContext);
  const { t } = useTranslation();
  return {
    notifications,
    handleReadAll,
    t,
  };
};
