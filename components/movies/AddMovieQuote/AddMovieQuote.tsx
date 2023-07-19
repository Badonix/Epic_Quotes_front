import { Close, Photo } from '@/components';
import Image from 'next/image';
import React from 'react';
import { useModal } from '@/hooks';
import { useAddMovieQuote } from './useAddMovieQuote';
import { ErrorMessage } from '@hookform/error-message';
import { PropsType } from './types';
import { getAvatar } from '@/helpers';
import { useTranslation } from 'next-i18next';
export const AddMovie: React.FC<PropsType> = ({ movie, user }) => {
  const { setOpenModal, wrapperRef } = useModal();
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    locale,
    loading,
    getRootProps,
    getInputProps,
    preview,
    validateBanner,
  } = useAddMovieQuote(Number(movie.id));
  const src = `${process.env.NEXT_PUBLIC_API_URL}/storage/${movie.banner}`;
  const userSrc = getAvatar(user);
  const { t } = useTranslation();
  console.log(movie?.genre);
  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='backdrop-blur-md bg-sidebar text-white sm:w-11/12 w-screen sm:h-auto h-screen max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div></div>
          <h2 className='text-2xl'>{t('addquote.add_quote')}</h2>
          <div className='cursor-pointer' onClick={() => setOpenModal('')}>
            <Close />
          </div>
        </div>
        <div className='px-8'>
          <div className='flex items-center gap-4 mt-7'>
            <Image
              width={60}
              height={60}
              loader={() => userSrc}
              src={userSrc}
              alt='pfp'
              className='w-15 h-15 rounded-full object-cover'
            />
            <h2 className='text-white text-xl'>{user?.username}</h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='pb-11 mt-7 flex flex-col gap-6 w-full'
          >
            <div className='flex items-center gap-7'>
              <Image
                width={290}
                height={158}
                src={src}
                loader={() => src}
                className='w-290 h-158 object-cover rounded-xl'
                alt='movie-banner'
              />
              <div className='flex flex-col justify-around gap-5'>
                <h2 className='text-orange-200 text-2xl'>
                  {movie.title.en} ({movie.release_year})
                </h2>
                <div className='flex gap-3 flex-wrap'>
                  {movie &&
                    movie?.genre?.map((genre) => {
                      return (
                        <div
                          key={genre.id}
                          className='text-white bg-gray-500 rounded-md px-3 py-1'
                        >
                          <p className='inline'>
                            {locale == 'en' ? genre?.en : genre?.ka}
                          </p>
                        </div>
                      );
                    })}
                </div>
                <p className='font-bold text-lg text-gray-300'>
                  {t('addquote.director')}:
                  <span className='font-normal text-white ml-2'>
                    {movie.director.en}
                  </span>
                </p>
              </div>
            </div>
            <div className='relative'>
              <div className='flex items-center relative'>
                <label className='top-2 left-2 absolute whitespace-nowrap text-white'></label>
                <textarea
                  placeholder={'Start creating new quote'}
                  disabled={loading}
                  {...register('body.en', {
                    required: t('addquote.quote_required'),
                  })}
                  className='pl-3 italic pr-12 px-4 py-2 w-full bg-transparent border border-search outline-none rounded-4'
                />
                <p className='absolute text-gray-600 top-2 right-2'>Eng</p>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='body.en' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div className='flex items-center relative'>
                <textarea
                  placeholder='ახალი ციტატა'
                  disabled={loading}
                  {...register('body.ka', {
                    required: t('addquote.quote_required'),
                  })}
                  className='pl-3 italic pr-12 px-4 py-2 w-full bg-transparent border border-search outline-none rounded-4'
                />
                <p className='absolute text-gray-600 top-2 right-2'>ქარ</p>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='body.ka' errors={errors} />
              </p>
            </div>
            <div {...getRootProps()} className='relative'>
              <div className='py-7 px-4 flex items-center gap-4 border border-search rounded-4'>
                {preview && (
                  <img
                    className='w-1/2 max-h-64'
                    src={preview}
                    alt='Uploaded Image'
                  />
                )}
                <div className='flex items-center gap-2'>
                  <Photo />
                  <p>{t('addquote.drag')}</p>
                </div>
                <input
                  {...getInputProps()}
                  disabled={loading}
                  {...register('image', {
                    validate: validateBanner,
                  })}
                  className='hidden'
                  type='file'
                  id='image'
                />
                <label
                  className='p-2 bg-purple-800   text-white'
                  htmlFor='image'
                >
                  {t('addquote.choose')}
                </label>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='image' errors={errors} />
              </p>
            </div>
            <button
              disabled={loading}
              type='submit'
              className='disabled:bg-red-700 rounded-4 py-2 w-full bg-red-600 text-white'
            >
              {t('addquote.add_quote')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
