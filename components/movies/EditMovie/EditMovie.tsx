import { Close, Photo } from '@/components';
import Image from 'next/image';
import React from 'react';
import { useModal } from '@/hooks';
import { useEditMovie } from './useEditMovie';
import { ErrorMessage } from '@hookform/error-message';
import { PropsType } from './types';
import { getAvatar } from '@/helpers';
import { useTranslation } from 'next-i18next';
import Select from 'react-select';
export const AddMovie: React.FC<PropsType> = ({ movie, user }) => {
  const { setOpenModal, wrapperRef } = useModal();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    getRootProps,
    getInputProps,
    preview,
    customStyles,
    setValue,
    genreOptions,
    locale,
  } = useEditMovie(movie);
  const userSrc = getAvatar(user);
  const { t } = useTranslation();

  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='backdrop-blur-md bg-sidebar text-white w-screen sm:w-11/12 max-w-4xl h-screen sm:h-auto fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div></div>
          <h2 className='text-2xl'>{t('movies.editmovie.edit')}</h2>
          <div onClick={() => setOpenModal('')}>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='pb-11 max-h-60 scrollbar-thin scrollbar-thumb-gray-900 scrollbar- overflow-y-auto mt-7 flex flex-col gap-6 w-full'
          >
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    Movie Name
                  </label>
                </div>
                <input
                  disabled={loading}
                  {...register('title.en', {
                    required: t('movies.addmovie.movie_name_required'),
                  })}
                  type='text'
                  className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
                />
                <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                  <p className='text-gray-600'>Eng</p>
                </div>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='title.en' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    ფილმის სახელი
                  </label>
                </div>
                <input
                  disabled={loading}
                  {...register('title.ka', {
                    required: t('movies.addmovie.movie_name_required'),
                  })}
                  type='text'
                  className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
                />
                <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                  <p className='text-gray-600'>ქარ</p>
                </div>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='title.ka' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    {t('movies.addmovie.genre')}
                  </label>
                </div>
                <Select
                  className='cursor-pointer w-full px-3 border border-l-transparent border-search'
                  unstyled
                  isMulti
                  options={genreOptions?.map((option) => ({
                    ...option,
                    label: locale == 'ka' ? option.label.ka : option.label.en,
                    isFixed: true,
                  }))}
                  styles={customStyles}
                  placeholder=''
                  name='genre'
                  onChange={(selectedOptions: any) => {
                    setValue('genre', selectedOptions);
                  }}
                />
                <p className='absolute -bottom-5 text-red-600'>
                  <ErrorMessage name='genre' errors={errors} />
                </p>
              </div>
            </div>
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    წელი/year
                  </label>
                </div>
                <input
                  disabled={loading}
                  {...register('year', {
                    required: t('movies.addmovie.movie_year_required'),
                  })}
                  type='number'
                  className='px-4 py-2 w-full bg-transparent border-r rounded-r-4 border-y border-search outline-none'
                />
                <p className='absolute -bottom-5 text-red-600'>
                  <ErrorMessage name='year' errors={errors} />
                </p>
              </div>
            </div>
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    {t('movies.addmovie.budget')}
                  </label>
                </div>
                <input
                  disabled={loading}
                  {...register('budget', {
                    required: t('movies.addmovie.movie_budget_required'),
                  })}
                  type='number'
                  className='px-4 py-2 w-full bg-transparent border-r rounded-r-4 border-y border-search outline-none'
                />
                <p className='absolute -bottom-5 text-red-600'>
                  <ErrorMessage name='year' errors={errors} />
                </p>
              </div>
            </div>
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    Director
                  </label>
                </div>
                <input
                  disabled={loading}
                  {...register('director.en', {
                    required: t('movies.addmovie.movie_director_required'),
                  })}
                  type='text'
                  className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
                />
                <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                  <p className='text-gray-600'>Eng</p>
                </div>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='director.ka' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div className='flex items-center'>
                <div className='py-2 rounded-l-4 border-y border-l border-search pl-4'>
                  <label className='whitespace-nowrap text-white'>
                    რეჟისორი
                  </label>
                </div>
                <input
                  disabled={loading}
                  {...register('director.ka', {
                    required: t('movies.addmovie.movie_director_required'),
                  })}
                  type='text'
                  className='px-4 py-2 w-full bg-transparent border-y border-search outline-none'
                />
                <div className='py-2 border-r border-t border-b border-search rounded-r-4 pr-4'>
                  <p className='text-gray-600'>ქარ</p>
                </div>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='director.ka' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div className='flex items-center relative'>
                <label className='top-2 left-2 absolute whitespace-nowrap text-white'>
                  Movie Description
                </label>
                <textarea
                  disabled={loading}
                  {...register('description.en', {
                    required: t('movies.addmovie.movie_description_required'),
                  })}
                  className='pl-40 pr-12 px-4 py-2 w-full bg-transparent border border-search outline-none rounded-4'
                />
                <p className='absolute text-gray-600 top-2 right-2'>Eng</p>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='description.en' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div className='flex items-center relative'>
                <label className='top-2 left-2 absolute whitespace-nowrap text-white'>
                  ფილმის აღწერა
                </label>
                <textarea
                  disabled={loading}
                  {...register('description.ka', {
                    required: t('movies.addmovie.movie_description_required'),
                  })}
                  className='pl-40 pr-12 px-4 py-2 w-full bg-transparent border border-search outline-none rounded-4'
                />
                <p className='absolute text-gray-600 top-2 right-2'>ქარ</p>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='description.ka' errors={errors} />
              </p>
            </div>
            <div {...getRootProps()} className='relative'>
              <div className='py-7 px-4 flex items-center gap-4 border border-search rounded-4'>
                <img
                  className='w-1/2 max-h-64 shrink-0'
                  src={
                    preview ||
                    `${process.env.NEXT_PUBLIC_API_URL}/storage/${movie?.banner}`
                  }
                  alt='Uploaded Image'
                />
                <div className='flex flex-col items-center gap-4 w-full justify-center'>
                  <h2 className='text-xl text-orange-200'>
                    {t('movies.editmovie.replace')}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <Photo />
                    <p>{t('movies.addmovie.drop')}</p>
                  </div>
                  <input
                    {...getInputProps()}
                    disabled={loading}
                    {...register('banner')}
                    className='hidden'
                    type='file'
                    id='image'
                  />
                  <label
                    className='p-2 bg-purple-800   text-white'
                    htmlFor='image'
                  >
                    {t('movies.addmovie.choose')}
                  </label>
                </div>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='banner' errors={errors} />
              </p>
            </div>
            <button
              disabled={loading}
              type='submit'
              className='disabled:bg-red-700 rounded-4 py-2 w-full bg-red-600 text-white'
            >
              {t('movies.editmovie.edit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
