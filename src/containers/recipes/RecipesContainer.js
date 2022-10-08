import React from 'react';
import { useParams } from 'react-router-dom';

const RecipesContainer = () => {
  const { id } = useParams();

  return (
    <div>
      {`Recipe ${id}`}
    </div>
  );
};

export default RecipesContainer;
