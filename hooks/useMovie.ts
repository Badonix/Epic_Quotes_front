import { deleteMovie, fetchMovie, getUser } from '@/services';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { ModalContext } from '@/context';
import { useQuery } from 'react-query';
import { useTranslation } from 'next-i18next';

export const useMovie = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [activeQuote, setActiveQuote] = useState(null);
  const router = useRouter();
  const { id, locale } = router.query;
  const { t } = useTranslation();
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { data: movieData } = useQuery({
    queryKey: ['movie'],
    queryFn: async () => {
      const res = await fetchMovie(Number(id));
      return res.data;
    },
  });
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await getUser(Number(id));
      return res.data;
    },
  });

  const handleDelete = async (id: number) => {
    const response = await deleteMovie(id);
    if (response.status === 200) {
      router.push('/movies');
    }
  };

  return {
    sidebarActive,
    handleDelete,
    setSidebarActive,
    userData,
    movieData,
    activeQuote,
    setActiveQuote,
    locale,
    t,
    openModal,
    setOpenModal,
  };
};
