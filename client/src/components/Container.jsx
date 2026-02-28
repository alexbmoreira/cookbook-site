import React from 'react';

const Container = ({className, children}) => {
  return (
    <div className={`p-4 md:px-32 lg:px-48 2xl:px-96 ${className || ''}`}>
      {children}
    </div>
  );
}

export default Container;
