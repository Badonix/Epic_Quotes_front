import { NextPage } from 'next';
import { Navbar, Quote, Signup, Login } from '@/components';
import { ModalContext } from '@/context';
import { useContext } from 'react';
const Home: NextPage = () => {
  const { openModal } = useContext(ModalContext);
  return (
    <div className='relative h-screen'>
      {openModal === 'signup' && <Signup />}
      {openModal === 'login' && <Login />}
      <Navbar />
      <main className='h-75sc flex items-center justify-center'>
        <div className='flex items-center justify-center flex-col px-16'>
          <h2 className='leading-90 md:text-6xl text-4xl max-w-2xl text-center text-orange-200'>
            Find any quote in millions of movie lines
          </h2>
          <button className='pointer hover:bg-red-700 transition-all mt-10 md:mt-6 py-2 px-6 bg-red-600 rounded-md text-white'>
            Get started
          </button>
        </div>
      </main>
      <div>
        <Quote image={'bg-image1.png'} />
        <Quote image={'bg-image2.png'} />
        <Quote image={'bg-image3.png'} />
      </div>
    </div>
  );
};
export default Home;
