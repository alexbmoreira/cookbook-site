import { observer } from 'mobx-react';
import React from 'react';
import { withState } from '../../shared';
import NumberInputState from './state/NumberInputState';


const NumberInput = observer(({uiState}) => {
  const {value} = uiState;

  return (
    <div className='flex select-none'>
      <button className='bg-powder rounded-l hover:bg-silver cursor-pointer' onClick={() => uiState.decrementValue()}>
        <span className='m-auto px-2 text-2xl'>-</span>
      </button>
      <div className='bg-powder px-2 text-center w-10 outline-none flex items-center justify-center'>
      <span>{value}</span>
      </div>
      <button className='bg-powder rounded-r hover:bg-silver cursor-pointer' onClick={() => uiState.incrementValue()}>
        <span className='m-auto px-2 text-2xl'>+</span>
      </button>
    </div>
  );
});

export default withState(NumberInput, NumberInputState);
