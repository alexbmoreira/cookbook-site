import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../../../store';
import { Button, Input, Modal } from '../../../components';
import { FormattedMessage } from 'react-intl';
import { postData } from '../../../api/api.service'

const AuthModal = observer(({isOpen, onClose}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    postData(
      '/login',
      { username, password }
    )

    authStore.login();
  };

  console.log(authStore.isLoggedIn);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='font-serif text-2xl mb-4 text-center'>
        <FormattedMessage id='auth.Log In'/>
      </div>
      <div>
        <Input
          value={username}
          placeholder='Username'
          onChange={(value) => setUsername(value)}
        />
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(value) => setPassword(value)}
        />
        <div className='mt-6'>
          <Button onClick={handleLogin} trait='primary'>Login</Button>
        </div>
      </div>
    </Modal>
  );
});

export default AuthModal;
