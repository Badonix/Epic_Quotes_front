import { Comment, Heart } from '@/components/icons';
import Image from 'next/image';
import React from 'react';
import { PostComment } from '../PostComment';
import { PropsType } from './types';

const Post: React.FC<PropsType> = ({ post }) => {
  const avatarSrc = `${process.env.NEXT_PUBLIC_API_URL}/storage/${post.user.avatar}`;
  return (
    <article className='w-full rounded-xl bg-singlepost p-6'>
      <div className='flex items-center gap-4'>
        <Image
          width={52}
          height={52}
          loader={() => avatarSrc}
          alt='pfp'
          src={avatarSrc}
          className='rounded-full'
        />
        <h2 className='text-white text-xl'>{post.user.username}</h2>
      </div>
      <p className='mt-4 text-white text-lg'>
        “{post.body.en}”movie- {post.movie.title.en}. ({post.movie.release_year}
        )
      </p>
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${post.image}`}
        className='w-full rounded-lg mt-7'
      />
      <div className='border-b border-search text-white py-6 flex items-center gap-6'>
        <div className='cursor-pointer flex items-center gap-3'>
          <p className='text-lg'>3</p>
          <Comment />
        </div>
        <div className='cursor-pointer flex items-center gap-3'>
          <p className='text-lg'>10</p>
          <Heart />
        </div>
      </div>
      <div>
        <PostComment />
        <PostComment />
        <PostComment />
      </div>
      <div className='flex gap-6 items-center mt-6'>
        <Image
          src='/assets/images/default-pfp.png'
          width={52}
          height={52}
          alt='pfp'
        />
        <input
          type='text'
          className='w-full bg-post text-white px-7 py-3 rounded-lg outline-none text-xl'
          placeholder='Write a comment'
        />
      </div>
    </article>
  );
};

export default Post;
