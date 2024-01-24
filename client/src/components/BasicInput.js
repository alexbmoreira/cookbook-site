import React from 'react';
import { observer } from 'mobx-react';

const BasicInput = observer(({value, onChange, className, ...rest}) => {
  return (
    <input
      {...rest}
      value={value || ''}
      className={`outline-none w-full placeholder:text-silver ${className || ''}`}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default BasicInput;
