import React from 'react';
import { PropsType } from './type';
const Quote: React.FC<PropsType> = ({ image }) => {
  return (
    <article
      style={{ backgroundImage: `url("/assets/images/${image}")` }}
      className={`bg-fixed w-screen h-screen top-0 bg-cover flex bg-center items-center text-white sticky`}
    >
      <div className='flex items-start xl:px-44 px-12 gap-2'>
        <div className='border border-white w-14 bg-white mt-9'></div>
        <div>
          <h2 className='xl:text-5xl text-3xl xl:max-w-1/2 max-w-sm xl:leading-75 min-w:'>
            I think we’re just gonna have to be secretly in love with earch
            other and leave it that
          </h2>
          <p className='xl:text-3xl text-xl'>The Royal Tenenbaums,2001 </p>
        </div>
      </div>
    </article>
  );
};

export default Quote;
