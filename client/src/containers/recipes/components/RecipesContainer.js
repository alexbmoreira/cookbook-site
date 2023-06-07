import React from 'react';
import { Container } from '../../../components';
import BlockHeader from './BlockHeader';
import { imageUrl, withState } from '../../../shared';
import RecipesContainerState from '../state/RecipesContainerState';
import RecipeInfo from './RecipeInfo';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { observer } from 'mobx-react';

const RecipesContainer = observer(({uiState}) => {
  const { recipe, relativeServings } = uiState;

  return (
    <div>
      {recipe.image && <div
        className='bg-cover bg-center h-48 overflow-hidden bg-gray-600'
        style={{backgroundImage: `url(${imageUrl(recipe.category, recipe.image)})`}}
      />}
      <Container className='space-y-2 z-50'>
        <BlockHeader title={recipe.name} size='lg' translateTitle={false}/>
        <RecipeInfo uiState={uiState}/>
        <BlockHeader title={'recipes.Ingredients'}/>
        <Ingredients ingredients={recipe.ingredients} relativeServings={relativeServings}/>
        <BlockHeader title={'recipes.Instructions'}/>
        <Instructions steps={recipe.steps}/>
      </Container>
    </div>
  );
});

export default withState(RecipesContainer, RecipesContainerState);
