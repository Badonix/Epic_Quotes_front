import { Navbar, Sidebar } from '@/components/shared';
import React, { useState } from 'react';

const NewsFeed = () => {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <>
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='py-24 flex'>
        <Sidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
        />
      </section>
    </>
  );
};

export default NewsFeed;
