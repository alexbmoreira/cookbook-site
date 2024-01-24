import React from 'react';
import { fraction, multiply } from 'mathjs'
import { observer } from 'mobx-react';

const Ingredient = observer(({name, quantity, measurement, relativeServings}) => {
  const fractionalQuantity = quantity ? multiply(fraction(quantity), relativeServings).toFraction(true) : '';

  return (
    <div><span className='font-serif'>{`${fractionalQuantity} ${measurement} ${name}`}</span></div>
  )
});

const Ingredients = observer(({ingredients, relativeServings}) => {
  if (!ingredients) return null;

  return (
    <div className='text-sm'>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} name={ingredient.name} quantity={ingredient.quantity} measurement={ingredient.measurement} relativeServings={relativeServings}/>
      ))}
    </div>
  );
});

export default Ingredients;
