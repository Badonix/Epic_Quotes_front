import {
  Add,
  AddMovieQuote,
  Edit,
  EditQuote,
  Navbar,
  Sidebar,
  Trash,
  ViewQuote,
} from '@/components';
import { EditMovie, QuoteCard } from '@/components';
import { useMovie } from '@/hooks';
import { MovieType, PostType, UserType } from '@/types';
import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
export const Movie: NextPage<{
  movie: MovieType;
  user: UserType;
}> = () => {
  const {
    setSidebarActive,
    sidebarActive,
    handleDelete,
    movieData,
    userData,
    activeQuote,
    setActiveQuote,
    locale,
    openModal,
    setOpenModal,
    t,
  } = useMovie();
  return (
    <>
      {openModal === 'editmovie' && (
        <EditMovie user={userData} movie={movieData} />
      )}
      {openModal === 'addquote' && (
        <AddMovieQuote user={userData} movie={movieData} />
      )}
      {openModal === 'viewquote' && (
        <ViewQuote
          user={userData}
          setActiveQuote={setActiveQuote}
          activeQuote={activeQuote}
        />
      )}
      {openModal === 'editquote' && (
        <EditQuote user={userData} activeQuote={activeQuote} />
      )}
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='min-h-screen pt-24 py-6 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          user={userData}
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
          currentPage='movies'
        />
        <div className='mt-7 w-full'>
          <h2 className='text-white text-2xl'>{t('movie.description')}</h2>
          <div className='flex mt-6 gap-5 lg:flex-row flex-col w-full'>
            <img
              className='lg:w-810 lg:h-441 rounded-xl object-cover w-full'
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${movieData?.banner}`}
              alt='movie'
            />
            <div className='flex flex-col gap-6'>
              <div className='flex items-center justify-between gap-4'>
                <h2 className='font-bold text-orange-200 text-2xl'>
                  {locale == 'ka' ? movieData?.title.ka : movieData?.title.en}
                </h2>
                <div className='flex items-center gap-4 rounded-xl bg-modal px-4 py-2'>
                  <div
                    onClick={() => setOpenModal('editmovie')}
                    className='cursor-pointer'
                  >
                    <Edit />
                  </div>
                  <div className='w-px bg-search h-7'></div>
                  <div
                    onClick={() => handleDelete(Number(movieData?.id))}
                    className='cursor-pointer'
                  >
                    <Trash />
                  </div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div className='text-white bg-gray-500 rounded-md px-3 py-1'>
                    {JSON.stringify(movieData?.genre)}
                  </div>
                </div>
              </div>
              <div>
                <p className='font-bold text-lg text-gray-300'>
                  {t('movie.director')}
                  <span className='font-normal text-white ml-2'>
                    {locale == 'ka'
                      ? movieData?.director.ka
                      : movieData?.director.en}
                  </span>
                </p>
              </div>
              <div>
                <p className='font-bold text-lg text-gray-300'>
                  {t('movie.budget')}
                  <span className='font-normal text-white ml-2'>
                    {movieData?.budget}$
                  </span>
                </p>
              </div>
              <div>
                <p className='text-gray-300 text-lg max-w-xl'>
                  {locale == 'ka'
                    ? movieData?.description.ka
                    : movieData?.description.en}
                </p>
              </div>
            </div>
          </div>
          <section className='w-810'>
            <div className='w-full mt-10'>
              <div className='flex items-center gap-4'>
                <h2 className='text-white text-2xl'>
                  {t('movie.quote')} ({t('movie.total')}{' '}
                  {movieData?.quotes?.length})
                </h2>
                <div className='w-px bg-search h-10'></div>
                <div
                  onClick={() => setOpenModal('addquote')}
                  className='flex items-center gap-1 lg:gap-2 text-base lg:text-xl cursor-pointer text-white bg-red-600 lg:px-4 py-3 px-3 whitespace-nowrap rounded-md'
                >
                  <Add />
                  {t('movie.add_quote')}
                </div>
              </div>
            </div>
            <div className='mt-10 flex flex-col gap-10'>
              {movieData?.quotes?.map((quote: PostType) => (
                <QuoteCard
                  setActiveQuote={setActiveQuote}
                  key={quote.id}
                  quote={quote}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale = 'en' } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Movie;
