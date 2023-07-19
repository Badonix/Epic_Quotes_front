import React from 'react';
import { getUser } from '@/services';
import { useQuery } from 'react-query';
const Me = () => {
  const { data: user } = useQuery('me', getUser);
  return <div className='text-white'>{JSON.stringify(user)}</div>;
};

export default Me;
