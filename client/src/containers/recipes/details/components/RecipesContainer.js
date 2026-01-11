import React from 'react';
import { observer } from 'mobx-react';
import { withState } from '../../../../shared';
import { ToastContainer, Slide } from 'react-toastify';
import { Container } from '../../../../components';
import BlockHeader from './BlockHeader';
import RecipesContainerState from '../state/RecipesContainerState';
import RecipeInfo from './RecipeInfo';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { Notes } from './notes';
import ActionButtons from './ActionButtons';
import DeleteRecipeModal from './DeleteRecipeModal';
import RecipeSchema from './RecipeSchema';

const RecipeImage = observer(({uiState}) => {
  const { recipe } = uiState;

  if (!recipe.image) return null;

  return (
    <div
      className='relative bg-cover bg-center overflow-hidden bg-gray-600 p-2 h-48 md:w-1/2 md:h-full'
      style={{backgroundImage: `url(${recipe.image.path})`}}
    >
      <ActionButtons uiState={uiState}/>
    </div>
  );
});

const RecipeDetails = observer(({uiState}) => {
  const { recipe, relativeServings } = uiState;

  return (
    <div className='flex flex-col space-y-2 z-50 flex-grow md:px-4'>
      {!recipe.image && <ActionButtons uiState={uiState}/>}
      <BlockHeader title={recipe.name} size='lg' translateTitle={false}/>
      <RecipeInfo uiState={uiState}/>
      <BlockHeader title={'recipes.Ingredients'}/>
      <Ingredients ingredients={recipe.recipeIngredients} relativeServings={relativeServings}/>
      <BlockHeader title={'recipes.Instructions'}/>
      <Instructions steps={recipe.steps}/>
      <Notes uiState={uiState}/>
    </div>
  );
});

const RecipesContainer = observer(({uiState}) => {
  const { recipe } = uiState;

  return (
    <React.Fragment>
      <RecipeSchema recipe={recipe}/>
      <div className='md:hidden flex-grow'>
        <RecipeImage uiState={uiState}/>
        <Container>
          <RecipeDetails uiState={uiState}/>
        </Container>
      </div>
      <div className='hidden md:flex flex-grow'>
        <RecipeImage uiState={uiState}/>
        <RecipeDetails uiState={uiState}/>
      </div>
      <DeleteRecipeModal isOpen={uiState.deleteRecipeModalOpen} onClose={() => uiState.closeDeleteRecipeModal()} uiState={uiState}/>
      <ToastContainer
        className='bg-transparent'
        toastStyle={{ backgroundColor: 'transparent', boxShadow: '0 0 #0000' }}
        bodyClassName='rounded bg-lapis text-white shadow-md font-sans'
        position='bottom-center'
        autoClose={2500}
        limit={1}
        hideProgressBar
        transition={Slide}
        closeButton={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </React.Fragment>
  );
});

export default withState(RecipesContainer, RecipesContainerState);
