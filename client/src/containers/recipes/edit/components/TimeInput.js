import React from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { timeFormatter } from '../../../../shared';

const TimeInput = observer(({value, label, onChange, errorMessage, className, ...rest}) => {
  const _onChange = (value) => {
    const re = /^[0-9\b]+$/;
    
    if (value === '' || re.test(value)) {
      onChange(value)
    }
  }

  return (
    <div className={className || ''}>
      {label && <label className='block'>
        <FormattedMessage id={label}/>
      </label>}
      <div className={`flex w-full border-silver border rounded p-2 ${errorMessage ? 'border border-crimson' : ''}`}>
        <input
          {...rest}
          value={value || ''}
          className='flex-grow outline-none overflow-hidden placeholder:text-silver mr-1'
          onChange={(e) => _onChange(e.target.value)}
        />
        {timeFormatter(value) && <div className='whitespace-nowrap text-silver'>
          <FormattedMessage id='time' values={timeFormatter(value)}/>
        </div>}
      </div>
      {errorMessage && <div className='text-crimson text-xs space-x-1 mt-1'>
        <FontAwesomeIcon icon='fa-solid fa-circle-exclamation'/>
        <span>{errorMessage}</span>
      </div>}
    </div>
  );
});

export default TimeInput;
