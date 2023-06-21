import React from 'react';
import { observer } from 'mobx-react';
import { imageUrl, withState } from '../../../shared';
import { ToastContainer, Slide } from 'react-toastify';
import { Container } from '../../../components';
import BlockHeader from './BlockHeader';
import RecipesContainerState from '../state/RecipesContainerState';
import RecipeInfo from './RecipeInfo';
import Ingredients from './Ingredients';
import Instructions from './Instructions';
import { Notes } from './notes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RecipesContainer = observer(({uiState}) => {
  const { recipe, relativeServings } = uiState;

  return (
    <div>
      {recipe.image && <div
        className='relative bg-cover bg-center h-48 overflow-hidden bg-gray-600'
        style={{backgroundImage: `url(${imageUrl(recipe.category, recipe.image)})`}}
      >
        <div
          className='flex absolute top-2 right-2 h-8 w-8 rounded-full bg-eerie-black-clear text-white justify-center items-center'
          onClick={() => uiState.shareRecipe()}
        >
          <FontAwesomeIcon icon='fa-solid fa-share-nodes'/>
        </div>
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
