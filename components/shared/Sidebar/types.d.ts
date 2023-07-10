import { UserType } from '@/types';

export type PropsType = {
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  user: UserType;
};
