import { useState } from 'react';

export const useMovie = () => {
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  return { sidebarActive, setSidebarActive };
};
