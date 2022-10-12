import React from 'react';
import { FormattedMessage } from 'react-intl';
import { timeFormatter } from '../../../shared';

const Time = ({title, value}) => {
  return (
    <div className='flex justify-between'>
      <span className='bold text-lapis'><FormattedMessage id={`recipes.cook_times.${title}`}/></span>
      <span className='font-serif'><FormattedMessage id='time' values={timeFormatter(value)}/></span>
    </div>
  )
}

const CookTimes = ({cookTime, prepTime, restTime, totalTime}) => {
  return (
    <div className='space-y-1 text-sm'>
      {prepTime && <Time title='prep' value={prepTime}/>}
      {cookTime && <Time title='cook' value={cookTime}/>}
      {restTime && <Time title='cook' value={restTime}/>}
      <Time title='total' value={totalTime}/>
    </div>
  );
};

export default CookTimes;
