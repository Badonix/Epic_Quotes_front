import { SetStateAction } from 'react';
import { SingleNotification } from '../SingleNotification';
import { useNotifications } from './useNotifications';
export const Notifications: React.FC<{
  setNotificationsActive: React.Dispatch<SetStateAction<boolean>>;
}> = ({ setNotificationsActive }) => {
  const { handleReadAll, notifications, t } = useNotifications();
  return (
    <div className='bg-black rounded-md w-full px-8 py-10 max-h-75vh overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900'>
      <div
        onClick={() => setNotificationsActive(false)}
        className='absolute  h-screen w-screen -left-full top-0 -z-10'
      ></div>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-3xl'>
          {t('notifications.notifications')}
        </h2>
        <p
          onClick={handleReadAll}
          className='underline text-white text-xl cursor-pointer'
        >
          {t('notifications.mark_all')}
        </p>
      </div>
      <div className='mt-6 flex flex-col gap-4'>
        {notifications.map((notification) => (
          <SingleNotification
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
};

export default Notifications;
