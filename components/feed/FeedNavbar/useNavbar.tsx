import { UserType } from '@/types';
import { useState } from 'react';

export const useNavbar = (user: UserType) => {
  const [notificationsActive, setNotificationsActive] =
    useState<boolean>(false);

  return {
    notificationsActive,
    setNotificationsActive,
  };
};
