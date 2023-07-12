import { addComment, addLike, removeLike } from '@/services';
import { CommentType, LikesType, UserType, addCommentType } from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const usePost = (likes: LikesType[], user: UserType) => {
  const { register, handleSubmit, reset } = useForm();
  const [newComments, setNewComments] = useState<CommentType[]>([]);
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes?.length);
  const onSubmit = async (data: addCommentType) => {
    try {
      const response = await addComment(data);
      setNewComments((prev) => [...[response.data], ...prev]);
      reset();
    } catch (e) {}
  };
  useEffect(() => {
    let hasLiked = false;
    likes.forEach((like: LikesType) => {
      if (like.user_id == user.id) {
        hasLiked = true;
      }
    });
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
  };
};
