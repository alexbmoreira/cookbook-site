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

const RecipeInfo = ({recipe}) => {
  const {cookTime, prepTime, restTime, servings} = recipe;
  return (
    <div className='space-y-1 text-sm'>
      {prepTime && <InfoLine title='prep' value={prepTime} isTime/>}
      {cookTime && <InfoLine title='cook' value={cookTime} isTime/>}
      {restTime && <InfoLine title='rest' value={restTime} isTime/>}
      {servings && <React.Fragment>
        <div className='border-b'/>
        <InfoLine title='servings' value={servings}/>
      </React.Fragment>}
    </div>
  );
};

export default RecipeInfo;
