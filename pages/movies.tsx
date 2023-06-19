import { Add, Navbar, Search, Sidebar } from '@/components';
import { AddMovie, MovieCard } from '@/components/movies';
import { ModalContext } from '@/context';
import { useMovies } from '@/hooks/useMovies';
import React, { useContext } from 'react';
const Movies = () => {
  const { setSidebarActive, sidebarActive } = useMovies();
  const { openModal, setOpenModal } = useContext(ModalContext);

  return (
    <>
      {openModal === 'addmovie' && <AddMovie />}
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='py-24 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          currentPage='movies'
        />
        <div className='mt-6 w-full'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex gap-2 flex-col lg:flex-row'>
              <p className='text-xl lg:text-2xl text-white'>
                My list of movies
              </p>
              <p className='text-white lg:text-2xl text-lg'>(Total 25)</p>
            </div>
            <div className='flex items-center gap-8'>
              <div className='items-center gap-4 hidden lg:flex'>
                <Search />
                <p className='text-gray-300 text-xl'>Search</p>
              </div>
              <div
                onClick={() => setOpenModal('addmovie')}
                className='flex items-center gap-1 lg:gap-2 text-base lg:text-xl cursor-pointer text-white bg-red-600 lg:px-4 py-3 px-3 whitespace-nowrap w-full rounded-md'
              >
                <Add />
                Add movie
              </div>
            </div>
          </div>
          <div className='mt-14 flex flex-wrap gap-12 justify-around'>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Movies;
