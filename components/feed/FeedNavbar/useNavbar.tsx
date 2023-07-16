import { useEffect, useRef, useState } from 'react';

export const useNavbar = () => {
  const [notificationsActive, setNotificationsActive] =
    useState<boolean>(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  return { notificationsActive, setNotificationsActive, notificationsRef };
};
