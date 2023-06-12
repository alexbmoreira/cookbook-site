import React from 'react';
import { observer } from 'mobx-react';
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, LoadingIcon } from '../../../components';
import { withState } from '../../../shared';
import HomeContainerState from '../state/HomeContainerState';
import RecipeLink from './RecipeLink';
import CATEGORIES from '../state/categories';

const SearchBar = observer(({ uiState }) => {
  return (
    <div className='relative mb-2'>
      <input
        type='text'
        placeholder='Search...'
        value={uiState.search}
        className='w-full border-silver border rounded p-2 pl-8 focus:outline-0'
        onChange={(e) => uiState.updateSearch(e.target.value)}
      />
      <span className='absolute text-silver left-2 bottom-2'>
        <FontAwesomeIcon icon="fa-solid fa-search" />
      </span>
    </div>
  );
});

const CatgoriesDropdown = observer(({ uiState }) => {
  return (
    <Select
      options={CATEGORIES}
      defaultValue={CATEGORIES[0]}
      value={uiState.category}
      onChange={(option) => uiState.updateCategory(option)}
      isSearchable={false}
      className='mb-4'
    />
  );
});

const RecipesList = observer(({ fetchingRecipes, recipes }) => {
  if (fetchingRecipes) {
    return <LoadingIcon/>;
  }
  
  return (
    <div className='space-y-4'>
      {recipes.map((recipe) => (
        <RecipeLink key={recipe.slug} recipe={recipe}/>
      ))}
    </div>
  );
});

const HomeContainer = observer(({ uiState }) => {
  const { fetchingRecipes, searchedRecipes } = uiState;

  return (
    <Container>
      <SearchBar uiState={uiState}/>
      <CatgoriesDropdown uiState={uiState}/>
      <RecipesList fetchingRecipes={fetchingRecipes} recipes={searchedRecipes}/>
    </Container>
  );
});

export default withState(HomeContainer, HomeContainerState, {noLoadingIcon: true});
