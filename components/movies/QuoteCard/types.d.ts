import { PostType } from '@/types';
import { SetStateAction } from 'react';

export type PropsType = {
  quote: PostType;
  setActiveQuote: React.Dispatch<React.SetStateAction<any>>;
};
