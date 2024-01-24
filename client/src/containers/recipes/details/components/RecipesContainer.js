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

const RecipesContainer = observer(({uiState}) => {
  const { recipe, relativeServings } = uiState;

  return (
    <div>
      {recipe.image && <div
        className='relative bg-cover bg-center h-48 overflow-hidden bg-gray-600 p-2'
        style={{backgroundImage: `url(${recipe.image.path})`}}
      >
        <ActionButtons uiState={uiState}/>
      </div>}
      <Container className='space-y-2 z-50'>
        <BlockHeader title={recipe.name} size='lg' translateTitle={false}/>
        <RecipeInfo uiState={uiState}/>
        <BlockHeader title={'recipes.Ingredients'}/>
        <Ingredients ingredients={recipe.ingredients} relativeServings={relativeServings}/>
        <BlockHeader title={'recipes.Instructions'}/>
        <Instructions steps={recipe.steps}/>
        <Notes uiState={uiState}/>
      </Container>
      <DeleteRecipeModal isOpen={uiState.deleteRecipeModalOpen} onClose={() => uiState.closeDeleteRecipeModal()} uiState={uiState}/>
      <ToastContainer
        className='bg-transparent'
        toastStyle={{ backgroundColor: 'transparent', boxShadow: '0 0 #0000' }}
        bodyClassName='rounded bg-carolina text-white shadow-md font-sans'
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
    </div>
  );
});

export default withState(RecipesContainer, RecipesContainerState);
