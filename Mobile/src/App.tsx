import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import AppNavigation from './AppNavigation';
import Login from './Login';

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

const App = createAppContainer(MainNavigator);

export default App;
