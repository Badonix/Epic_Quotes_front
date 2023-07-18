import { markAllRead, markAsRead, getUser } from '@/services';
import { NotificationType, UserType } from '@/types';
import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';
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
  const [notifCount, setNotifCount] = useState(0);
  const [userId, setUserId] = useState(0);
  const router = useRouter();
  const { asPath } = router;
  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUserId(res.data.id);
      return res.data;
    } catch (e) {}
  };

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
  const { data: user } = useQuery('user', fetchUser);
  useMutation(handleRead);
  useMutation(handleReadAll);

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

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
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
