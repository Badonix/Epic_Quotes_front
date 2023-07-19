import { Add, Navbar, Sidebar } from '@/components';
import { AddMovie, MovieCard, SearchMovie } from '@/components/movies';
import { ModalContext } from '@/context';
import { useMovies } from '@/hooks/useMovies';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Movies: NextPage = () => {
  const {
    setSidebarActive,
    sidebarActive,
    searchOpen,
    setSearchOpen,
    searchResults,
    setSearchResults,
    moviesData,
    userData,
    newMovies,
    setNewMovies,
  } = useMovies();
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { t } = useTranslation();
  return (
    <>
      {openModal === 'addmovie' && (
        <AddMovie
          user={userData}
          movies={moviesData}
          setNewMovies={setNewMovies}
        />
      )}
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='min-h-screen py-24 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          user={userData}
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          currentPage='movies'
        />
        <div className='mt-6 w-full'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex gap-2 flex-col lg:flex-row'>
              <p className='text-xl lg:text-2xl text-white'>
                {t('movies.list')}
              </p>
              <p className='text-white lg:text-2xl text-lg'>
                ({t('movies.total')} {moviesData?.length})
              </p>
            </div>
            <div className='flex items-center sm:gap-8 gap-4'>
              <SearchMovie
                searchResult={searchResults}
                setSearchResults={setSearchResults}
                setSearchOpen={setSearchOpen}
                searchOpen={searchOpen}
              />

              <div
                onClick={() => setOpenModal('addmovie')}
                className='flex items-center gap-1 lg:gap-2 text-base lg:text-xl cursor-pointer text-white bg-red-600 lg:px-4 py-3 px-3 whitespace-nowrap rounded-md'
              >
                <Add />
                {t('movies.add')}
              </div>
            </div>
          </div>
          <div className='mt-14 flex flex-wrap gap-12 justify-around'>
            {searchResults.length == 0 &&
              newMovies?.map((movie) => (
                <MovieCard id={Number(movie.id)} key={movie.id} movie={movie} />
              ))}
            {searchResults.length > 0
              ? searchResults.map((movie) => (
                  <MovieCard
                    id={Number(movie.id)}
                    key={movie.id}
                    movie={movie}
                  />
                ))
              : moviesData?.map((movie) => (
                  <MovieCard
                    id={Number(movie.id)}
                    key={movie.id}
                    movie={movie}
                  />
                ))}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale = 'en' } = context;

  return { props: { ...(await serverSideTranslations(locale)) } };
}

export default Movies;
