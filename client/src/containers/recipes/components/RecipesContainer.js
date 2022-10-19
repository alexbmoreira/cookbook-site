import React from 'react';
import { Container } from '../../../components';
import BlockHeader from './BlockHeader';
import { withState } from '../../../shared';
import RecipesContainerState from '../state/RecipesContainerState';
import RecipeInfo from './RecipeInfo';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const RecipesContainer = ({uiState}) => {
  const { recipe } = uiState;

  return (
    <div>
      {recipe.image && <div className='h-48 bg-gray-600'/>}
      <Container className='space-y-2'>
        <BlockHeader title={recipe.name} size='lg' translateTitle={false}/>
        <RecipeInfo recipe={recipe}/>
        <BlockHeader title={'recipes.Ingredients'}/>
        <Ingredients ingredients={recipe.ingredients}/>
        <BlockHeader title={'recipes.Instructions'}/>
        <Instructions steps={recipe.steps}/>
      </Container>
    </div>
  );
};

export default withState(RecipesContainer, RecipesContainerState);
