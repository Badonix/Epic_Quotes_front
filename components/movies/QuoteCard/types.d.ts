import { PostType } from '@/types';

export type PropsType = {
  quote: PostType;
  setActiveQuote: React.Dispatch<React.SetStateAction<any>>;
};
