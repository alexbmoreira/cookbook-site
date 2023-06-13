import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../../../store';
import { Modal } from '../../../components';
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
      <FormattedMessage id='auth.Log In'/>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button onClick={handleLogin}>Login</button>
      </div>
    </Modal>
  );
});

export default LoginModal;
