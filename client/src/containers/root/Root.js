import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthModal } from './auth';

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
  const [loginModalOpen, setLoginModalOpen] = React.useState(true);

  return (
    <div className='text-eerie-black flex flex-col min-h-screen'>
      <Header/>
      <div className='flex-grow'>
        <Outlet/>
      </div>
      <Footer/>
      <AuthModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}/>
    </div>
  );
}

export default Root;
