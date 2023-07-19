import {
  Post,
  SearchPost,
  FeedNavbar,
  Sidebar,
  AddQuoteModal,
} from '@/components';
import { ModalContext } from '@/context';
import { useNewsFeed } from '@/hooks';
import { PostType } from '@/types';
import { GetServerSidePropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useContext } from 'react';

const NewsFeed: NextPage = () => {
  const {
    setSearchActive,
    loadMoreRef,
    setSidebarActive,
    sidebarActive,
    searchActive,
    data,
    searchResult,
    setSearchResult,
    moviesData,
    userData,
  } = useNewsFeed();
  const { openModal } = useContext(ModalContext);
  return (
    <>
      {openModal === 'postquote' && (
        <AddQuoteModal user={userData} movies={moviesData} />
      )}
      <FeedNavbar
        setSearchActive={setSearchActive}
        setSidebarActive={setSidebarActive}
      />
      <section className='py-24 flex justify-between min-h-screen'>
        <Sidebar
          user={userData}
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
                <Post user={userData} key={post.id} post={post} />
              ))}
            {searchResult.length == 0 && (
              <>
                {data?.pages
                  ?.flatMap((data: any) => {
                    return data.data.data;
                  })
                  ?.map((post: PostType) => {
                    return <Post user={userData} key={post.id} post={post} />;
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
  const { locale = 'en' } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
export default NewsFeed;
