import { CommentNotif, LikeNotif } from '@/components/icons';
import { getAvatar } from '@/helpers';
import { NotificationType } from '@/types';
import { useSingleNotification } from './useSingleNotification';
import { useContext } from 'react';
import { NotificationsContext } from '@/context';
import { useTranslation } from 'next-i18next';

export const SingleNotification: React.FC<{
  notification: NotificationType;
}> = ({ notification }) => {
  const src = getAvatar(notification.sender);
  const { formattedTimestamp } = useSingleNotification(notification.created_at);
  const { handleRead } = useContext(NotificationsContext);
  const { t } = useTranslation();
  return (
    <div
      onClick={() => {
        !notification.read && handleRead(notification.id);
      }}
      className={`${
        !notification.read && 'cursor-pointer'
      } flex items-center justify-between lg:flex-row flex-col px-6 py-5 border border-search rounded-sm`}
    >
      <div className='w-full flex items-center gap-6'>
        <img
          className={`w-20 h-20 rounded-full object-cover ${
            !notification.read && 'border-2 border-green-500'
          }`}
          src={src}
        />
        <div className='flex flex-col gap-2'>
          <h2 className='text-white text-xl'>
            {notification?.sender?.username}
          </h2>
          <div className='flex items-center gap-3'>
            {notification.type == 'comment' && (
              <>
                <CommentNotif />
                <p className='text-gray-300 text-xl'>
                  {t('notifications.comment')}
                </p>
              </>
            )}
            {notification.type == 'like' && (
              <>
                <LikeNotif />
                <p className='text-gray-300 text-xl'>
                  {t('notifications.like')}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='mt-2 lg:mt-0 flex lg:flex-col items-center  lg:items-end lg:justify-around gap-2 w-full order'>
        <p className='lg:ml-0 ml-10 text-white text-xl lg:order-1 order-2'>
          {formattedTimestamp}
        </p>
        {!notification.read && (
          <p className='lg:ml-0 ml-4 text-green-600 text-xl lg:order-2 order-1'>
            {t('notifications.now')}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleNotification;
