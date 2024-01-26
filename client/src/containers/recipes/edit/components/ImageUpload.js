import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { LoadingIcon } from '../../../../components';

const DragAndDropField = observer(({ onChange, loading }) => {
  const onDrop = useCallback(acceptedFiles => {
    onChange(acceptedFiles[0]);
  }, [onChange]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.png']
    },
    maxFiles: 1
  });

  return (
    <div {...getRootProps({className: 'flex justify-center items-center h-32 rounded-lg border border-dashed border-2 border-silver text-silver cursor-default'})}>
      {loading ? <LoadingIcon color='silver'/> :<div>
        <input {...getInputProps()} />
        <div className='flex flex-col justify-center items-center text-3xl'>
          <FontAwesomeIcon icon='fa-solid fa-camera'/>
          <div className='text-base'>
            <FormattedMessage id='recipes.edit.Add an image'/>
          </div>
        </div>
      </div>}
    </div>
  );
});

const Image = observer(({ image, onRemove }) => {
  return (
    <div className='border border-silver rounded-lg rounded'>
      <div
        className='rounded-t-lg bg-cover bg-center h-64 lg:h-96 overflow-hidden'
        style={{backgroundImage: `url(${image.path}`}}
      />
      <div className='flex space-x-1 justify-between items-center text-silver border-t border-silver rounded-b p-2'>
        <FontAwesomeIcon icon='fa-solid fa-image'/>
        <div className='overflow-hidden truncate flex-grow'>{image.originalFilename}</div>
        <div className='cursor-pointer hover:text-crimson active:text-crimson-active' onClick={() => onRemove()}>
          <FontAwesomeIcon icon='fa-solid fa-circle-xmark'/>
        </div>
      </div>
    </div>
  );
});

const ImageUpload = observer(({ value, label, onChange, loading, className }) => {
  const onRemove = () => {
    onChange(null);
  };

  return (
    <div className={className || ''}>
      {label && <label className='block text-black-bean'>
        <FormattedMessage id={label}/>
      </label>}
      {_.isEmpty(value) && <DragAndDropField onChange={(file) => onChange(file)} loading={loading}/>}
      {!_.isEmpty(value) && <Image image={value} onRemove={() => onRemove()}/>}
    </div>
  )
});

export default ImageUpload;
