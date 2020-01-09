import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CarsList from './CarsList';
import CarDetails from './CarDetails';

const AppNavigator = createStackNavigator(
  {
    Cars: CarsList,
    CarDetails: CarDetails,
  },
  {
    initialRouteName: 'Cars',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0E4D92',
        height: 65,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: "400"
      },
      headerBackTitleStyle: {
        fontSize: 18,
        fontWeight: "400"
      }
    }
  }
);

const AppNavigation = createAppContainer(AppNavigator);

export default AppNavigation;
