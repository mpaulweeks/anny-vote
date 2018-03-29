import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminApp from './AdminApp';
import EventStatsApp from './EventStatsApp';
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
const path = window.location.pathname;
if (path.includes('analytics')){
  render(EventStatsApp);
} else if (path.includes('stats')){
  render(EventStatsApp);
} else if (path.includes('admin')){
  render(AdminApp);
} else {
  render(VoteApp);
}
