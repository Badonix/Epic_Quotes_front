import { NotificationsContext } from '@/context';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

export const useNotifications = () => {
  const { notificationsData, handleReadAll, newNotifications } =
    useContext(NotificationsContext);
  const { t } = useTranslation();
  return {
    notificationsData,
    newNotifications,
    handleReadAll,
    t,
  };
};
