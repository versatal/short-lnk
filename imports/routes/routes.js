import createHistory from "history/createBrowserHistory";
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

const history = createHistory();

export const onAuthChange = (isAuthenticated) => {
  const unauthenticatedPages = ['/', '/signup'];
  const authenticatedPages = ['/links'];
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace("/links");
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace("/");
  }  
}
export const routes = (  
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/links" component={Link}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>  
)