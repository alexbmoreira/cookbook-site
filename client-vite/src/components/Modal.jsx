import React from 'react';
import { observer } from 'mobx-react';
import ReactModal from 'react-modal';

const Modal = observer(({isOpen, onClose, children}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='absolute top-1/3 inset-x-4 outline-none origin-center shadow-md p-8 bg-white z-20'
      overlayClassName='fixed inset-0 bg-night-clear z-20'
    >
      {children}
    </ReactModal>
  );
});

export default Modal;