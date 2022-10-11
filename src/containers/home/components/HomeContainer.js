import React from 'react';
import { Container } from '../../../components';
import { withState } from '../../../shared';
import HomeContainerState from '../state/HomeContainerState';
import RecipeLink from './RecipeLink';

const HomeContainer = ({ uiState }) => {
  const { recipes } = uiState;

  return (
    <Container className='space-y-4'>
      {recipes.map((recipe) => (
        <RecipeLink key={recipe.id} recipe={recipe}/>
      ))}
    </Container>
  )
};

export default withState(HomeContainer, HomeContainerState);
