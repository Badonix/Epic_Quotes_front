import { markAllRead, markAsRead, me } from '@/services';
import { NotificationType, UserType } from '@/types';
import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';

export const NotificationsContext = createContext<{
  notifications: NotificationType[];
  setNotifications: React.Dispatch<SetStateAction<NotificationType[]>>;
  notifCount: number;
  handleRead: (id: number) => void;
  handleReadAll: () => void;
}>({
  notifications: [],
  setNotifications: () => {},
  notifCount: 0,
  handleRead: () => {},
  handleReadAll: () => {},
});

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [notifCount, setNotifCount] = useState<number>(0);
  const [userId, setUserId] = useState<number>();

  const countNewNotifs = () => {
    let counter = 0;
    notifications.forEach((notification) => {
      !notification.read && counter++;
    });
    setNotifCount(counter);
  };
  const handleRead = async (id: number) => {
    const res = await markAsRead(id);
    const updatedNotification = res.data;
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? updatedNotification : notification
      )
    );
  };
  const handleReadAll = async () => {
    await markAllRead();

    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };
  const fetchUser = async () => {
    const res = await me();
    setUserId(res.data.id);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      window.Echo.private('notifications.' + userId).listen(
        'NotificationCreated',
        (data: { notification: NotificationType }) => {
          setNotifications((prev) => [data.notification, ...prev]);
        }
      );
    }
    return () => {
      if (userId) {
        window.Echo.private('notifications.' + userId).stopListening(
          'NotificationCreated'
        );
      }
    };
  }, [userId]);

  useEffect(() => {
    countNewNotifs();
  }, [notifications]);

  const notificationsContextValue = {
    notifications,
    setNotifications,
    notifCount,
    handleRead,
    handleReadAll,
  };
  return (
    <NotificationsContext.Provider value={notificationsContextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
