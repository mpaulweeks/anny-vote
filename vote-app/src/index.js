import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VoteApp from './VoteApp';
import { withCookies, CookiesProvider } from 'react-cookie';

const render = App => {
  const CookieApp = withCookies(App);
  ReactDOM.render(
    <CookiesProvider>
      <CookieApp />
    </CookiesProvider>,
    document.getElementById('root')
  );
}
render(VoteApp);
