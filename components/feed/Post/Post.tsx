import { Comment, Heart } from '@/components/icons';
import Image from 'next/image';
import React from 'react';
import { PostComment } from '../PostComment';

const Post = () => {
  return (
    <article className='w-full rounded-xl bg-singlepost p-6'>
      <div className='flex items-center gap-4'>
        <Image
          width={52}
          height={52}
          alt='pfp'
          src='/assets/images/default-pfp.png'
        />
        <h2 className='text-white text-xl'>Maia Nakashidze</h2>
      </div>
      <p className='mt-4 text-white text-lg'>
        “Follow your dream.”movie- Billy Elliot. (2000)
      </p>
      <img
        src='/assets/images/quote-placeholder.png'
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
