import {
  Post,
  SearchPost,
  FeedNavbar,
  Sidebar,
  AddQuoteModal,
} from '@/components';
import { ModalContext } from '@/context';
import { useNewsFeed } from '@/hooks';
import { fetchMovies, fetchPosts, me } from '@/services';
import { FeedPropsType, PostType } from '@/types';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContext } from 'react';

const NewsFeed: NextPage<FeedPropsType> = ({ movies, quotes, user }) => {
  const {
    setSearchActive,
    posts,
    loadMoreRef,
    setSidebarActive,
    sidebarActive,
    searchActive,
    setPosts,
    data,
    searchResult,
    setSearchResult,
  } = useNewsFeed(quotes, user);
  const { openModal } = useContext(ModalContext);
  return (
    <>
      {openModal === 'postquote' && (
        <AddQuoteModal user={user} setPosts={setPosts} movies={movies} />
      )}
      <FeedNavbar
        user={user}
        setSearchActive={setSearchActive}
        setSidebarActive={setSidebarActive}
      />
      <section className='py-24 flex justify-between min-h-screen'>
        <Sidebar
          user={user}
          currentPage='news-feed'
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
        />
        <div className='flex flex-col w-full items-center'>
          <SearchPost
            searchResult={searchResult}
            setSearchResult={setSearchResult}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
          />
          <div className='w-full px-10 mt-6 flex flex-col gap-10'>
            {searchResult.length > 0 &&
              searchResult.map((post) => (
                <Post user={user} key={post.id} post={post} />
              ))}
            {searchResult.length == 0 && (
              <>
                {posts?.map((post: PostType) => (
                  <Post user={user} key={post.id} post={post} />
                ))}
                {data?.pages
                  ?.flatMap((data: any) => {
                    return data.data.data;
                  })
                  ?.map((post: PostType) => {
                    return <Post user={user} key={post.id} post={post} />;
                  })}
              </>
            )}
            <div ref={loadMoreRef} className='w-full h-3'></div>
          </div>
        </div>
        <div className='lg:w-530'></div>
      </section>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let movies, quotes, user;
  const { locale = 'en' } = context;

  try {
    const res = await fetchMovies(context.req.headers.cookie);
    const quotesData = await fetchPosts(1, context.req.headers.cookie);
    const userRes = await me(context.req.headers.cookie);
    user = userRes.data;
    quotes = quotesData.data.data;
    movies = res.data;
  } catch (e: any) {
    if (e.response.status == 401 || e.response.status == 403) {
      return {
        redirect: {
          destination: `/${locale}/unauthorized`,
          permanent: false,
        },
      };
    } else {
    }
  }
  return {
    props: {
      movies,
      quotes,
      user,
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default NewsFeed;
