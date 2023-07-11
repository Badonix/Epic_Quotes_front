import Image from 'next/image';
import React from 'react';
import { PropsType } from './types';
import { useAvatar } from '@/hooks';

const PostComment: React.FC<PropsType> = ({ comment }) => {
  const src = useAvatar(comment.user);
  return (
    <div className='flex mt-6 gap-6'>
      <div className='flex-shrink-0'>
        <Image
          unoptimized
          width={52}
          height={52}
          loader={() => src}
          alt='pfp'
          className='w-52px h-52px rounded-full object-cover'
          src={src}
        />
      </div>
      <div className='flex flex-col gap-3 w-full pt-3 py-6 border-b border-search'>
        <h2 className='text-white text-xl font-bold'>
          {comment?.user?.username}
        </h2>
        <p className='text-white text-xl break-all'>{comment?.body}</p>
      </div>
    </div>
  );
};

export default PostComment;
