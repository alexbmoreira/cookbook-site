import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../../../store';
import { Button, Input, Modal } from '../../../components';
import { FormattedMessage } from 'react-intl';
import { postData } from '../../../api/api.service'

const AuthModal = observer(({isOpen, onClose}) => {
  const [formType, setFormType] = useState('login')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async () => {
    const {errors} = await postData(
      `/${formType}`,
      { username, email, password, passwordConfirmation }
    )

    if (errors) {
      setFormErrors(errors);
    } else {
      authStore.login();
      onClose();
      _clearFields();
    }
  };

  const _clearFields = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='font-serif text-2xl mb-4 text-center'>
        <FormattedMessage id={`auth.${formType === 'login' ? 'Log In' : 'Register'}`}/>
      </div>
      <div>
        <Input
          value={username}
          placeholder='Username'
          onChange={(value) => setUsername(value)}
        />
        {formType === 'register' && <Input
          value={email}
          placeholder='Email'
          onChange={(value) => setEmail(value)}
        />}
        <Input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(value) => setPassword(value)}
        />
        {formType === 'register' && <Input
          type='password'
          value={passwordConfirmation}
          placeholder='Confirm Password'
          onChange={(value) => setPasswordConfirmation(value)}
        />}
        <div className='mt-6'>
          <Button onClick={handleSubmit} trait='primary'>
            <FormattedMessage id={`auth.${formType === 'login' ? 'Log In' : 'Register'}`}/>
          </Button>
        </div>
        <div
          className={'text-carolina text-center w-full mt-2 cursor-pointer'}
          onClick={() => formType === 'login' ? setFormType('register') : setFormType('login')}
        >
          <FormattedMessage id={`auth.${formType === 'login' ? 'Register' : 'Log In'}`}/>
        </div>
      </div>
    </Modal>
  );
});

export default AuthModal;
