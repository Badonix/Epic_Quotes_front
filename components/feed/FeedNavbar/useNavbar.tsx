import { UserType } from '@/types';
import { useState } from 'react';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] =
    useState<boolean>(false);

  return {
    notificationsActive,
    setNotificationsActive,
  };
};
