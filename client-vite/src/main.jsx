import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/index.css';
import '@styles/tailwind.css';
import '@styles/fonts.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { all } from '@awesome.me/kit-e4fe9d3e5d/icons';
import { flattenMessages } from './shared';
import en from './locales/en.json';
import { Root } from './containers/root';
import { HomeContainer } from './containers/home';
import { RecipesContainer, RecipeEditContainer } from './containers/recipes';

library.add(...all);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <IntlProvider messages={flattenMessages(en)} locale="en" defaultLocale="en">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root/>}>
              <Route path="/recipes/new" element={<RecipeEditContainer />} />
              <Route path="/recipes/:slug" element={<RecipesContainer />} />
              <Route path="/recipes/:slug/edit" element={<RecipeEditContainer />} />
              <Route index element={<HomeContainer/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </React.StrictMode>
  );
}
