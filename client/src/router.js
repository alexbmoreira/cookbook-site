import { createBrowserRouter, redirect } from 'react-router-dom';
import { Root } from './containers/root';
import { HomeContainer } from './containers/home';
import { RecipesContainer } from './containers/recipes/details';
import { RecipeEditContainer } from './containers/recipes/edit';
import { authStore } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: '/recipes/new',
        loader: () => !authStore.adminIsActive ? redirect('/') : null,
        element: <RecipeEditContainer/>
      },
      {
        path: 'recipes/:slug',
        element: <RecipesContainer/>
      },
      {
        path: '/',
        element: <HomeContainer/>
      }
    ]
  },
]);

export default router;
