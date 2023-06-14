import React from 'react';
import { me } from '@/services';
import { useQuery } from 'react-query';
const Me = () => {
  const { data: user } = useQuery('me', me);
  return <div className='text-white'>{JSON.stringify(user)}</div>;
};

export default Me;
