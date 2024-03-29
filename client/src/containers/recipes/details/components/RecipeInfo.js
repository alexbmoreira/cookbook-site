import { observer } from 'mobx-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { timeFormatter } from '../../../../shared';
import { NumberInput } from '../../../../components';

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
      {prepTime > 0 && <InfoLine title='prep' value={prepTime} isTime/>}
      {cookTime > 0 && <InfoLine title='cook' value={cookTime} isTime/>}
      {restTime > 0 && <InfoLine title='rest' value={restTime} isTime/>}
      {servings && <React.Fragment>
        <div className='border-b'/>
        <div className='flex justify-between'>
          <span className='bold text-lapis'><FormattedMessage id='recipes.cook_info.servings'/></span>
          <span className='font-serif justify-end'>
            <NumberInput size='sm' value={servings} step={recipe.servings} min={recipe.servings} onChange={(value) => uiState.updateServings(value)}/>
          </span>
        </div>
      </React.Fragment>}
    </div>
  );
});

export default RecipeInfo;
