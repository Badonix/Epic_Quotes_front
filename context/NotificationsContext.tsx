import { markAllRead, markAsRead, getUser } from '@/services';
import { NotificationType } from '@/types';
import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
export const NotificationsContext = createContext<{
  notificationsData: NotificationType[];
  newNotifications: NotificationType[];
  setNewNotifications: React.Dispatch<SetStateAction<NotificationType[]>>;
  notifCount: number;
  handleRead: (id: number) => void;
  handleReadAll: () => void;
}>({
  notificationsData: [],
  newNotifications: [],
  setNewNotifications: () => {},
  notifCount: 0,
  handleRead: () => {},
  handleReadAll: () => {},
});

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [newNotifications, setNewNotifications] = useState<NotificationType[]>(
    []
  );
  const queryClient = useQueryClient();
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
  const fetchNotifs = async () => {
    try {
      const res = await getUser();
      setNewNotifications([]);
      return res.data.notifications;
    } catch (e) {}
  };

  const countNewNotifs = () => {
    let counter = 0;
    newNotifications?.forEach((notification: NotificationType) => {
      !notification.read && counter++;
    });
    notificationsData?.forEach((notification: NotificationType) => {
      !notification.read && counter++;
    });
    setNotifCount(counter);
  };

  const handleRead = async (id: number) => {
    readMutation.mutate(id);
  };
  const readMutation = useMutation({
    mutationFn: (id: number) => {
      return markAsRead(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });
  const readAllMutation = useMutation({
    mutationFn: () => {
      return markAllRead();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
    },
  });
  const handleReadAll = async () => {
    readAllMutation.mutate();
  };
  const { data: notificationsData } = useQuery('notifications', fetchNotifs);
  const { data: user } = useQuery('user', fetchUser);

  useEffect(() => {
    if (userId && window.Echo && asPath !== '/' && asPath !== '/unauthorized') {
      window.Echo.private('notifications.' + userId).listen(
        'NotificationCreated',
        (data: { notification: NotificationType }) => {
          setNewNotifications((prev) => [data.notification, ...prev]);
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
  }, [newNotifications]);

  useEffect(() => {
    if (user) {
      setUserId(user.id);
    }
  }, [user]);
  useEffect(() => {
    countNewNotifs();
  }, [notificationsData]);

  const notificationsContextValue = {
    newNotifications,
    setNewNotifications,
    notifCount,
    handleRead,
    handleReadAll,
    notificationsData,
  };
  return (
    <NotificationsContext.Provider value={notificationsContextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
