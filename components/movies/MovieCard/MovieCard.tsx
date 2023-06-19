import { MovieComment } from '@/components';
import Image from 'next/image';
import React from 'react';
export const MovieCard = () => {
  return (
    <div>
      <Image
        width={440}
        height={371}
        alt='card'
        src='/assets/images/defaultcard.png'
        className='object-cover rounded-xl'
      />
      <h2 className='text-2xl text-white mt-4'>LOKI MOBIUS (2021)</h2>
      <div className='flex items-center gap-4 mt-4'>
        <p className='text-white text-2xl'>10</p>
        <MovieComment />
      </div>
    </div>
  );
};

export default MovieCard;
