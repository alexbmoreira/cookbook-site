import React from 'react';
import { observer } from 'mobx-react';
import { Container, Input, LoadingIcon, Select } from '../../../components';
import { withState } from '../../../shared';
import HomeContainerState from '../state/HomeContainerState';
import RecipeLink from './RecipeLink';
import { CATEGORIES } from '../../../store/recipes';

const SearchBar = observer(({ uiState }) => {
  return (
    <div className='relative mb-2'>
      <Input
        placeholder='Search...'
        value={uiState.search}
        onChange={(value) => uiState.updateSearch(value)}
        iconClass='fa-solid fa-search'
      />
    </div>
  );
});

const CatgoriesDropdown = observer(({ uiState }) => {
  return (
    <Select
      options={CATEGORIES}
      value={uiState.category}
      isClearable
      placeholder='Select category'
      onChange={(option) => uiState.updateCategory(option ? option.value : '')}
      isSearchable={false}
      className='mb-4'
    />
  );
});

const RecipesList = observer(({ fetchingRecipes, recipes }) => {
  if (fetchingRecipes) return <LoadingIcon/>;
  
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {recipes.map((recipe) => (
        <RecipeLink key={recipe.slug} recipe={recipe}/>
      ))}
    </div>
  );
});

const HomeContainer = observer(({ uiState }) => {
  const { fetchingRecipes, recipes } = uiState;

  return (
    <Container className='flex-grow'>
      <SearchBar uiState={uiState}/>
      <CatgoriesDropdown uiState={uiState}/>
      <RecipesList fetchingRecipes={fetchingRecipes} recipes={recipes}/>
    </Container>
  );
});

export default withState(HomeContainer, HomeContainerState, {noLoadingIcon: true});
