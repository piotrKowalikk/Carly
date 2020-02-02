import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import NavBar from './NavBar';
import LogIn from './Authentication/LogIn';
import EnhancedTableUsers from './Users/UserTableSorted';
import EnhancedTableCars from './Cars/CarsTable';
import CarsDetails from './Cars/CarsDetails';
import AllReservations from './Reservations/AllReservations';
import MakeUnavailable from './Cars/MakeUnavailable';
import LogOut from './Authentication/LogOut';
import CarsEdit from './Cars/CarsEdit';
import CarsAdd from './Cars/CarsAdd';
import { store } from '../redux/store';
import Home from './Home';
import AppRouter from './AppRouter';

class App extends React.Component<{}, undefined> {

  public render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

declare let module: object;


export default hot(module)(App);
