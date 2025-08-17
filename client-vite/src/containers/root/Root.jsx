import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import { authStore } from '../../store';

const Header = observer(() => {
  return (
    <div className='flex h-full font-bold text-carolina justify-center items-center w-full bg-white sticky top-0 drop-shadow-sm z-20'>
      <span className='text-xl py-2 hover:text-carolina-hover active:text-carolina-active'>
        <Link to='/'>
          <FontAwesomeIcon icon='fa-solid fa-utensils'/>
        </Link>
      </span>
      <div className='absolute h-full right-4 flex justify-end items-center'>
        <div className='flex items-center cursor-pointer ml-2 text-xl hover:text-carolina-hover active:text-carolina-active'>
          <FontAwesomeIcon icon={`fa-solid ${authStore.isLoggedIn ? 'fa-right-from-bracket' : 'fa-circle-user'}`}/>
        </div>
      </div>
    </div>
  );
});

const Footer = () => {
  return (
    <div className='h-12 w-full striped mt-4'/>
  );
};

const Root = observer(() => {
  return (
    <div className='text-night flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow'>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  );
});

export default Root;
