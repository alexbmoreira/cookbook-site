import React from 'react';
import { Container } from '../../../components';
import BlockHeader from './BlockHeader';
import { withState } from '../../../shared';
import RecipesContainerState from '../state/RecipesContainerState';
import CookTimes from './CookTimes';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const RecipesContainer = ({uiState}) => {
  const { recipe } = uiState;
  return (
    <div>
      <div className='h-48 bg-gray-600'/>
      <Container className='space-y-2'>
        <BlockHeader title={recipe.name} size='lg' translateTitle={false}/>
        <CookTimes prepTime={recipe.prepTime} cookTime={recipe.prepTime}/>
        <BlockHeader title={'recipes.Ingredients'}/>
        <Ingredients ingredients={recipe.ingredients}/>
        <BlockHeader title={'recipes.Instructions'}/>
        <Instructions steps={recipe.steps}/>
      </Container>
    </div>
  );
};

export default withState(RecipesContainer, RecipesContainerState);
