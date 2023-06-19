import { Close, Photo } from '@/components';
import Image from 'next/image';
import React from 'react';
import { useModal } from '@/hooks';
export const AddMovie = () => {
  const { setOpenModal, wrapperRef } = useModal();
  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='backdrop-blur-md bg-sidebar text-white w-11/12 max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div></div>
          <h2 className='text-2xl'>Add Movie</h2>
          <div onClick={() => setOpenModal('')}>
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
          <form className='pb-11 max-h-60 scrollbar-thin scrollbar-thumb-gray-900 scrollbar- overflow-y-auto mt-7 flex flex-col gap-6 w-full'>
            <div className='flex items-center'>
              <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                <label className='whitespace-nowrap text-white'>
                  Movie Name
                </label>
              </div>
              <input
                type='text'
                className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
              />
              <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                <p className='text-gray-600'>Eng</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                <label className='whitespace-nowrap text-white'>
                  ფილმის სახელი
                </label>
              </div>
              <input
                type='text'
                className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
              />
              <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                <p className='text-gray-600'>ქარ</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                <label className='whitespace-nowrap text-white'>ჟანრი</label>
              </div>
              <input
                type='text'
                className='px-4 py-2 w-full bg-transparent border-r rounded-r-4 border-y border-search outline-none'
              />
            </div>
            <div className='flex items-center'>
              <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                <label className='whitespace-nowrap text-white'>
                  წელი/year
                </label>
              </div>
              <input
                type='text'
                className='px-4 py-2 w-full bg-transparent border-r rounded-r-4 border-y border-search outline-none'
              />
            </div>
            <div className='flex items-center'>
              <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                <label className='whitespace-nowrap text-white'>Director</label>
              </div>
              <input
                type='text'
                className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
              />
              <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                <p className='text-gray-600'>Eng</p>
              </div>
            </div>
            <div className='flex items-center'>
              <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                <label className='whitespace-nowrap text-white'>რეჟისორი</label>
              </div>
              <input
                type='text'
                className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
              />
              <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                <p className='text-gray-600'>ქარ</p>
              </div>
            </div>
            <div className='flex items-center relative'>
              <label className='top-2 left-2 absolute whitespace-nowrap text-white'>
                Movie Description
              </label>
              <textarea className='pl-40 pr-12 px-4 py-2 w-full bg-transparent border border-search outline-none rounded-4' />
              <p className='absolute text-gray-600 top-2 right-2'>Eng</p>
            </div>
            <div className='flex items-center relative'>
              <label className='top-2 left-2 absolute whitespace-nowrap text-white'>
                ფილმის აღწერა
              </label>
              <textarea className='pl-40 pr-12 px-4 py-2 w-full bg-transparent border border-search outline-none rounded-4' />
              <p className='absolute text-gray-600 top-2 right-2'>ქარ</p>
            </div>
            <div className='py-7 px-4 flex items-center gap-4 border border-search rounded-4'>
              <div className='flex items-center gap-2'>
                <Photo />
                <p>Drag & drop your image here or</p>
              </div>
              <input className='hidden' type='file' id='image' />
              <label className='p-2 bg-purple-800   text-white' htmlFor='image'>
                Choose file
              </label>
            </div>
            <button
              type='submit'
              className='rounded-4 py-2 w-full bg-red-600 text-white'
            >
              Add movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
