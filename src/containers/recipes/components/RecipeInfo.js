import { observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { timeFormatter } from '../../../shared';

const InfoLine = ({title, value, isTime}) => {
  return (
    <div className='flex justify-between'>
      <span className='bold text-lapis'><FormattedMessage id={`recipes.cook_info.${title}`}/></span>
      <span className='font-serif'>
        {isTime ?
          <FormattedMessage id='time' values={timeFormatter(value)}/> :
          <span>{value}</span>}
      </span>
    </div>
  )
}

const RecipeInfo = observer(({uiState}) => {
  const {recipe, servings} = uiState;
  const {cookTime, prepTime, restTime} = recipe;

  return (
    <div className='space-y-1 text-sm'>
      {prepTime && <InfoLine title='prep' value={prepTime} isTime/>}
      {cookTime && <InfoLine title='cook' value={cookTime} isTime/>}
      {restTime && <InfoLine title='rest' value={restTime} isTime/>}
      {servings && <React.Fragment>
        <div className='border-b'/>
        <div className='flex justify-between'>
          <span className='bold text-lapis'><FormattedMessage id='recipes.cook_info.servings'/></span>
          <span className='font-serif flex justify-end'>
            <button class='bg-powder rounded-l hover:bg-silver cursor-pointer'>
              <span class='m-auto px-2 text-2xl'>-</span>
            </button>
            <input className='bg-powder px-2 text-center w-10 outline-none' min={recipe.servings} step={recipe.servings} value={servings} onChange={(e) => uiState.updateServings(e.target.value)}/>
            <button class='bg-powder rounded-r hover:bg-silver cursor-pointer'>
              <span class='m-auto px-2 text-2xl'>+</span>
            </button>
          </span>
        </div>
      </React.Fragment>}
    </div>
  );
});

export default RecipeInfo;
