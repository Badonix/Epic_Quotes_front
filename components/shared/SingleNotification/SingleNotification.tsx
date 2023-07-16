import { CommentNotif } from '@/components/icons';

export const SingleNotification = () => {
  return (
    <div className='flex items-center justify-between lg:flex-row flex-col px-6 py-5 border border-search rounded-sm'>
      <div className='w-full flex items-center gap-6'>
        <img
          className='w-20 h-20 rounded-full object-cover'
          src='/assets/images/default-pfp.png'
        />
        <div className='flex flex-col gap-2'>
          <h2 className='text-white text-xl'>Nino Tabagari</h2>
          <div className='flex items-center gap-3'>
            <CommentNotif />
            <p className='text-gray-300 text-xl'>
              Commented to your movie quote
            </p>
          </div>
        </div>
      </div>
      <div className='mt-2 lg:mt-0 flex lg:flex-col items-center  lg:items-end lg:justify-around gap-2 w-full order'>
        <p className='lg:ml-0 ml-10 text-white text-xl lg:order-1 order-2'>
          5 min ago
        </p>
        <p className='lg:ml-0 ml-4 text-green-600 text-xl lg:order-2 order-1'>
          Now
        </p>
      </div>
    </div>
  );
};

export default SingleNotification;
