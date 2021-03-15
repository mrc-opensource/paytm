import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Home2 from './pages/home2/home2';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import ButtonAppBar  from './components/appBar';
const App = () => (
  <Provider store={store}>
    <ButtonAppBar></ButtonAppBar>
    <div id="main-container">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home2" component={Home2} />
      </Switch>
    </div>
  </Provider>
);

export default App;
