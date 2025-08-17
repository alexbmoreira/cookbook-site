import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { authStore } from '../../../store';
import { ActionLink, Button, Input, Modal } from '../../../components';
import { FormattedMessage } from 'react-intl';
import { postData } from '../../../api/api.service'

const AuthModal = observer(({isOpen, onClose}) => {
  const [formType, setFormType] = useState('login')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [viewPassword, setViewPassword] = useState(false);

  const handleSubmit = async () => {
    setFormErrors({});
    const {model, errors} = await postData(
      `/${formType}`,
      { username, email, password, passwordConfirmation }
    )
    setFormErrors(errors);

    if (model) {
      authStore.login(model);
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
          errorMessage={formErrors.username}
        />
        {formType === 'register' && <Input
          value={email}
          placeholder='Email'
          onChange={(value) => setEmail(value)}
          errorMessage={formErrors.email}
        />}
        <Input
          type={viewPassword ? 'text' : 'password'}
          placeholder='Password'
          value={password}
          onChange={(value) => setPassword(value)}
          actionIconClass={`fa-solid ${viewPassword ? 'fa-eye-slash' : 'fa-eye'}`}
          onAction={() => setViewPassword(!viewPassword)}
          errorMessage={formErrors.password}
        />
        {formType === 'register' && <Input
          type={viewPassword ? 'text' : 'password'}
          value={passwordConfirmation}
          placeholder='Confirm Password'
          onChange={(value) => setPasswordConfirmation(value)}
          errorMessage={formErrors.passwordConfirmation}
        />}
        <div className='mt-6'>
          <Button onClick={handleSubmit} trait='primary'>
            <FormattedMessage id={`auth.${formType === 'login' ? 'Log In' : 'Register'}`}/>
          </Button>
        </div>
        <ActionLink
          className='w-full mt-2'
          onClick={() => formType === 'login' ? setFormType('register') : setFormType('login')}
        >
          <FormattedMessage id={`auth.${formType === 'login' ? 'Register' : 'Log In'}`}/>
        </ActionLink>
      </div>
    </Modal>
  );
});

export default AuthModal;