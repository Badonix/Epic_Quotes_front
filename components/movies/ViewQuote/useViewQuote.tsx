import { addComment, deleteQuote } from '@/services';
import { CommentType, addCommentType } from '@/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
export const useViewQuote = (id: number) => {
  const { register, handleSubmit, reset } = useForm();
  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const router = useRouter();
  const handleDelete = async () => {
    const res = await deleteQuote(id);
    res.status === 200 && router.reload();
    return res;
  };
  const onSubmit = async (data: addCommentType) => {
    try {
      const response = await addComment(data);
      setNewComments((prev) => [...[response.data], ...prev]);
      reset();
    } catch (e) {}
  };
  return {
    handleDelete,
    onSubmit,
    register,
    handleSubmit,
    newComments,
  };
};
