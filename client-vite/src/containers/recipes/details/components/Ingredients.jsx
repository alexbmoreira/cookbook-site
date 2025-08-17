import React from 'react';
import { observer } from 'mobx-react';

const Ingredient = observer(({ingredient, relativeServings}) => {
  return (
    <div>
      <span className='font-serif'>{ingredient.ingredientString(relativeServings)}</span>
    </div>
  )
});

const Ingredients = observer(({ingredients, relativeServings}) => {
  if (!ingredients) return null;

  return (
    <div className='text-sm'>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} ingredient={ingredient} relativeServings={relativeServings}/>
      ))}
    </div>
  );
});

export default Ingredients;