import React, { useState } from 'react';
import { observer } from 'mobx-react';
import ReactSelect from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

const Select = observer(({options, value, defaultValue, label, onChange, clearValue, isSearchable, errorMessage, className, placeholder, ...rest}) => {
  const [selectableValue, setSelectableValue] = useState(
    _.find(options, { value }) ?
      { value, label: _.find(options, { value }).label } :
      ''
  );

  const _onChange = (option) => {
    onChange(option);
    setSelectableValue(option);
  }

  return (
    <div className={className || ''}>
      {label && <label className='block text-black-bean'>
        <FormattedMessage id={label}/>
      </label>}
      <ReactSelect
        options={options}
        defaultValue={defaultValue}
        value={selectableValue}
        clearValue={clearValue}
        onChange={(option) => _onChange(option)}
        isSearchable={isSearchable}
        placeholder={placeholder || ''}
        {...rest}
      />
      {errorMessage && <div className='text-crimson text-xs space-x-1 mt-1'>
        <FontAwesomeIcon icon='fa-solid fa-circle-exclamation'/>
        <span>{errorMessage}</span>
      </div>}
    </div>
  );
});

export default Select;
