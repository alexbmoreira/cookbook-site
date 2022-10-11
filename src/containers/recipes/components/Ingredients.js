import React from 'react';

const Ingredient = ({name, quantity, measurement}) => {
  return (
    <div><span className='font-serif'>{`${quantity} ${measurement} ${name}`}</span></div>
  )
}

const Ingredients = ({ingredients}) => {
  if (!ingredients) return null;

  return (
    <div className='text-sm'>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} name={ingredient.name} quantity={ingredient.quantity} measurement={ingredient.measurement}/>
      ))}
    </div>
  );
};

export default Ingredients;
