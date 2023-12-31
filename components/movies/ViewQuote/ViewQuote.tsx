import { PostComment } from '@/components/feed';
import { Close, Comment, Edit, Heart, Trash } from '@/components/icons';
import Image from 'next/image';
import { useModal } from '@/hooks';
import { useViewQuote } from './useViewQuote';
import { CommentType } from '@/types';
import { PropsType } from './types';
import { getAvatar } from '@/helpers';
import { useTranslation } from 'next-i18next';
export const ViewQuote: React.FC<PropsType> = ({
  activeQuote,
  setActiveQuote,
  user,
}) => {
  const { wrapperRef, setOpenModal } = useModal();
  const { handleDelete, handleSubmit, onSubmit, register, newComments } =
    useViewQuote(Number(activeQuote?.id));
  const userSrc = getAvatar(user);
  const { t } = useTranslation();
  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='bg-sidebar text-white sm:w-11/12 max-h-screen overflow-y-auto  w-screen max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div className='flex items-center gap-4 w-32'>
            <div
              onClick={() => {
                setOpenModal('editquote');
                setActiveQuote(activeQuote);
              }}
              className='cursor-pointer'
            >
              <Edit />
            </div>
            <div className='w-px bg-search h-4'></div>
            <div className='cursor-pointer' onClick={handleDelete}>
              <Trash />
            </div>
          </div>
          <h2 className='text-2xl text-center'>{t('view_quote')}</h2>
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
              src={userSrc}
              loader={() => userSrc}
              alt='pfp'
              className='w-15 h-15 rounded-full object-cover'
            />
            <h2 className='text-white text-xl'>{user?.username}</h2>
          </div>
          <div className='pb-11 mt-7 flex flex-col gap-6 w-full'>
            <div className='flex flex-col gap-3 text-2xl italic text-white'>
              <div className='border border-search rounded-md px-4 py-2 flex items-center relative'>
                <p>&quot;{activeQuote?.body.en}&quot;</p>
                <p className='absolute right-6 text-xl text-gray-600 not-italic'>
                  Eng
                </p>
              </div>
              <div className='border border-search rounded-md px-4 py-2 flex items-center relative'>
                <p>&quot;{activeQuote?.body.ka}&quot;</p>
                <p className='absolute right-6 text-xl text-gray-600 not-italic'>
                  ქარ
                </p>
              </div>
            </div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${activeQuote?.image}`}
              className='w-full object-cover h-513 rounded-lg'
            />
            <div className='flex items-center gap-4 text-xl'>
              <div className='flex items-center gap-3'>
                <p>
                  {activeQuote?.comments.length
                    ? activeQuote?.comments?.length + newComments.length
                    : activeQuote?.comments?.length}
                </p>
                <Comment />
              </div>
              <div className='flex items-center gap-3'>
                <p>{activeQuote?.likes.length}</p>
                <Heart />
              </div>
            </div>
          </div>
          <div className='max-h-40 overflow-auto scrollbar-thin scrollbar-thumb-slate-50'>
            {newComments?.map((comment: CommentType) => (
              <PostComment comment={comment} key={comment.id} />
            ))}
            {activeQuote?.comments?.map((comment: CommentType) => (
              <PostComment comment={comment} key={comment.id} />
            ))}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex items-center gap-6 py-6'
          >
            <Image
              width={52}
              height={52}
              alt='pfp'
              loader={() => userSrc}
              src={userSrc}
              className='w-52px h-52px rounded-full object-cover'
            />
            <input
              {...register('body')}
              type='text'
              placeholder='Write a comment'
              className='bg-post px-4 py-3 text-xl outline-none text-white rounded-md w-full'
            />
            <input
              {...register('post_id')}
              type='hidden'
              value={activeQuote?.id}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ViewQuote;
