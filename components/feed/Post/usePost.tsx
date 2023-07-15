import { addComment, addLike, removeLike } from '@/services';
import { CommentType, LikesType, UserType, addCommentType } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { checkAuth } from '@/helpers';
export const usePost = (likes: LikesType[], user: UserType) => {
  const { register, handleSubmit, reset } = useForm();
  const { locale } = useRouter();
  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes?.length);
  const router = useRouter();
  const onSubmit = async (data: addCommentType) => {
    try {
      const response = await addComment(data);
      setNewComments((prev) => [...[response.data], ...prev]);
      reset();
    } catch (e) {
      checkAuth(e, router);
    }
  };
  useEffect(() => {
    const hasLiked = likes?.find((like) => like.user_id === user.id);
    hasLiked ? setLiked(true) : setLiked(false);
  }, []);

  const handleLike = async (id: Number) => {
    if (!liked) {
      await addLike(id);
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    } else {
      await removeLike(id);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  return {
    register,
    likeCount,
    handleSubmit,
    onSubmit,
    newComments,
    handleLike,
    liked,
    locale,
  };
};
