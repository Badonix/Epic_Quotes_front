import { MovieComment } from '@/components';
import Image from 'next/image';
import React from 'react';
export const MovieCard = ({ movie }: any) => {
  const src = `${process.env.NEXT_PUBLIC_API_URL}/storage/${movie.banner}`;
  return (
    <div>
      <Image
        loader={() => src}
        width={440}
        height={371}
        alt='card'
        src={src}
        className='w-440 h-371 object-cover rounded-xl'
      />
      <h2 className='text-2xl text-white mt-4'>
        {JSON.parse(movie.title).title_en} ({movie.release_year})
      </h2>
      <div className='flex items-center gap-4 mt-4'>
        <p className='text-white text-2xl'>10</p>
        <MovieComment />
      </div>
    </div>
  );
};

export default MovieCard;
