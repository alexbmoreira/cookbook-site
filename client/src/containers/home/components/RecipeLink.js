import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { timeFormatter } from '../../../shared';

const Card = ({children}) => {
  return (
    <div className='drop-shadow bg-powder hover:bg-powder-hover active:bg-powder-active active:drop-shadow-none'>
      {children}
    </div>
  );
};

const RecipeImage = (({ recipe }) => {
  if (!recipe.hasImage) {
    return (
      <div className='flex flex-col h-40 bg-silver justify-center items-center text-white text-6xl'>
        <FontAwesomeIcon icon='fa-solid fa-camera-slash'/>
        <div className='text-base mt-2'>
          <FormattedMessage id='recipes.No image available'/>
        </div>
      </div>
    );
  }

  return (
    <div
      className='relative bg-cover bg-center overflow-hidden p-2 h-40'
      style={{backgroundImage: `url(${recipe.image.path})`}}
    />
  );
});

const RecipeInfo = ({recipe}) => {
  return (
    <div className='flex flex-col h-full'>
      <RecipeImage recipe={recipe}/>
      <div className='flex flex-col flex-grow justify-between p-2 text-night'>
        <div className='font-serif text-2xl mb-1'>{recipe.name}</div>
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
    </div>
  );
};

const RecipeLink = ({ recipe }) => {;
  return (
    <Card>
      <Link to={`/recipes/${recipe.slug}`}>
        <RecipeInfo recipe={recipe}/>
      </Link>
    </Card>
  );
};

export default RecipeLink;
