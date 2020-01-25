import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';

import AppNavigation from './AppNavigation';
import Login from './Login';

const store = createStore(rootReducer)

const MainNavigator = createStackNavigator(
  {
    Login: Login,
    AppNavigation: AppNavigation
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

const Navigation = createAppContainer(MainNavigator);

const App = () => (
  <Provider store={store}>
    <Navigation></Navigation>
  </Provider>
)

export default App;
