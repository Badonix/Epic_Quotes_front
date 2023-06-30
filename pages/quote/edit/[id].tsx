import React from 'react';
import { useRouter } from 'next/router';
import { Close, Photo, Trash } from '@/components';
import Image from 'next/image';
import { GetServerSidePropsContext } from 'next';
import { fetchQuote } from '@/services';
import { useEditQuote } from './useEditQuote';
import { ErrorMessage } from '@hookform/error-message';
export const EditQuote = ({ quote }: any) => {
  const router = useRouter();
  const { register, onSubmit, handleSubmit, errors } = useEditQuote(quote);
  console.log(quote);
  return (
    <div className='min-h-screen flex items-center justify-center py-4'>
      <div className='backdrop-blur-md bg-sidebar text-white w-11/12 max-w-4xl rounded-xl'>
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div className='flex items-center gap-4 w-32'>
            <div className='cursor-pointer flex gap-2 items-center'>
              <Trash />
              <p>Delete</p>
            </div>
          </div>
          <h2 className='text-2xl'>Edit Quote</h2>
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
            <h2 className='text-white text-xl'>nino tabagari</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='pb-11 mt-7 flex flex-col gap-6 w-full'
          >
            <div className='flex flex-col gap-3 text-2xl italic w-full text-white'>
              <div className='relative w-full'>
                <textarea
                  {...register('body.en', { required: 'Quote is required' })}
                  className='w-full italic bg-transparent outline-none border border-search rounded-md px-4 py-2 flex items-center relative'
                ></textarea>
                <p className='absolute right-6 top-3 text-xl text-gray-600 not-italic'>
                  Eng
                </p>
                <p className='absolute -bottom-5 text-red-600'>
                  <ErrorMessage name='body.en' errors={errors} />
                </p>
              </div>
              <div className='relative w-full'>
                <textarea
                  {...register('body.ka', { required: 'Quote is required' })}
                  className='w-full italic bg-transparent outline-none border border-search rounded-md px-4 py-2 flex items-center relative'
                ></textarea>
                <p className='absolute right-6 top-3 text-xl text-gray-600 not-italic'>
                  ქარ
                </p>
                <p className='absolute -bottom-5 text-red-600'>
                  <ErrorMessage name='body.ka' errors={errors} />
                </p>
              </div>
            </div>
            <div className='relative'>
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${quote.image}`}
                className='w-full object-cover w-full h-513 rounded-lg'
              />
              <div className='flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-4 bg-black bg-opacity-30 hover:bg-opacity-60 transition-all rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <Photo />
                <p className='text-white'>Change picture</p>
              </div>
            </div>
            <button
              type='submit'
              className='disabled:bg-red-700 rounded-4 py-2 w-full bg-red-600 text-white'
            >
              Save changes
            </button>
          </form>
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
    console.log(response);
  } catch (e) {
    console.log(e);
  }
  return { props: { quote } };
}

export default EditQuote;
