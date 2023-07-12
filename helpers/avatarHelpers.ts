import { UserType } from '@/types';

export const getAvatar = (user: UserType) => {
  return user?.avatar
    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user?.avatar}`
    : '/assets/images/default-pfp.png';
};
