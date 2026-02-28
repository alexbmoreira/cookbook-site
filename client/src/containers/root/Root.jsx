import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthModal } from './auth';
import { authStore } from '../../store';
import { deleteData } from '../../api/api.service'
import { observer } from 'mobx-react';
import { ActionLink } from '../../components';
import { FormattedMessage } from 'react-intl';

const CreateRecipeButton = observer(() => {
  if (!authStore.adminIsActive) return null;

  return (
    <div className='absolute h-full left-4 flex items-center'>
      <ActionLink onClick={() => {}}>
        <Link to='/recipes/new'>
          <div className='flex items-center text-sm hover:text-carolina-hover active:text-carolina-active'>
            <div className='mr-1 text-lg'>
              <FontAwesomeIcon icon='fa-solid fa-pen-to-square'/>
            </div>
            <FormattedMessage id='header.Create'/>
          </div>
        </Link>
      </ActionLink>
    </div>
  );
});

const Header = observer(({onClick}) => {
  return (
    <div className='flex h-full font-bold text-carolina justify-center items-center w-full bg-white sticky top-0 drop-shadow-sm z-20'>
      <CreateRecipeButton/>
      <span className='text-xl py-2 hover:text-carolina-hover active:text-carolina-active'>
        <Link to='/'>
          <FontAwesomeIcon icon='fa-solid fa-utensils'/>
        </Link>
      </span>
      <div className='absolute h-full right-4 flex justify-end items-center'>
        <div className='flex items-center cursor-pointer ml-2 text-xl hover:text-carolina-hover active:text-carolina-active' onClick={() => onClick()}>
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLogout = async () => {
    deleteData('/logout')
    authStore.logout();
  };

  const _handleUserClicked = () => {
    authStore.isLoggedIn ? handleLogout() : setLoginModalOpen(true);
  }

  return (
    <div className='text-night flex flex-col min-h-screen'>
      <Header onClick={() => _handleUserClicked()}/>
      <div className='flex flex-grow'>
        <Outlet/>
      </div>
      <Footer/>
      <AuthModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}/>
    </div>
  );
});

export default Root;
