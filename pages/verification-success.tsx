import React from 'react';
import { useRedirectToSuccess } from '@/hooks';
const VerificationSuccess = () => {
  useRedirectToSuccess();
  return <div className='h-screen'></div>;
};
export default VerificationSuccess;
