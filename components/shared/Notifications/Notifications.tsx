import { SetStateAction } from 'react';
import { SingleNotification } from '../SingleNotification';

export const Notifications: React.FC<{
  setNotificationsActive: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setNotificationsActive }) => {
  return (
    <div className='bg-black rounded-md w-full px-8 py-10'>
      <div
        onClick={() => setNotificationsActive(false)}
        className='absolute h-screen w-screen bg-transparent top-0 left-0 -z-10'
      ></div>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-3xl'>Notifications</h2>
        <p className='underline text-white text-xl cursor-pointer'>
          Mark as all read
        </p>
      </div>
      <div className='mt-6 flex flex-col gap-4'>
        <SingleNotification />
        <SingleNotification />
        <SingleNotification />
        <SingleNotification />
        <SingleNotification />
      </div>
    </div>
  );
};

export default Notifications;
