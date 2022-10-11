import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = ({children}) => {
  return (<div className='drop-shadow bg-carolina active:drop-shadow-none'>
    {children}
  </div>);
};

const RecipeInfo = ({recipe}) => {
  return (
    <div className='p-2 text-white'>
      <div className='font-serif text-2xl mb-1'>
        {recipe.name}
      </div>
      <div className='flex justify-between'>
        <div>
          <FormattedMessage id={`recipes.categories.${recipe.category}`}/>
        </div>
        <div className='space-x-1 opacity-50 text-sm'>
          <FontAwesomeIcon icon="fa-solid fa-clock"/>
          <span>
            <FormattedMessage id='time.minutes' values={{time: recipe.prepTime + recipe.cookTime}}/>
          </span>
        </div>
      </div>
    </div>
  );
};

const RecipeLink = ({ recipe }) => {;
  return (
    <Card>
      <Link to={`/recipes/${recipe.id}`}>
        <div className='h-48 bg-gray-600'/>
        <RecipeInfo recipe={recipe}/>
      </Link>
    </Card>
  );
};

export default RecipeLink;
