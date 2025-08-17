import React, { useState } from 'react';
import { observer } from 'mobx-react';
import ReactSelect from 'react-select';
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

  const optionClassName = (state) => {
    if(state.isSelected) return 'bg-lapis text-white';
    if(state.isFocused) return 'bg-carolina text-white';
    return 'hover:bg-silver';
  }

  return (
    <div className={className || ''}>
      {label && <label className='block'>
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
        classNames={{
          dropdownIndicator: () => 'text-silver p-0 pl-2',
          indicatorSeparator: () => 'bg-silver m-0',
          menu: () => 'bg-powder',
          noOptionsMessage: () => 'text-night',
          option: (state) => optionClassName(state),
          singleValue: () => 'text-night',
          placeholder: () => 'text-silver',
          valueContainer: () => 'p-0',
          clearIndicator: () => 'text-silver hover:text-silver-hover',
          control: () => `w-full outline-none border border-silver text-base text-night shadow-none rounded p-2 ${errorMessage ? 'border-crimson' : ''}`
        }}
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
