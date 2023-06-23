import { Edit, Navbar, Sidebar, Trash } from '@/components';
import { EditMovie } from '@/components/movies';
import { ModalContext } from '@/context';
import { useMovie } from '@/hooks';
import { fetchMovie } from '@/services';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useContext } from 'react';

export const Movie: NextPage<{ movie: any }> = ({ movie }) => {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const { setSidebarActive, sidebarActive, handleDelete } = useMovie();
  return (
    <>
      {openModal === 'editmovie' && <EditMovie movie={movie} />}
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='min-h-screen py-24 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          sidebarActive={sidebarActive}
          setSidebarActive={setSidebarActive}
          currentPage='movies'
        />
        <div className='mt-7 w-full'>
          <h2 className='text-white text-2xl'>Movie Description</h2>
          <div className='flex mt-6 gap-5 lg:flex-row flex-col w-full'>
            <img
              className='w-full lg:w-810 lg:h-441 rounded-xl object-cover w-full'
              src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${movie.banner}`}
              alt='movie'
            />
            <div className='flex flex-col gap-6'>
              <div className='flex items-center justify-between'>
                <h2 className='font-bold text-orange-200 text-2xl'>
                  {movie.title.en}
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
                    onClick={() => handleDelete(movie.id)}
                    className='cursor-pointer'
                  >
                    <Trash />
                  </div>
                </div>
              </div>
              <div>
                <div className='flex'>
                  <div className='text-white bg-gray-500 rounded-md px-3 py-1'>
                    {movie.genre}
                  </div>
                </div>
              </div>
              <div>
                <p className='font-bold text-lg text-gray-300'>
                  Director:
                  <span className='font-normal text-white ml-2'>
                    {movie.director.en}
                  </span>
                </p>
              </div>
              <div>
                <p className='font-bold text-lg text-gray-300'>
                  Budget:
                  <span className='font-normal text-white ml-2'>
                    {movie.budget}$
                  </span>
                </p>
              </div>
              <div>
                <p className='text-gray-300 text-lg max-w-xl'>
                  {movie.description.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let movie;
  try {
    const response = await fetchMovie(Number(id));
    movie = response.data;
    console.log(movie);
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      movie,
    },
  };
}
export default Movie;
