import React from 'react';
import { Link } from 'react-router-dom';

const RecipeLink = ({ recipe }) => {;
  return (
    <div className='my-2 hover:underline'>
      <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
    </div>
  )
};

export default RecipeLink;
