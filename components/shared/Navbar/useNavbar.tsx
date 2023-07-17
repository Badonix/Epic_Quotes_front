import { instantiatePusher } from '@/helpers';
import { useEffect, useState } from 'react';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] =
    useState<boolean>(false);
  useEffect(() => {
    instantiatePusher();
  }, []);
  return {
    notificationsActive,
    setNotificationsActive,
  };
};
