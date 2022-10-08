import { createBrowserRouter } from 'react-router-dom';
import Root from './containers/root/Root';
import HomeContainer from './containers/home/HomeContainer';
import RecipesContainer from './containers/recipes/RecipesContainer';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        path: 'recipes/:id',
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
