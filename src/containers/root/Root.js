import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Root = () => {
  return (
    <div>
      <div className='p-4 w-full bg-white sticky z-50 top-0 drop-shadow-sm'>
        <span className='text-sky-800'>
          <Link to='/'>
            <FontAwesomeIcon icon="fa-solid fa-house-chimney" />
          </Link>
        </span>
      </div>
      <Outlet/>
    </div>
  );
}

export default Root;
