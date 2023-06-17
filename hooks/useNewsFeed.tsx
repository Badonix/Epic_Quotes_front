import { useState } from 'react';

export const useNewsFeed = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);

  return {
    sidebarActive,
    setSidebarActive,
    searchActive,
    setSearchActive,
  };
};
