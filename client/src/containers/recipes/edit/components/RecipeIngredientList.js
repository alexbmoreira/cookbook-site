import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Input } from '../../../../components';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import { RecipeIngredient } from '../../../../store/recipes';

const IngredientItem = observer(({ recipeIngredientViewModel, onRemove, canEditRecipeIngredient }) => {
  return (
    <div className='flex'>
      <div className='flex-grow grid grid-cols-4 gap-2'>
        <div className='py-2'>{recipeIngredientViewModel.quantity}</div>
        <div className='py-2'>{recipeIngredientViewModel.measurement}</div>
        <div className='py-2 col-span-2'>{recipeIngredientViewModel.name}</div>
      </div>
      <div className='flex justify-end space-x-1 w-10 pr-1'>
        {canEditRecipeIngredient && <React.Fragment>
          <div className='flex items-center justify-center text-black-bean-light cursor-pointer hover:text-black-bean' onClick={() => recipeIngredientViewModel.isEditing = true}>
            <FontAwesomeIcon icon='fa-solid fa-pen-circle'/>
          </div>
          <div className='flex items-center justify-center text-black-bean-light cursor-pointer hover:text-black-bean' onClick={() => onRemove(recipeIngredientViewModel)}>
            <FontAwesomeIcon icon='fa-solid fa-circle-xmark'/>
          </div>
        </React.Fragment>}
      </div>
    </div>
  );
});

const EditingIngredientItem = observer(({ recipeIngredientViewModel, onSave }) => {
  const [recipeIngredient, setRecipeIngredient] = useState({...recipeIngredientViewModel.data});

  const _onSave = () => {
    onSave(new RecipeIngredient(recipeIngredient));
    recipeIngredientViewModel.isEditing = false;
  }

  return (
    <div className='flex'>
      <div className='flex-grow grid grid-cols-4 gap-2'>
        <div className='py-2 flex'>
          <Input.Basic
            placeholder={'Quantity'}
            value={recipeIngredient.quantity}
            onChange={(value) => setRecipeIngredient({...recipeIngredient, quantity: value})}
            className='rounded-tl'
          />
          <div className='bg-blush self-stretch w-px'/>
        </div>
        <div className='py-2 flex'>
          <Input.Basic
            placeholder='Measurement'
            value={recipeIngredient.measurement}
            onChange={(value) => setRecipeIngredient({...recipeIngredient, measurement: value})}
          />
          <div className='bg-blush self-stretch w-px'/>
        </div>
        <div className='py-2 col-span-2 flex'>
          <Input.Basic
            placeholder='Ingredient'
            value={recipeIngredient.name}
            onChange={(value) => setRecipeIngredient({...recipeIngredient, name: value})}
          />
        </div>
      </div>
      <div className='flex space-x-1 w-10 pr-1'>
        <div className='flex items-center justify-center text-black-bean cursor-pointer hover:text-black-bean-hover' onClick={() => recipeIngredientViewModel.isEditing = false}>
          <FontAwesomeIcon icon='fa-solid fa-circle-xmark'/>
        </div>
        <div className='flex items-center justify-center text-black-bean cursor-pointer hover:text-black-bean-hover' onClick={() => _onSave()}>
          <FontAwesomeIcon icon='fa-solid fa-circle-check'/>
        </div>
      </div>
    </div>
  );
});

const IngredientList = observer(({ recipeIngredients, onRemove, onEdit, canEditRecipeIngredient }) => {
  if (_.isEmpty(recipeIngredients)) {
    return (
      <div className='flex w-full border-silver border-t p-2 text-sm justify-center'>
        <FormattedMessage id='recipes.edit.No Ingredients'/>
      </div>
    );
  }

  return (
    <div className='w-full border-silver border-t pl-2'>
      {recipeIngredients.map((item, index) => (
        item.isEditing ?
          <EditingIngredientItem key={index} recipeIngredientViewModel={item} onSave={recipeIngredient => onEdit(recipeIngredient)}/> :
          <IngredientItem key={index} recipeIngredientViewModel={item} onRemove={recipeIngredientViewModel => onRemove(recipeIngredientViewModel)} canEditRecipeIngredient={canEditRecipeIngredient}/>
      ))}
    </div>
  );
});

const RecipeIngredientInput = observer(({ onAdd }) => {
  const [recipeIngredient, setRecipeIngredient] = useState({
    quantity: '',
    measurement: '',
    name: ''
  });

  const addIngredient = () => {
    onAdd(recipeIngredient);
    setRecipeIngredient({
      quantity: '',
      measurement: '',
      name: ''
    });
  }

  return (
    <div className='flex'>
      <div className='flex-grow grid grid-cols-4 gap-2 pl-2'>
        <div className='py-2 flex'>
          <Input.Basic
            placeholder={'Quantity'}
            value={recipeIngredient.quantity}
            onChange={(value) => setRecipeIngredient({...recipeIngredient, quantity: value})}
            className='rounded-tl'
          />
          <div className='bg-silver self-stretch w-px'/>
        </div>
        <div className='py-2 flex'>
          <Input.Basic
            placeholder='Measurement'
            value={recipeIngredient.measurement}
            onChange={(value) => setRecipeIngredient({...recipeIngredient, measurement: value})}
          />
          <div className='bg-silver self-stretch w-px'/>
        </div>
        <div className='py-2 col-span-2 flex'>
          <Input.Basic
            placeholder='Ingredient'
            value={recipeIngredient.name}
            onChange={(value) => setRecipeIngredient({...recipeIngredient, name: value})}
          />
        </div>
      </div>
      <Button className='w-10 rounded-tr select-none' onClick={() => addIngredient()} disabled={!recipeIngredient.name}>
        <span className='m-auto px-3 text-lg'>
          <FontAwesomeIcon icon='fa-solid fa-plus'/>
        </span>
      </Button>
    </div>
  );
});

const RecipeIngredientList = observer(({ recipeIngredients, onAdd, onRemove, onEdit,canEditRecipeIngredient, errorMessage }) => {
  const _onAdd = (recipeIngredient) => {
    onAdd(recipeIngredient);
  };

  return (
    <div>
      <label className='block'>
        <FormattedMessage id='recipes.edit.Ingredients'/>
      </label>
      <div className={`rounded border border-silver ${errorMessage ? 'border-crimson' : ''}`}>
        <RecipeIngredientInput onAdd={recipeIngredient => _onAdd(new RecipeIngredient(recipeIngredient))}/>
        <IngredientList
          recipeIngredients={recipeIngredients}
          onRemove={recipeIngredientViewModel => onRemove(recipeIngredientViewModel)}
          onEdit={recipeIngredient => onEdit(recipeIngredient)}
          canEditRecipeIngredient={canEditRecipeIngredient}
        />
      </div>
      {errorMessage && <div className='text-crimson text-xs space-x-1 mt-1'>
        <FontAwesomeIcon icon='fa-solid fa-circle-exclamation'/>
        <span>{errorMessage}</span>
      </div>}
    </div>
  );
});

export default RecipeIngredientList;
