import React from 'react';
import { observer } from 'mobx-react';
import TextareaAutosize from 'react-textarea-autosize';

const TextArea = observer(({value, onChange, errorMessage, ...rest}) => {
  return (
    <TextareaAutosize
      {...rest}
      value={value}
      className='outline-none resize-none w-full placeholder:text-silver'
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

export default TextArea;
