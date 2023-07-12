import { Close, Dropdown, Movie, Photo } from '@/components/icons';
import { useModal } from '@/hooks';
import Image from 'next/image';
import { useAddQuote } from './useAddQuote';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import { PropsType } from './types';
import { MovieType } from '@/types';
import { getAvatar } from '@/helpers';
export const AddQuoteModal: React.FC<PropsType> = ({
  movies,
  setPosts,
  user,
}) => {
  const { setOpenModal, wrapperRef } = useModal();
  const [movieDropdown, setMovieDropdown] = useState<boolean>(false);
  const [movieValue, setMovieValue] = useState<string>('');
  const {
    errors,
    getRootProps,
    register,
    getInputProps,
    handleSubmit,
    loading,
    preview,
    onSubmit,
    validateBanner,
    setValue,
  } = useAddQuote(setPosts);
  const userSrc = getAvatar(user);
  return (
    <div className='w-full fixed h-screen bg-transparent backdrop-blur-sm z-50'>
      <div
        ref={wrapperRef}
        className='backdrop-blur-md bg-sidebar text-white w-11/12 max-w-4xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl'
      >
        <div className='flex justify-between items-center py-9 px-10 border-b border-search'>
          <div></div>
          <h2 className='text-2xl'>Add Quote</h2>
          <div onClick={() => setOpenModal('')}>
            <Close />
          </div>
        </div>
        <div className='px-8'>
          <div className='flex items-center gap-4 mt-7'>
            <Image
              width={60}
              height={60}
              className='w-15 h-15 object-cover rounded-full'
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
            <div className='relative'>
              <div className='flex items-center relative'>
                <label className='top-2 left-2 absolute whitespace-nowrap text-white'></label>
                <textarea
                  placeholder={'Start creating new quote'}
                  disabled={loading}
                  {...register('body.en', {
                    required: 'Quote is required',
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
                    required: 'ციტატა აუცილებელია',
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
                  <p>Drag & drop your image here or</p>
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
                  Choose file
                </label>
              </div>
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='image' errors={errors} />
              </p>
            </div>
            <div className='relative'>
              <div
                onClick={() => setMovieDropdown((prev) => !prev)}
                className='flex items-center justify-between p-6 cursor-pointer bg-black'
              >
                <div className='text-white flex items-center gap-2'>
                  <Movie />
                  <h2 className='text-2xl'>{movieValue || 'Choose movie'}</h2>
                </div>
                {/* icon */}
                <Dropdown />
                {movieDropdown && (
                  <div className='z-30 transition-all max-h-36 scrollbar-thin scrollbar-thumb-slate-50 overflow-y-auto absolute w-full left-0 top-full'>
                    {movies.map((movie: MovieType) => {
                      return (
                        <div
                          onClick={() => {
                            setValue('movie_id', movie.id);
                            setMovieValue(movie.title.en);
                          }}
                          key={movie.id}
                          className='hover:bg-gray-700 w-full bg-gray-950 px-4 py-3 text-white text-xl'
                        >
                          {movie.title.en}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <input
                type='number'
                hidden
                {...register('movie_id', { required: 'Movie is required' })}
              />
              <p className='absolute -bottom-5 text-red-600'>
                <ErrorMessage name='movie_id' errors={errors} />
              </p>
            </div>
            <button
              disabled={loading}
              type='submit'
              className='disabled:bg-red-700 rounded-4 py-2 w-full bg-red-600 text-white'
            >
              Add movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddQuoteModal;
