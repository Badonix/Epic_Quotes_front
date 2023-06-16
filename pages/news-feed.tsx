import { Post, SearchPost, Navbar, Sidebar } from '@/components';
import { useNewsFeed } from '@/hooks';
import React from 'react';

const NewsFeed = () => {
  const { setSearchActive, setSidebarActive, sidebarActive, searchActive } =
    useNewsFeed();
  return (
    <>
      <Navbar
        setSearchActive={setSearchActive}
        setSidebarActive={setSidebarActive}
      />
      <section className='py-24 flex justify-between'>
        <Sidebar
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

export default NewsFeed;
