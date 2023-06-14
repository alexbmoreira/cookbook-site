import React from 'react';
import { observer } from 'mobx-react';
import ReactModal from 'react-modal';

const Modal = observer(({isOpen, onClose, children}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={{base: 'absolute top-1/4 inset-x-4 outline-none origin-center shadow-md p-8 bg-white'}}
      overlayClassName={{base: 'fixed inset-0 bg-eerie-black-clear'}}
    >
      {children}
    </ReactModal>
  );
});

export default Modal;
