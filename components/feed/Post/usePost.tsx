import { addComment } from '@/services';
import { CommentType, addCommentType } from '@/types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const usePost = () => {
  const { register, handleSubmit, reset } = useForm();
  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const onSubmit = async (data: addCommentType) => {
    try {
      const response = await addComment(data);
      setNewComments((prev) => [...[response.data], ...prev]);
      reset();
    } catch (e) {}
  };

  return { register, handleSubmit, onSubmit, newComments };
};