import { Add, Navbar, Search, Sidebar } from '@/components';
import { useModal } from '@/hooks';
import { useState } from 'react';

const Profile = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const { setOpenModal } = useModal();
  return (
    <>
      <Navbar setSidebarActive={setSidebarActive} />
      <section className='min-h-screen py-24 flex lg:pr-16 lg:pl-0 px-8'>
        <Sidebar
          setSidebarActive={setSidebarActive}
          sidebarActive={sidebarActive}
          currentPage='profile'
        />
        <div className='mt-6 w-full'>
          <h2 className='text-white text-2xl mt-4'>My profile</h2>
          <section className='w-full flex items-center justify-center'>
            <div className='bg-sidebar max-w-5xl w-full flex flex-col items-center justify-center'>
              <div className='flex flex-col justify-center items-center gap-2'>
                <img src='/assets/default-pfp.png' alt='pfp' />
                <label>Upload new photo</label>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Profile;
