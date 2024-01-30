import React from 'react';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AutosaveStatus = observer(({autosaver}) => {
  if (!autosaver || !autosaver.status) return null;

  return (
    <span className='text-silver'>
      <div className='flex items-center text-sm text-silver'>
        <div className='mr-1'>
          {autosaver.status === 'saving' ? <FontAwesomeIcon icon='fa-solid fa-rotate'/> : <FontAwesomeIcon icon='fa-solid fa-floppy-disk'/>}
        </div>
        <FormattedMessage id={`autosave.status.${autosaver.status}`}/>
      </div>
    </span>
  );
});

export default AutosaveStatus;
