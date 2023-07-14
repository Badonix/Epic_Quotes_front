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
import { ModalContext } from '@/context';
import { useMovie } from '@/hooks';
import { fetchMovie, me } from '@/services';
import { MovieType, PostType, UserType } from '@/types';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useContext, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
export const Movie: NextPage<{
  movie: MovieType;
  user: UserType;
}> = ({ movie, user }) => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { setSidebarActive, sidebarActive, handleDelete } = useMovie();
  const [activeQuote, setActiveQuote] = useState(null);
  return (
    <>
      {openModal === 'editmovie' && <EditMovie user={user} movie={movie} />}
      {openModal === 'addquote' && <AddMovieQuote user={user} movie={movie} />}
      {openModal === 'viewquote' && (
        <ViewQuote
          user={user}
          setActiveQuote={setActiveQuote}
          activeQuote={activeQuote}
        />
      )}
      {openModal === 'editquote' && (
        <EditQuote user={user} activeQuote={activeQuote} />
      )}
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='min-h-screen pt-24 py-6 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          user={user}
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
          currentPage='movies'
        />
        <div className='mt-7 w-full'>
          <h2 className='text-white text-2xl'>{t('movie.description')}</h2>
          <div className='flex mt-6 gap-5 lg:flex-row flex-col w-full'>
            <img
              className='lg:w-810 lg:h-441 rounded-xl object-cover w-full'
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${movie?.banner}`}
              alt='movie'
            />
            <div className='flex flex-col gap-6'>
              <div className='flex items-center justify-between gap-4'>
                <h2 className='font-bold text-orange-200 text-2xl'>
                  {locale == 'ka' ? movie?.title.ka : movie?.title.en}
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
                    onClick={() => handleDelete(Number(movie?.id))}
                    className='cursor-pointer'
                  >
                    <Trash />
                  </div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div className='text-white bg-gray-500 rounded-md px-3 py-1'>
                    {movie?.genre}
                  </div>
                </div>
              </div>
              <div>
                <p className='font-bold text-lg text-gray-300'>
                  {t('movie.director')}
                  <span className='font-normal text-white ml-2'>
                    {locale == 'ka' ? movie?.director.ka : movie?.director.en}
                  </span>
                </p>
              </div>
              <div>
                <p className='font-bold text-lg text-gray-300'>
                  {t('movie.budget')}
                  <span className='font-normal text-white ml-2'>
                    {movie?.budget}$
                  </span>
                </p>
              </div>
              <div>
                <p className='text-gray-300 text-lg max-w-xl'>
                  {locale == 'ka'
                    ? movie?.description.ka
                    : movie?.description.en}
                </p>
              </div>
            </div>
          </div>
          <section className='w-810'>
            <div className='w-full mt-10'>
              <div className='flex items-center gap-4'>
                <h2 className='text-white text-2xl'>
                  {t('movie.quote')} ({t('movie.total')} {movie?.quotes?.length}
                  )
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
              {movie?.quotes?.map((quote: PostType) => (
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
  const { id } = context.query;
  let movie, user;
  const { locale = 'en' } = context;

  try {
    const response = await fetchMovie(Number(id), context.req.headers.cookie);
    const userRes = await me(context.req.headers.cookie);
    user = userRes.data;
    movie = response.data;
  } catch (e) {}
  return {
    props: {
      movie,
      user,
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default Movie;
