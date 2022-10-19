import React from 'react';

const Container = ({className, children}) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
