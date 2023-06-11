import { createBrowserRouter } from 'react-router-dom';
import { Root } from './containers/root';
import { HomeContainer } from './containers/home';
import { RecipesContainer } from './containers/recipes';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
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
