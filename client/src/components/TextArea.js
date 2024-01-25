import React from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextArea = observer(({value, label, onChange, errorMessage, className}) => {
  const _onChange = (content, delta, source, editor) => {
    onChange(editor.getHTML());
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      ['clean']
    ]
  }

  const formats = [
    'bold', 'italic', 'underline',
    'link'
  ]

  return (
    <div className={className || ''}>
      {label && <label className='block text-black-bean'>
        <FormattedMessage id={label}/>
      </label>}
      <ReactQuill
        value={value || ''}
        theme='snow'
        onChange={_onChange}
        modules={modules}
        formats={formats}
      />
      {errorMessage && <div className='text-crimson text-xs space-x-1 mt-1'>
        <FontAwesomeIcon icon='fa-solid fa-circle-exclamation'/>
        <span>{errorMessage}</span>
      </div>}
    </div>
  );
});

export default TextArea;
