import React, { useEffect, useState } from 'react';
import { me } from '@/services';
const Me = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await me();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  return <div className='text-white'>{JSON.stringify(user)}</div>;
};
export default Me;
