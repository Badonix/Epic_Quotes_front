import {
  Post,
  SearchPost,
  FeedNavbar,
  Sidebar,
  AddQuoteModal,
} from '@/components';
import { ModalContext } from '@/context';
import { useNewsFeed } from '@/hooks';
import { fetchMovies } from '@/services';
import React, { useContext } from 'react';

const NewsFeed = ({ movies }: any) => {
  const { setSearchActive, setSidebarActive, sidebarActive, searchActive } =
    useNewsFeed();
  const { openModal } = useContext(ModalContext);

  return (
    <>
      {openModal != 'postquote' && <AddQuoteModal movies={movies} />}
      <FeedNavbar
        setSearchActive={setSearchActive}
        setSidebarActive={setSidebarActive}
      />
      <section className='py-24 flex justify-between'>
        <Sidebar
          currentPage='news-feed'
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
        />
        <div className='flex flex-col w-full items-center'>
          <SearchPost
            searchActive={searchActive}
            setSearchActive={setSearchActive}
          />
          <div className='w-full px-10 mt-6 flex flex-col gap-10'>
            <Post />
            <Post />
          </div>
        </div>
        <div className='lg:w-530'></div>
      </section>
    </>
  );
};

export async function getServerSideProps() {
  let movies;
  try {
    const res = await fetchMovies();
    movies = res.data;
  } catch (e) {
    console.log(e);
  }
  return { props: { movies } };
}
export default NewsFeed;
