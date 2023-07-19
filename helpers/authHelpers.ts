import { NextRouter } from 'next/router';

export const checkAuth = (e: any, router: NextRouter, locale?: string) => {
  if (
    e.response.status == 401 ||
    e.response.status == '419' ||
    e.response.status == '403'
  ) {
    router.push(`/${locale}/unauthorized`);
  }
};
