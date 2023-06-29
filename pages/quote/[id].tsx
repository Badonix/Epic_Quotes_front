import { Close, Comment, Edit, Heart, PostComment, Trash } from '@/components';
import { fetchQuote } from '@/services';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

export const ViewQuote = ({ quote }: any) => {
  const router = useRouter();
  return (
    <div className='min-h-screen flex items-center justify-center py-4'>
      <div className='backdrop-blur-md bg-sidebar text-white w-11/12 max-w-4xl rounded-xl'>
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div className='flex items-center gap-4 w-32'>
            <div className='cursor-pointer'>
              <Edit />
            </div>
            <div className='w-px bg-search h-4'></div>
            <div className='cursor-pointer'>
              <Trash />
            </div>
          </div>
          <h2 className='text-2xl'>View Quote</h2>
          <div
            className='cursor-pointer w-32 flex justify-end'
            onClick={() => router.back()}
          >
            <Close />
          </div>
        </div>
        <div className='px-8'>
          <div className='flex items-center gap-4 mt-7'>
            <Image
              width={60}
              height={60}
              src='/assets/images/default-pfp.png'
              alt='pfp'
            />
            <h2 className='text-white text-xl'>Nino Tabagari</h2>
          </div>
          <div className='pb-11 mt-7 flex flex-col gap-6 w-full'>
            <div className='flex flex-col gap-3 text-2xl italic text-white'>
              <div className='border border-search rounded-md px-4 py-2 flex items-center relative'>
                <p>"{quote.body.en}"</p>
                <p className='absolute right-6 text-xl text-gray-600 not-italic'>
                  Eng
                </p>
              </div>
              <div className='border border-search rounded-md px-4 py-2 flex items-center relative'>
                <p>"{quote.body.ka}"</p>
                <p className='absolute right-6 text-xl text-gray-600 not-italic'>
                  ქარ
                </p>
              </div>
            </div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${quote.image}`}
              className='w-full object-cover h-513 rounded-lg'
            />
            <div className='flex items-center gap-4 text-xl'>
              <div className='flex items-center gap-3'>
                <p>3</p>
                <Comment />
              </div>
              <div className='flex items-center gap-3'>
                <p>3</p>
                <Heart />
              </div>
            </div>
          </div>
          <div className='max-h-56 overflow-auto scrollbar-thin scrollbar-thumb-slate-50'>
            <PostComment />
            <PostComment />
            <PostComment />
            <PostComment />
          </div>
          <div className='flex items-center gap-6 py-6'>
            <Image
              width={52}
              height={52}
              alt='pfp'
              src='/assets/images/default-pfp.png'
            />
            <input
              type='text'
              placeholder='Write a comment'
              className='bg-post px-4 py-3 text-xl outline-none text-white rounded-md w-full'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let quote;
  try {
    const response = await fetchQuote(Number(id), context.req.headers.cookie);
    quote = response.data;
    console.log(quote);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      quote,
    },
  };
}

export default ViewQuote;
