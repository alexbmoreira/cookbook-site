import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Root = () => {
  return (
    <div className='text-eerie-black'>
      <div className='flex py-2 justify-center w-full bg-white sticky z-50 top-0 drop-shadow-sm'>
        <span className='text-xl text-carolina'>
          <Link to='/'>
            <FontAwesomeIcon icon="fa-solid fa-utensils" />
          </Link>
        </span>
      </div>
      <Outlet/>
    </div>
  );
}

export default Root;
