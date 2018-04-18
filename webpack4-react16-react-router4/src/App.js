import React from 'react';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import { Route, Redirect } from 'react-router';
import { HashRouter, Link, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import './app.css';

const Loading = () => <Spin size="large" />;
const delay = (loader) => new Promise((resolve, reject) => setTimeout(resolve, 2000, loader));

const Home = Loadable({ loader: () => delay(import('./Home')), loading: Loading });
const Post = Loadable({ loader: () => delay(import('./Post')), loading: Loading });
const NotFound = Loadable({ loader: () => delay(import('./NotFound')), loading: Loading });

const App = () => (
	<HashRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">Post</Link></li>
        <li><Link to="/1ef0d6942e">NotFound</Link></li>
      </ul>

      <hr/>
      <Switch>
	      <Route exact path="/" component={Home} />
	      <Route path="/post" component={Post} /> 
	      <Route path="/404" component={NotFound} /> 
	      <Route render={() => <Redirect to="/404" />} /> 
      </Switch>
    </div>
  </HashRouter>
);

export default hot(module)(App)