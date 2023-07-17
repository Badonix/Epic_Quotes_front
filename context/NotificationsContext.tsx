import { markAllRead, markAsRead, me } from '@/services';
import { NotificationType, UserType } from '@/types';
import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { asPath } = router;
  console.log(asPath);

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
    try {
      const res = await me();
      setUserId(res.data.id);
    } catch (e) {}
  };

  useEffect(() => {
    fetchUser();
  }, [asPath]);

  useEffect(() => {
    if (userId && window.Echo && asPath !== '/' && asPath !== '/unauthorized') {
      window.Echo.private('notifications.' + userId).listen(
        'NotificationCreated',
        (data: { notification: NotificationType }) => {
          setNotifications((prev) => [data.notification, ...prev]);
        }
      );
    }
    return () => {
      if (
        userId &&
        window.Echo &&
        asPath !== '/' &&
        asPath !== '/unauthorized'
      ) {
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
