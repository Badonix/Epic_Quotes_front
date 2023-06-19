import { useState } from 'react';

export const useMovies = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  return {
    sidebarActive,
    setSidebarActive,
  };
};
