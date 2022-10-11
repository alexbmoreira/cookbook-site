import React from 'react';

const Ingredient = ({name, quantity, measurement}) => {
  return (
    <div>
      <span className='bold text-lapis'>{`${quantity} ${measurement} `}</span>
      <span className='font-serif'>{name}</span>
    </div>
  )
}

const Ingredients = ({ingredients}) => {
  if (!ingredients) return null;

  return ingredients.map((ingredient, index) => (
    <div className='space-y-1 text-sm'>
      <Ingredient key={index} name={ingredient.name} quantity={ingredient.quantity} measurement={ingredient.measurement}/>
    </div>
  ));
};

export default Ingredients;
