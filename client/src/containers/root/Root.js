import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthModal } from './auth';
import { authStore } from '../../store';
import { deleteData } from '../../api/api.service'
import { observer } from 'mobx-react';


const Header = observer(({onClick}) => {
  return (
    <div className='flex relative py-2 justify-center w-full bg-white sticky top-0 drop-shadow-sm'>
      <span className='text-xl text-carolina'>
        <Link to='/'>
          <FontAwesomeIcon icon='fa-solid fa-utensils'/>
        </Link>
      </span>
      <div
        className='absolute right-2 text-xl text-carolina hover:cursor-pointer'
        onClick={() => onClick()}
      >
        {authStore.isLoggedIn ?
          <FontAwesomeIcon icon='fa-solid fa-right-from-bracket'/> :
          <FontAwesomeIcon icon='fa-solid fa-circle-user'/>
        }
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
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const handleLogout = async () => {
    deleteData('/logout')
    authStore.logout();
  };

  const _handleUserClicked = () => {
    authStore.isLoggedIn ? handleLogout() : setLoginModalOpen(true);
  }

  return (
    <div className='text-eerie-black flex flex-col min-h-screen'>
      <Header onClick={() => _handleUserClicked()}/>
      <div className='flex-grow'>
        <Outlet/>
      </div>
      <Footer/>
      <AuthModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}/>
    </div>
  );
});

export default Root;
