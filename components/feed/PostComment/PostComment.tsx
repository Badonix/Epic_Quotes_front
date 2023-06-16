import Image from 'next/image';
import React from 'react';

const PostComment = () => {
  return (
    <div className='flex mt-6 gap-6'>
      <div className='flex-shrink-0'>
        <Image
          width={52}
          height={52}
          alt='pfp'
          src='/assets/images/default-pfp.png'
        />
      </div>
      <div className='flex flex-col gap-3 pt-3 py-6 border-b border-search'>
        <h2 className='text-white text-xl font-bold'>Nina Baldadze</h2>
        <p className='text-white text-xl'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          nunc vel massa facilisis consequat elit morbi convallis convallis.
          Volutpat vitae et nisl et. Adipiscing enim integer mi leo nisl. Arcu
          vitae mauris odio eget.
        </p>
      </div>
    </div>
  );
};

export default PostComment;
