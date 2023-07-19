import { addComment, addLike, removeLike } from '@/services';
import {
  CommentType,
  LikesType,
  PostType,
  UserType,
  addCommentType,
} from '@/types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { checkAuth } from '@/helpers';
export const usePost = (likes: LikesType[], user: UserType, post: PostType) => {
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
    window.Echo.channel('post.likes').listen(
      'PostLiked',
      (data: { postId: number; liker: number }) => {
        data.postId == post.id &&
          user.id != data.liker &&
          setLikeCount((prev) => prev + 1);
      }
    );
    window.Echo.channel('post.likes').listen(
      'PostUnliked',
      (data: { postId: number; unliker: number }) => {
        data.postId == post.id &&
          user.id != data.unliker &&
          setLikeCount((prev) => prev - 1);
      }
    );
    window.Echo.channel('post.comments').listen(
      'PostCommented',
      (data: { postId: number; comment: CommentType }) => {
        data.postId == post.id &&
          user.id != data.comment.user.id &&
          setNewComments((prev) => [...[data.comment], ...prev]);
      }
    );
    return () => {
      window.Echo.channel('post.likes').stopListening('PostLiked');
      window.Echo.channel('post.likes').stopListening('PostUnliked');
      window.Echo.channel('post.comments').stopListening('PostCommented');
    };
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
