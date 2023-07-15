import Link from 'next/link';
export const Unauthorized = () => {
  return (
    <section className='h-screen flex flex-col items-center justify-center gap-8'>
      <div className='px-6 flex flex-col items-center justify-center gap-8 -translate-y-10'>
        <div className='flex flex-col gap-4 items-center'>
          <img src={'/assets/images/gandolf.png'} className='w-80' />
          <h2 className='text-center text-white md:text-5xl text-2xl'>
            You shall not pass
          </h2>
        </div>
        <p className='text-center text-white text-base md:text-2xl'>
          Sorry, but you don’t have permission to access this page
        </p>
        <Link
          href='/'
          className='mt-4 text-white cursor-pointer bg-red-600 px-4 py-2 rounded-4'
        >
          Return home
        </Link>
      </div>
    </section>
  );
};
export default Unauthorized;
