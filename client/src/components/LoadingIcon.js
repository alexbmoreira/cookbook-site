import React from 'react';

const LoadingIcon = () => {
  return (
    <div className='w-full h-full flex'>
      <div className='my-8 mx-auto inline-block h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-carolina'>
        <div className='h-full w-full flex items-center justify-center'>
          <div className='inline-block h-8 w-8 animate-spin-reverse rounded-full border-4 border-t-transparent border-carolina'/>
        </div>
      </div>
    </div>
  );
};

export default LoadingIcon;
