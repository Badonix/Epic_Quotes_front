import {
  Post,
  SearchPost,
  FeedNavbar,
  Sidebar,
  AddQuoteModal,
} from '@/components';
import { ModalContext } from '@/context';
import { useNewsFeed } from '@/hooks';
import { fetchMovies, fetchPosts } from '@/services';
import { PostType } from '@/types';
import { useContext } from 'react';

const NewsFeed = ({ movies, quotes }: any) => {
  const {
    setSearchActive,
    posts,
    loadMoreRef,
    setSidebarActive,
    sidebarActive,
    searchActive,
    setPosts,
  } = useNewsFeed(quotes);
  const { openModal } = useContext(ModalContext);

  return (
    <>
      {openModal === 'postquote' && (
        <AddQuoteModal setPosts={setPosts} movies={movies} />
      )}
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
            {posts?.map((post: PostType) => {
              return <Post key={post.id} post={post} />;
            })}
            <div ref={loadMoreRef} className='w-full h-3'></div>
          </div>
        </div>
        <div className='lg:w-530'></div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: any) {
  let movies, quotes;
  try {
    console.log(context.req.headers.cookie);
    const res = await fetchMovies(context.req.headers.cookie);
    const quotesData = await fetchPosts(1);
    quotes = quotesData.data.data;
    movies = res.data;
  } catch (e) {
    console.log(e);
  }
  return { props: { movies, quotes } };
}
export default NewsFeed;
