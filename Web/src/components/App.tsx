import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { rootReducer } from '../redux/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import NavBar from './NavBar';
import LogIn from './Authentication/LogIn';
import EnhancedTableUsers from './Users/UserTableSorted';
import EnhancedTableCars from './Cars/CarsTable';
import CarsDetails from './Cars/CarsDetails';
import { EnhancedTableWrapperReservation } from './Reservations/ReservationsTableSorted';
import MakeUnavailable from './Cars/MakeUnavailable';
import LogOut from './Authentication/LogOut';
import CarsEdit from './Cars/CarsEdit';
import CarsAdd from './Cars/CarsAdd';
//const reactLogo = require("./../assets/img/react_logo.svg");
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

class App extends React.Component<{}, undefined> {

  public render() {
    return (
      <Provider store={store}>
        <NavBar />
        <Route exact path="/">Home here</Route>
        <Route path="/logIn" component={LogIn} />
        <Route path="/users" component={EnhancedTableUsers} />
        <Route path="/cars" component={EnhancedTableCars} />
        <Route path="/car-details" component={CarsDetails} />
        <Route path="/car-edit" component={CarsEdit} />
        <Route path="/car-add" component={CarsAdd} />
        <Route path="/make-unavailable" component={MakeUnavailable} />
        <Route path="/logOut" component={LogOut} />
        <Route path="/reservations" component={EnhancedTableWrapperReservation} />
      </Provider>
    );
  }
}

declare let module: object;


export default hot(module)(App);
