import React from 'react';
import { Container } from '../../../components';
import BlockHeader from './BlockHeader';
import { imageUrl, withState } from '../../../shared';
import RecipesContainerState from '../state/RecipesContainerState';
import RecipeInfo from './RecipeInfo';
import Ingredients from './Ingredients';
import Instructions from './Instructions';

const RecipesContainer = ({uiState}) => {
  const { recipe } = uiState;

  return (
    <div>
      {recipe.image && <div
        className='bg-cover bg-center h-48 overflow-hidden bg-gray-600'
        style={{backgroundImage: `url(${imageUrl(recipe.category, recipe.image)})`}}
      />}
      <Container className='space-y-2 z-50'>
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
