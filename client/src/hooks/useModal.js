import {useState} from 'react';

const useModal = (uiState, modalName) => {
  const [modalOpen, setModalOpen] = useState(false);

  uiState[`open${modalName}`] = () => setModalOpen(true);
  uiState[`close${modalName}`] = () => setModalOpen(false);

  return modalOpen;
}

export default useModal;
