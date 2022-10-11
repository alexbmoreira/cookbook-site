import React from 'react';
import { FormattedMessage } from 'react-intl';

const Time = ({title, value}) => {
  return (
    <div className='flex justify-between'>
      <span className='bold text-lapis'><FormattedMessage id={`recipes.cook_times.${title}`}/></span>
      <span className='font-serif'><FormattedMessage id='time.minutes' values={{time: value}}/></span>
    </div>
  )
}

const CookTimes = ({cookTime, prepTime}) => {
  return (
    <div className='space-y-1 text-sm'>
      {prepTime && <Time title='prep' value={prepTime}/>}
      {cookTime && <Time title='cook' value={cookTime}/>}
      <Time title='total' value={cookTime + prepTime}/>
    </div>
  );
};

export default CookTimes;
