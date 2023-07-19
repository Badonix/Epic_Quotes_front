import { NotificationsContext } from '@/context';
import { getAvatar } from '@/helpers';
import { NotificationType } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useTranslation } from 'next-i18next';
export const useSingleNotification = (
  timestamp: string,
  notification: NotificationType
) => {
  const { locale } = useRouter();
  let formattedTimestamp = formatDistanceToNow(parseISO(timestamp), {
    addSuffix: true,
  });
  const src = getAvatar(notification.sender);

  const { handleRead } = useContext(NotificationsContext);
  const { t } = useTranslation();

  const translations = [
    ['minutes', 'წუთის'],
    ['minute', 'წუთის'],
    ['hours', 'საათის'],
    ['hour', 'საათის'],
    ['days', 'დღის'],
    ['day', 'დღის'],
    ['weeks', 'კვირის'],
    ['week', 'კვირის'],
    ['months', 'თვის'],
    ['month', 'თვის'],
    ['years', 'წლის'],
    ['year', 'წლის'],
    ['ago', 'წინ'],
    ['less than a', '1'],
  ];

  formattedTimestamp = formattedTimestamp.replaceAll('about', '');
  if (locale === 'ka') {
    translations.forEach(([key, value]) => {
      formattedTimestamp = formattedTimestamp.replaceAll(key, value);
    });
  }

  return {
    formattedTimestamp,
    src,
    handleRead,
    t,
  };
};
