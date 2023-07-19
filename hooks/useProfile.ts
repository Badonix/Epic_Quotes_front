import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getUser } from '@/services';
export const useProfile = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser();
      return res.data;
    },
  });
  const router = useRouter();
  return {
    sidebarActive,
    setSidebarActive,
    router,
    confirmation,
    setConfirmation,
    userData,
  };
};
