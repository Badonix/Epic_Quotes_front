import { Close, Photo, Trash } from '@/components/icons';
import Image from 'next/image';
import { useEditQuote } from './useEditQuote';
import { ErrorMessage } from '@hookform/error-message';
import { useModal } from '@/hooks';
export const EditQuote = ({ activeQuote }: any) => {
  const { errors, handleSubmit, onSubmit, register } =
    useEditQuote(activeQuote);
  const { wrapperRef } = useModal();
  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='backdrop-blur-md bg-sidebar text-white w-11/12 max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div className='flex items-center gap-4 w-32'>
            <div className='cursor-pointer flex gap-2 items-center'>
              <Trash />
              <p>Delete</p>
            </div>
          </div>
          <h2 className='text-2xl'>Edit Quote</h2>
          <div className='cursor-pointer w-32 flex justify-end'>
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
                src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${activeQuote.image}`}
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

export default EditQuote;
