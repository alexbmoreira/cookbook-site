import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './style/tailwind.css';
import './style/fonts.css';
import './style/index.css';
import { IntlProvider } from 'react-intl';
import English from './locales/en.json';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <IntlProvider messages={English} locale="en" defaultLocale="en">
      <RouterProvider router={router}/>
    </IntlProvider>
  </React.StrictMode>
);
