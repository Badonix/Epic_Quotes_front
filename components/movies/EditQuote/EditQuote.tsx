import { Close, Photo, Trash } from '@/components/icons';
import Image from 'next/image';
import { useEditQuote } from './useEditQuote';
import { ErrorMessage } from '@hookform/error-message';
import { useModal } from '@/hooks';
export const EditQuote = ({ activeQuote, user }: any) => {
  const { errors, handleSubmit, onSubmit, register, preview } =
    useEditQuote(activeQuote);
  const { wrapperRef, setOpenModal } = useModal();
  const userSrc = user?.avatar
    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user?.avatar}`
    : '/assets/default-pfp.png';
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
          <div
            onClick={() => setOpenModal('')}
            className='cursor-pointer w-32 flex justify-end'
          >
            <Close />
          </div>
        </div>
        <div className='px-8'>
          <div className='flex items-center gap-4 mt-7'>
            <Image
              width={60}
              height={60}
              src={userSrc}
              loader={() => userSrc}
              alt='pfp'
            />
            <h2 className='text-white text-xl'>{user?.username}</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='pb-11 mt-7 flex flex-col gap-6 w-full'
          >
            <div className='flex flex-col gap-8 text-2xl italic w-full text-white'>
              <div className='relative w-full'>
                <textarea
                  {...register('body.en', { required: 'Quote is required' })}
                  className='w-full italic bg-transparent outline-none border border-search rounded-md px-4 py-2 flex items-center relative'
                ></textarea>
                <p className='absolute right-6 top-3 text-xl text-gray-600 not-italic'>
                  Eng
                </p>
                <p className='absolute -bottom-6 text-base not-italic text-red-600'>
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
                <p className='absolute -bottom-6 text-base not-italic text-red-600'>
                  <ErrorMessage name='body.ka' errors={errors} />
                </p>
              </div>
            </div>
            <div className='relative'>
              <label htmlFor='img'>
                <img
                  src={
                    preview ||
                    `${process.env.NEXT_PUBLIC_API_URL}/storage/${activeQuote.image}`
                  }
                  className='w-full object-cover h-513 rounded-lg'
                />
                <div className='flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-4 bg-black bg-opacity-30 hover:bg-opacity-60 transition-all rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                  <Photo />
                  <p className='text-white'>Change picture</p>
                </div>
              </label>
              <input id='img' type='file' hidden {...register('image')} />
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
