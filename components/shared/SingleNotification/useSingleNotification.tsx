import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/router';
export const useSingleNotification = (timestamp: string) => {
  const { locale } = useRouter();
  let formattedTimestamp = formatDistanceToNow(parseISO(timestamp), {
    addSuffix: true,
  });

  formattedTimestamp = formattedTimestamp.replaceAll('about', '');
  if (locale == 'ka') {
    formattedTimestamp = formattedTimestamp.replaceAll('minutes', 'წუთის');
    formattedTimestamp = formattedTimestamp.replaceAll('minute', 'წუთის');
    formattedTimestamp = formattedTimestamp.replaceAll('hours', 'საათის');
    formattedTimestamp = formattedTimestamp.replaceAll('hour', 'საათის');
    formattedTimestamp = formattedTimestamp.replaceAll('days', 'დღის');
    formattedTimestamp = formattedTimestamp.replaceAll('day', 'დღის');
    formattedTimestamp = formattedTimestamp.replaceAll('weeks', 'კვირის');
    formattedTimestamp = formattedTimestamp.replaceAll('week', 'კვირის');
    formattedTimestamp = formattedTimestamp.replaceAll('months', 'თვის');
    formattedTimestamp = formattedTimestamp.replaceAll('month', 'თვის');
    formattedTimestamp = formattedTimestamp.replaceAll('years', 'წლის');
    formattedTimestamp = formattedTimestamp.replaceAll('year', 'წლის');
    formattedTimestamp = formattedTimestamp.replaceAll('ago', 'წინ');
    formattedTimestamp = formattedTimestamp.replaceAll('less than a', '1');
  }

  return {
    formattedTimestamp,
  };
};
