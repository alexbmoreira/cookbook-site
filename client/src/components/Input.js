import React from 'react';
import { observer } from 'mobx-react';

const Input = observer(({value, onChange, icon, ...rest}) => {
  return (
    <div className='relative mb-2'>
      <input
        {...rest}
        value={value}
        className={`w-full border-silver border rounded p-2 focus:outline-0 ${icon ? 'pl-8' : ''}`}
        onChange={(e) => onChange(e.target.value)}
      />
      {icon}
    </div>
  );
});

export default Input;
