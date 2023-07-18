import React, { useContext } from 'react';
import { Search, Write, Back } from '@/components';
import { PropsType } from './types';
import { useTranslation } from 'next-i18next';
import { useSearchPost } from './useSearchPost';
import { ModalContext } from '@/context';
const SearchPost: React.FC<PropsType> = ({
  searchResult,
  setSearchResult,
  searchActive,
  setSearchActive,
}) => {
  const { setOpenModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const { register, onSubmit, handleSubmit, windowWidth } = useSearchPost(
    searchResult,
    setSearchResult,
    setSearchActive
  );

  return (
    <>
      {windowWidth <= 1024 && (
        <>
          {searchActive && (
            <div className='text-gray-300 lg:hidden top-0 w-screen flex flex-col h-full fixed z-50 bg-sidebar'>
              <div className='flex items-center px-5 h-16 border-b border-search'>
                <div
                  onClick={() => {
                    setSearchActive(false);
                  }}
                >
                  <Back />
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='w-full h-full'
                >
                  <input
                    {...register('search')}
                    autoFocus
                    type='text'
                    placeholder={t('newsfeed.search')}
                    className='px-6 bg-transparent w-full h-full outline-none text-white'
                  />
                </form>
              </div>
              <div className='text-center flex flex-col gap-6 mt-5'>
                <p>{t('newsfeed.search_movies')}</p>
                <p>{t('newsfeed.search_quotes')}</p>
              </div>
            </div>
          )}
        </>
      )}
      <div
        onClick={() => {
          setOpenModal('postquote');
        }}
        className='flex lg:hidden w-full -mt-2 px-9 py-8 gap-4 justify-center items-center'
      >
        <Write />
        <p className='text-gray-300'>{t('newsfeed.new_quote')}</p>
      </div>
      <div className='w-full px-10 mt-9 hidden lg:flex gap-4 transition-all'>
        {searchActive ? (
          <button
            onClick={() => setSearchActive(false)}
            className='h-14 flex items-center gap-4 bg-post py-3 px-4 w-60 rounded-md cursor-pointer'
          >
            <Write />
            <p className='text-white'>{t('newsfeed.new_quote')}</p>
          </button>
        ) : (
          <div
            onClick={() => {
              setOpenModal('postquote');
            }}
            className='cursor-pointer bg-post py-3 h-14 px-3 pointer flex items-center rounded-lg w-full gap-4'
          >
            <Write />
            <p className='text-white'>{t('newsfeed.new_quote')}</p>
          </div>
        )}

        <div
          className={`flex items-center gap-4 h-14 ${searchActive && 'w-full'}`}
        >
          {windowWidth > 1024 && (
            <>
              {searchActive ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='w-full relative flex items-center'
                >
                  <button type='submit' className='absolute'>
                    <Search />
                  </button>
                  <input
                    {...register('search')}
                    autoFocus
                    placeholder={t('newsfeed.search_placeholder')}
                    className='pl-10 bg-transparent border-b border-gray-300 w-full h-14 outline-none text-gray-300'
                  />
                </form>
              ) : (
                <div
                  className='flex items-center gap-4 h-14 cursor-pointer'
                  onClick={() => setSearchActive(true)}
                >
                  <Search />
                  <p className='text-gray-300'>{t('newsfeed.search')}</p>{' '}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPost;
