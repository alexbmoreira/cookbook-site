import React from 'react';
import { withState } from '../../../shared';
import HomeContainerState from '../state/HomeContainerState';
import RecipeLink from './RecipeLink';

const HomeContainer = ({ uiState }) => {
  const { recipes } = uiState;

  return (
    <div className='p-4'>
      {recipes.map((recipe) => (
        <RecipeLink key={recipe.id} recipe={recipe}/>
      ))}
    </div>
  )
};

export default withState(HomeContainer, HomeContainerState);
