import { useState } from 'react';
import { useRouter } from 'next/router';
export const useProfile = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
  const router = useRouter();
  return {
    sidebarActive,
    setSidebarActive,
    router,
    confirmation,
    setConfirmation,
  };
};
