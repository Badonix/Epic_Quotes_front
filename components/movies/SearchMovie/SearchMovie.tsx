import { Back, Search } from '@/components/icons';
import React, { SetStateAction } from 'react';
import { useTranslation } from 'next-i18next';
import { useSearchMovie } from './useSearchMovie';
import { MovieType } from '@/types';

export const SearchMovie: React.FC<{
  searchOpen: boolean;
  setSearchOpen: React.Dispatch<SetStateAction<boolean>>;
  setSearchResults: React.Dispatch<SetStateAction<MovieType[]>>;
  searchResult: MovieType[];
}> = ({ searchOpen, setSearchOpen, setSearchResults, searchResult }) => {
  const { t } = useTranslation();
  const { windowWidth, handleSubmit, onSubmit, register } = useSearchMovie(
    setSearchResults,
    setSearchOpen,
    searchResult
  );
  return (
    <>
      {searchOpen ? (
        <div className='cursor-pointer' onClick={() => setSearchOpen(false)}>
          <p className='text-gray-300 text-xl'>{t('profile.cancel')}</p>
        </div>
      ) : (
        <div
          onClick={() => setSearchOpen(true)}
          className='cursor-pointer items-center gap-4 flex'
        >
          <Search />
          <p className='text-gray-300 text-xl'>{t('movies.search')}</p>
        </div>
      )}
      {windowWidth <= 1024 && (
        <>
          {searchOpen && (
            <div className='left-0 text-gray-300 lg:hidden top-0 w-screen flex flex-col h-full fixed z-50 bg-sidebar'>
              <div className='flex items-center px-5 h-16 border-b border-search'>
                <div onClick={() => setSearchOpen(false)}>
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
            </div>
          )}
        </>
      )}
      {windowWidth > 1024 && searchOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('search')}
            autoFocus
            type='text'
            className='px-2 bg-transparent border-b border-gray-300 w-full py-2 outline-none text-gray-300'
          />
        </form>
      )}
    </>
  );
};
export default SearchMovie;
