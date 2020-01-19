import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { rootReducer } from '../redux/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap';
import thunk from 'redux-thunk';
import NavBar from './NavBar';
import LogIn from './Authentication/LogIn';
import UserTable from './Users/UserTable';
import { EnhancedTableWrapper } from './Users/UserTableSorted';
import EnhancedTableCars from './Cars/CarsTable';
import CarsDetails from './Cars/CarsDetails';
import { EnhancedTableWrapperReservation } from './Reservations/ReservationsTableSorted';
import MakeUnavailable from './Cars/MakeUnavailable';
import LogOut from './Authentication/LogOut';

//const reactLogo = require("./../assets/img/react_logo.svg");
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

class App extends React.Component<{}, undefined> {

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">Home here</Route>
            <Route path="/logIn" component={LogIn} />
            <Route path="/users" component={EnhancedTableWrapper} />
            <Route path="/cars" component={EnhancedTableCars} />
            <Route path="/car-details" component={CarsDetails} />
            <Route path="/make-unavailable" component={MakeUnavailable} />
            <Route path="/logOut" component={LogOut} />
            <Route path="/reservations" component={EnhancedTableWrapperReservation} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

declare let module: object;


export default hot(module)(App);
