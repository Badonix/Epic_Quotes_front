import { Navbar, Sidebar } from '@/components';
// import { useModal } from '@/hooks';
import { useState } from 'react';

const Profile = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  // const { setOpenModal } = useModal();
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
          <div className='w-full flex items-center justify-center h-full'>
            <section className='w-full flex items-center justify-center'>
              <div className='py-36 bg-sidebar max-w-5xl relative w-full px-4 flex flex-col items-center justify-center'>
                <form className='w-full flex justify-center flex-col'>
                  <div className='flex flex-col justify-center items-center gap-2 absolute left-1/2 -top-24 -translate-x-1/2 '>
                    <img
                      src='/assets/images/default-pfp.png'
                      alt='pfp'
                      className='w-44 h-44 object-cover rounded-full'
                    />
                    <label className='text-white text-xl'>
                      Upload new photo
                    </label>
                  </div>
                  <div className='flex items-center flex-col gap-12'>
                    <div className='flex flex-col w-full max-w-md gap-2'>
                      <label className='text-base text-white'>Username</label>
                      <div className='flex items-center gap-4'>
                        <input
                          className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                          type='text'
                        />
                        <p className='text-gray-300 cursor-pointer text-xl'>
                          Edit
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col w-full max-w-md gap-2'>
                      <label className='text-base text-white'>Email</label>
                      <div className='flex items-center gap-4'>
                        <input
                          className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                          type='text'
                        />
                        <p className='text-gray-300 cursor-pointer text-xl'>
                          Edit
                        </p>
                      </div>
                    </div>
                    <div className='flex flex-col w-full max-w-md gap-2'>
                      <label className='text-base text-white'>Password</label>
                      <div className='flex items-center gap-4'>
                        <input
                          className='w-full px-4 py-2 outline-none bg-gray-300 rounded-md text-black text-xl'
                          type='text'
                        />
                        <p className='text-gray-300 cursor-pointer text-xl'>
                          Edit
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
