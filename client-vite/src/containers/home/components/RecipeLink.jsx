import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeFormatter } from '../../../shared/time.js';

const Card = ({children}) => {
  return (
    <div className='drop-shadow bg-powder hover:bg-powder-hover active:bg-powder-active active:drop-shadow-none'>
      {children}
    </div>
  );
};

const RecipeInfo = ({recipe}) => {
  return (
    <div className='p-2 text-night'>
      <div className='font-serif text-2xl mb-1'>
        {recipe.name}
      </div>
      <div className='flex justify-between'>
        <div className='text-carolina'>
          <FormattedMessage id={`recipes.categories.${recipe.category}`}/>
        </div>
        <div className='space-x-1 opacity-50 text-sm'>
          <FontAwesomeIcon icon='fa-solid fa-clock'/>
          <span>
            <FormattedMessage id='time' values={timeFormatter(recipe.timeEstimate)}/>
          </span>
        </div>
      </div>
    </div>
  );
};

const RecipeLink = ({ recipe }) => {
  return (
    <Card>
      <Link to={`/recipes/${recipe.slug}`}>
        <RecipeInfo recipe={recipe}/>
      </Link>
    </Card>
  );
};

export default RecipeLink;
