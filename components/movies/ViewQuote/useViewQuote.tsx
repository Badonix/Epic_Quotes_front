import { deleteQuote } from '@/services';
import { useRouter } from 'next/router';
export const useViewQuote = (id: number) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteQuote(id);
    res.status === 200 && router.reload();
    return res;
  };
  return {
    handleDelete,
  };
};
