import { observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';

const NumberInputLarge = observer(({value, label, onIncrement, onDecrement, decrementDisabled, errorMessage, className}) => {
  return (
    <div className={`select-none ${className || ''}`}>
      {label && <label className='block'>
        <FormattedMessage id={label}/>
      </label>}
      <div className={`flex w-full border border-silver outline-none rounded ${errorMessage ? 'border border-crimson' : ''}`}>
        <Button className='rounded-l w-10' onClick={() => onDecrement()} disabled={decrementDisabled}>
          <span className='m-auto px-2 py-1 text-lg'>
            <FontAwesomeIcon icon='fa-solid fa-minus'/>
          </span>
        </Button>
        <div className='p-2 flex-grow text-center outline-none flex items-center justify-center'>
          <span>{value}</span>
        </div>
        <Button className='rounded-r w-10' onClick={() => onIncrement()}>
          <span className='m-auto px-2 py-1 text-lg'>
            <FontAwesomeIcon icon='fa-solid fa-plus'/>
          </span>
        </Button>
      </div>
    </div>
  );
});

const NumberInputSmall = observer(({value, onIncrement, onDecrement, decrementDisabled, className}) => {
  return (
    <div className={`flex rounded bg-powder select-none ${className || ''}`}>
      <Button trait='powder' className='rounded-l' onClick={() => onDecrement()} disabled={decrementDisabled}>
        <span className='m-auto px-2 py-1'>
          <FontAwesomeIcon icon='fa-solid fa-minus'/>
        </span>
      </Button>
      <div className='px-2 py-1 text-sm text-center w-10 outline-none flex items-center justify-center'>
        <span>{value}</span>
      </div>
      <Button trait='powder' className='rounded-r' onClick={() => onIncrement()}>
        <span className='m-auto px-2 py-1'>
          <FontAwesomeIcon icon='fa-solid fa-plus'/>
        </span>
      </Button>
    </div>
  );
});

const NumberInput = observer(({value, label, step, min, onChange, size, errorMessage, className}) => {
  const incrementValue = () => {
    value += step;
    onChange(value);
  }

  const decrementValue = () => {
    if (value - step >= min) value -= step;
    onChange(value);
  }

  switch (size) {
    case 'sm':
      return <NumberInputSmall value={value} decrementDisabled={value - step < min} onIncrement={() => incrementValue()} onDecrement={() => decrementValue()} className={className}/>
    case 'lg':
      return <NumberInputLarge value={value} decrementDisabled={value - step < min} label={label} onIncrement={() => incrementValue()} onDecrement={() => decrementValue()} erroMessage={errorMessage} className={className}/>
    default:
      throw `${size} is not a valid size for NumberInput`;
  }
});

NumberInput.propTypes = {
  size: PropTypes.oneOf([
    'sm',
    'lg'
  ])
};

NumberInput.defaultProps = {
  size: 'lg'
};
export default NumberInput;
