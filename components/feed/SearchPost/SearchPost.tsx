import React from 'react';
import { Search, Write, Back } from '@/components/icons';
import { PropsType } from './types';
import { useModal } from '@/hooks';
const SearchPost: React.FC<PropsType> = ({ searchActive, setSearchActive }) => {
  const { setOpenModal } = useModal();
  return (
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
            <input
              autoFocus
              type='text'
              placeholder='Search'
              className='px-6 bg-transparent w-full h-full outline-none text-white'
            />
          </div>
          <div className='text-center flex flex-col gap-6 mt-5'>
            <p>Enter @ to search movies</p>
            <p>Enter # to search quotes </p>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setOpenModal('postquote');
        }}
        className='flex lg:hidden w-full -mt-2 px-9 py-8 gap-4 justify-center items-center'
      >
        <Write />
        <p className='text-gray-300'>Write new quote</p>
      </div>
      <div className='w-full px-10 mt-9 hidden lg:flex gap-4 transition-all'>
        {searchActive ? (
          <button
            onClick={() => setSearchActive(false)}
            className='h-14 flex items-center gap-4 bg-post py-3 px-4 w-60 rounded-md cursor-pointer'
          >
            <Write />
            <p className='text-white'>Write new quote</p>
          </button>
        ) : (
          <div
            onClick={() => {
              setOpenModal('postquote');
            }}
            className='cursor-pointer bg-post py-3 h-14 px-3 pointer flex items-center rounded-lg w-full gap-4'
          >
            <Write />
            <p className='text-white'>Write new quote</p>
          </div>
        )}

        <div
          className={`flex items-center gap-4 h-14 ${searchActive && 'w-full'}`}
        >
          {searchActive ? (
            <div className='w-full relative flex items-center'>
              <div className='absolute'>
                <Search />
              </div>
              <input
                autoFocus
                type='text'
                placeholder='Enter @ to search movies, Enter # to search quotes '
                className='pl-10 bg-transparent border-b border-gray-300 w-full h-14 outline-none text-gray-300'
              />
            </div>
          ) : (
            <div
              className='flex items-center gap-4 h-14 cursor-pointer'
              onClick={() => setSearchActive(true)}
            >
              <Search />
              <p className='text-gray-300'>Search</p>{' '}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPost;
