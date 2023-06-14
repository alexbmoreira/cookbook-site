import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../../../store';
import { Button, Input, Modal } from '../../../components';
import { FormattedMessage } from 'react-intl';

const LoginModal = observer(({isOpen, onClose}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login action using username and password
    // For simplicity, this example assumes login is successful
    authStore.login();
  };

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
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </Modal>
  );
});

export default LoginModal;
