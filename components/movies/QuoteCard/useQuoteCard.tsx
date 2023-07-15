import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { deleteQuote } from '@/services';
import { checkAuth } from '@/helpers';
export const useQuoteCard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteQuote(Number(id));
      response.status === 200 && router.reload();
    } catch (e) {
      checkAuth(e, router);
    }
  };

  return {
    router,
    menuOpen,
    wrapperRef,
    setMenuOpen,
    handleDelete,
  };
};
