import React from 'react';
import { observer } from 'mobx-react';
import { AutosaveStatus, Button, Container, Input, NumberInput, Select, TextArea } from '../../../../components';
import { FormattedMessage } from 'react-intl';
import RecipeEditContainerState from '../state/RecipeEditContainerState.js';
import { withState } from '../../../../shared';
import { CATEGORIES } from '../../../../store/recipes';
import RecipeIngredientList from './RecipeIngredientList.jsx';
import TimeInput from './TimeInput.jsx';
import ImageUpload from './ImageUpload.jsx';
import _ from 'lodash';

const RecipeEditContainer = observer(({ uiState }) => {
  const { recipe, recipeIngredientViewModels, loadingImage, errors } = uiState;

  return (
    <Container>
      <div className='flex w-full justify-end h-3 mb-2'>
        <AutosaveStatus autosaver={recipe.autosaver}/>
      </div>
      <div className='font-serif text-3xl mb-4 text-center'>
        {recipe.name || <FormattedMessage id='recipes.edit.New Recipe'/>}
      </div>
      <div className='space-y-3'>
        <Input
          label='recipes.edit.Name'
          value={recipe.name}
          onChange={(value) => uiState.updateValue('name', value)}
          errorMessage={errors.name}
        />
        <ImageUpload
          value={recipe.image}
          label='recipes.edit.Image'
          onChange={(value) => uiState.saveImage(value)}
          loading={loadingImage}
        />
        <Select
          options={CATEGORIES}
          value={recipe.category}
          label='recipes.edit.Category'
          onChange={(option) => uiState.updateValue('category', option.value)}
          isSearchable={false}
          errorMessage={errors.category}
        />
        <div className='grid grid-cols-2 gap-2'>
          <TimeInput
            label='recipes.edit.Prep Time'
            value={recipe.prepTime}
            onChange={(value) => uiState.updateValue('prepTime', value)}
            errorMessage={errors.prepTime}
          />
          <TimeInput
            label='recipes.edit.Cook Time'
            value={recipe.cookTime}
            onChange={(value) => uiState.updateValue('cookTime', value)}
            errorMessage={errors.cookTime}
          />
          <TimeInput
            label='recipes.edit.Rest Time'
            value={recipe.restTime}
            onChange={(value) => uiState.updateValue('restTime', value)}
            errorMessage={errors.restTime}
          />
          <NumberInput
            label='recipes.edit.Servings'
            value={recipe.servings}
            step={1}
            min={1}
            onChange={(value) => uiState.updateValue('servings', value)}
          />
        </div>
        <RecipeIngredientList
          recipeIngredients={recipeIngredientViewModels}
          onAdd={recipeIngredient => uiState.updateValue('recipeIngredients', _.concat(recipe.recipeIngredients, [recipeIngredient]))}
          onEdit={recipeIngredient => uiState.updateValue('recipeIngredients', _.map(recipe.recipeIngredients, i => i.id === recipeIngredient.id ? recipeIngredient : i))}
          canEditRecipeIngredient={uiState.canEditRecipeIngredient}
          onRemove={recipeIngredientViewModel => uiState.removeRecipeIngredient(recipeIngredientViewModel.data)}
          errorMessage={errors.recipeIngredients}
        />
        <TextArea
          label='recipes.edit.Steps'
          value={recipe.steps}
          onChange={(value) => uiState.updateValue('steps', value)}
          errorMessage={errors.steps}
        />
      </div>
      <div className='mt-6'>
        <Button trait='primary' onClick={() => uiState.saveRecipe()}>
          <FormattedMessage id={recipe.isNew ? 'recipes.edit.Create Recipe' : 'recipes.edit.Save Recipe'}/>
        </Button>
      </div>
    </Container>
  );
});

export default withState(RecipeEditContainer, RecipeEditContainerState);