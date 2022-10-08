import React from 'react';

const RecipesContainer = ({match}) => {
  return (
    <div>
      {`Recipe ${match.params.id}`}
    </div>
  );
};

export default RecipesContainer;
