import { NextRouter } from 'next/router';

export const checkAuth = (e: any, router: NextRouter) => {
  if (
    e.response.status == 401 ||
    e.response.status == '419' ||
    e.response.status == '403'
  ) {
    router.push('/unauthorized');
  }
};
