import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { rootReducer, initialState } from '../redux/reducers/searchReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap';
import thunk from 'redux-thunk';
import { NavBar } from './NavBar';
import LogIn from './Authentication/LogIn';
import UserTable from './Users/UserTable';
import {EnhancedTableWrapper} from './Users/UserTableSorted';

//const reactLogo = require("./../assets/img/react_logo.svg");
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

class App extends React.Component<{}, undefined> {

  public render() {
    return (
      <Provider store={store}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              Home here
              {/*robimy home?*/}
            </Route>
            <Route path="/logIn">
                <LogIn />
            </Route>
            <Route path="/users">
              {/* <UserTable/> */}
            <EnhancedTableWrapper/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

declare let module: object;


export default hot(module)(App);
