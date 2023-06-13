import React from 'react';
import { observer } from 'mobx-react';
import ReactModal from 'react-modal';

const Modal = observer(({isOpen, onClose, children}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={{base: 'absolute top-1/2 left-1/2 right-auto bottom-auto outline-none -translate-x-1/2 -translate-y-1/2 shadow-md p-8'}}
    >
      {children}
    </ReactModal>
  );
});

export default Modal;
