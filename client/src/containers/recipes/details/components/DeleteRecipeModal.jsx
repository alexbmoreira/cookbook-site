import React from 'react';
import { observer } from 'mobx-react';
import { Button, Modal } from '../../../../components';
import { FormattedMessage } from 'react-intl';

const DeleteRecipeModal = observer(({isOpen, onClose, uiState}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='font-serif text-2xl mb-4 text-center'>
        <FormattedMessage id='recipes.Delete Recipe?'/>
      </div>
      <FormattedMessage id='recipes.This action cannot be undone.'/>
      <div className='mt-4'>
        <Button onClick={() => uiState.deleteRecipe()} trait='primary'>
          <FormattedMessage id='recipes.Delete'/>
        </Button>
      </div>
    </Modal>
  );
});

export default DeleteRecipeModal;
