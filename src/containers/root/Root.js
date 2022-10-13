import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <div className='flex py-2 justify-center w-full bg-white sticky z-50 top-0 drop-shadow-sm'>
      <span className='text-xl text-carolina'>
        <Link to='/'>
          <FontAwesomeIcon icon="fa-solid fa-utensils" />
        </Link>
      </span>
    </div>
  );
};

const Footer = () => {
  return (
    <div className='h-12 w-full striped mt-4'/>
  );
};

const Root = () => {
  return (
    <div className='text-eerie-black flex flex-col min-h-screen'>
      <Header/>
      <div className='flex-grow'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
}

export default Root;
