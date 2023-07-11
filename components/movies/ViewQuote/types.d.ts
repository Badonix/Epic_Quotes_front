import { PostType, UserType } from '@/types';
import { SetStateAction } from 'react';

export type PropsType = {
  user: UserType;
  activeQuote?: PostType | null;
  setActiveQuote: React.Dispatch<SetStateAction<any>>;
};
