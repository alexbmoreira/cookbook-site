import { observer } from 'mobx-react';
import React from 'react';
import { withState } from '../../../shared';
import NumberInputState from '../state/RecipesContainerState';


const NumberInput = observer(({uiState}) => {
  const {value} = uiState;

  return (
    <React.Fragment>
      <button class='bg-powder rounded-l hover:bg-silver cursor-pointer'>
        <span class='m-auto px-2 text-2xl'>-</span>
      </button>
      <input className='bg-powder px-2 text-center w-10 outline-none' min={min} step={step} value={value} onChange={(e) => uiState.updateValue(e.target.value)}/>
      <button class='bg-powder rounded-r hover:bg-silver cursor-pointer'>
        <span class='m-auto px-2 text-2xl'>+</span>
      </button>
    </React.Fragment>
  );
});

export default withState(NumberInput, NumberInputState);
