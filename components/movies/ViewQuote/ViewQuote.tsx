import { PostComment } from '@/components/feed';
import { Close, Comment, Edit, Heart, Trash } from '@/components/icons';
import Image from 'next/image';
import { useModal } from '@/hooks';
export const ViewQuote = ({ activeQuote, setActiveQuote }: any) => {
  const { wrapperRef, setOpenModal } = useModal();
  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='backdrop-blur-md bg-sidebar text-white w-11/12 max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
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
            onClick={() => {
              setOpenModal('');
              setActiveQuote(null);
            }}
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
                <p>"{activeQuote.body.en}"</p>
                <p className='absolute right-6 text-xl text-gray-600 not-italic'>
                  Eng
                </p>
              </div>
              <div className='border border-search rounded-md px-4 py-2 flex items-center relative'>
                <p>"{activeQuote.body.ka}"</p>
                <p className='absolute right-6 text-xl text-gray-600 not-italic'>
                  ქარ
                </p>
              </div>
            </div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${activeQuote.image}`}
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

export default ViewQuote;
