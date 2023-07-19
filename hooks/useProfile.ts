import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getUser } from '@/services';
import { checkAuth } from '@/helpers';
export const useProfile = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const router = useRouter();
  const { locale } = useRouter();
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser();
      return res.data;
    },
    retry: 0,
    onError(err) {
      checkAuth(err, router, locale);
    },
  });
  return {
    sidebarActive,
    setSidebarActive,
    router,
    confirmation,
    setConfirmation,
    userData,
  };
};
