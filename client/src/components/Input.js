import React from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = observer(({value, onChange, iconClass, errorMessage, ...rest}) => {
  return (
    <div className='relative mb-2'>
      {iconClass && <span className='absolute text-silver left-2 bottom-2'>
        <FontAwesomeIcon icon={iconClass} />
      </span>}
      <input
        {...rest}
        value={value}
        className={`w-full border-silver placeholder:text-silver border rounded p-2 focus:outline-0 ${iconClass ? 'pl-8' : ''} ${errorMessage ? 'border-crimson' : ''}`}
        onChange={(e) => onChange(e.target.value)}
      />
      {errorMessage && <div className='text-crimson text-xs space-x-1 mt-1'>
        <FontAwesomeIcon icon='fa-solid fa-circle-exclamation' />
        <span>{errorMessage}</span>
      </div>}
    </div>
  );
});

export default Input;
