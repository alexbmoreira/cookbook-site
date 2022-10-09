import React from 'react';
import { withState } from '../../../shared';
import HomeContainerState from '../state/HomeContainerState';
import RecipeLink from './RecipeLink';

const HomeContainer = ({ uiState }) => {
  const { recipes } = uiState;

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeLink recipe={recipe}/>
      ))}
    </div>
  )
};

export default withState(HomeContainer, HomeContainerState);
