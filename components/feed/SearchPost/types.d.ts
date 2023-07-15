import { PostType } from '@/types';

export type PropsType = {
  searchActive: boolean;
  setSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: PostType[];
  setSearchResult: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export type SearchType = {
  search: string;
};
