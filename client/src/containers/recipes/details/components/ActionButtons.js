import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../../../../components';

const ActionItem = observer(({ label, icon, onClick }) => {
  return (
    <div
      className='flex justify-between items-center space-x-4 p-2 cursor-pointer rounded transition ease-in-out duration-200 hover:bg-powder-hover active:bg-powder-active'
      onClick={() => onClick()}
    >
      <div>
        <FormattedMessage id={label}/>
      </div>
      <FontAwesomeIcon icon={`fa-solid ${icon}`}/>
    </div>
  );
});

const ActionButtons = observer(({ uiState }) => {
  const [expanded, setExpanded] = useState(false);

  if (!uiState.canEditRecipe) {
    return (
      <div className='relative flex w-full text-white justify-end items-center text-sm'>
        <IconButton onClick={() => uiState.shareRecipe()}>
          <div className='mr-[2px]'>
            <FontAwesomeIcon icon='fa-solid fa-share-nodes'/>
          </div>
        </IconButton>
      </div>
    );
  }

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const isClickOutside = (event) => {
    return !buttonRef.current.contains(event.target) && !menuRef.current.contains(event.target);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (isClickOutside(event)) {
        setExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]);

  return (
    <div className='relative flex w-full text-white justify-end items-center'>
      <div ref={buttonRef}>
        <IconButton onClick={() => setExpanded(!expanded)}>
          <FontAwesomeIcon icon='fa-solid fa-ellipsis'/>
        </IconButton>
      </div>
      {expanded && <div className='absolute top-8 flex flex-row-reverse text-night' ref={menuRef}>
        <div className='flex-col bg-powder divide-y-1 divide-silver rounded drop-shadow'>
          <ActionItem label='recipes.Share' icon='fa-share-nodes' onClick={() => uiState.shareRecipe()}/>
          {uiState.canEditRecipe && <ActionItem label='recipes.Edit' icon='fa-pen' onClick={() => uiState.goToEditRecipe()}/>}
          {uiState.canEditRecipe && <ActionItem label='recipes.Delete' icon='fa-trash' onClick={() => uiState.openDeleteRecipeModal()}/>}
        </div>
      </div>}
    </div>
  );
});

export default ActionButtons;
