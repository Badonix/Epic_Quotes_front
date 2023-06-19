import { Add, Navbar, Search, Sidebar } from '@/components';
import { MovieCard } from '@/components/movies';
import { useMovies } from '@/hooks/useMovies';
import React from 'react';

const Movies = () => {
  const { setSidebarActive, sidebarActive } = useMovies();
  return (
    <>
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='py-24 flex pr-16'>
        <Sidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          currentPage='movies'
        />
        <div className='mt-6 w-full'>
          <div className='flex items-center justify-between w-full'>
            <p className='text-2xl text-white'>My list of movies (Total 25)</p>
            <div className='flex items-center gap-8'>
              <div className='flex items-center gap-4'>
                <Search />
                <p className='text-gray-300 text-xl'>Search</p>
              </div>
              <div className='flex items-center gap-2 text-xl cursor-pointer text-white bg-red-600 px-4 py-3 rounded-md'>
                <Add />
                Add movie
              </div>
            </div>
          </div>
          <div>
            <MovieCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default Movies;
