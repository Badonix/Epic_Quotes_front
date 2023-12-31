import { Comment, Heart } from '@/components/icons';
import Image from 'next/image';
import React from 'react';
import { PostComment } from '../PostComment';
import { PropsType } from './types';
import { usePost } from './usePost';
import { getAvatar } from '@/helpers';
const Post: React.FC<PropsType> = ({ post, user }) => {
  const authorSrc = getAvatar(post.user);
  const userSrc = getAvatar(user);
  const {
    handleSubmit,
    onSubmit,
    register,
    likeCount,
    newComments,
    handleLike,
    liked,
    locale,
  } = usePost(post?.likes, user, post);
  return (
    <article className='w-full rounded-xl bg-singlepost p-6'>
      <div className='flex items-center gap-4'>
        <Image
          width={52}
          height={52}
          loader={() => authorSrc}
          alt='pfp'
          unoptimized
          src={authorSrc}
          className='rounded-full w-52px h-52px'
        />
        <h2 className='text-white text-xl'>{post?.user?.username}</h2>
      </div>
      <p className='mt-4 text-white text-lg'>
        &quot;{locale == 'ka' ? post?.body?.ka : post?.body?.en}&quot;
        <span className='mx-2 text-orange-200'>
          {locale == 'ka' ? post?.movie?.title?.ka : post?.movie?.title?.en}
        </span>
        ({post?.movie?.release_year})
      </p>
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${post?.image}`}
        className='w-full rounded-lg mt-7'
      />
      <div className='border-b border-search text-white py-6 flex items-center gap-6'>
        <div className='cursor-pointer flex items-center gap-3'>
          <p className='text-lg'>
            {post?.comments?.length + newComments?.length}
          </p>
          <Comment />
        </div>
        <div className='cursor-pointer flex items-center gap-3'>
          <p className='text-lg'>{likeCount}</p>
          <div onClick={() => handleLike(post?.id)}>
            <Heart active={liked} />
          </div>
        </div>
      </div>
      <div className='max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900'>
        {newComments?.map((comment) => (
          <PostComment key={comment?.id} comment={comment} />
        ))}
        {post?.comments?.map((comment) => (
          <PostComment key={comment?.id} comment={comment} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex gap-6 items-center mt-6'
      >
        <Image
          src={userSrc}
          loader={() => userSrc}
          width={52}
          height={52}
          className='w-52px h-52px rounded-full object-cover'
          alt='pfp'
        />
        <input
          type='text'
          {...register('body')}
          className='w-full bg-post text-white px-7 py-3 rounded-lg outline-none text-xl'
          placeholder='Write a comment'
        />
        <input {...register('post_id')} type='hidden' value={post?.id} />
      </form>
    </article>
  );
};

export default Post;
