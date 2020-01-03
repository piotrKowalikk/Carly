import * as React from 'react';
import { hot } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { rootReducer, initialState } from '../redux/reducers/searchReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import SearchBar from './SearchBar';
import { Navbar, Nav, Container } from 'react-bootstrap';
import thunk from 'redux-thunk';


//const reactLogo = require("./../assets/img/react_logo.svg");
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

class App extends React.Component<{}, undefined> {
  public render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              <Nav className="mr-auto">
                <Nav.Link href="/">Carly</Nav.Link>
              </Nav>
            </Navbar.Brand>
          </Navbar>
          <Switch>
            <Route exact path="/">
              <Container className='mt-1' style={{ border: 'groove' }} >
                <SearchBar />
              </Container>
            </Route>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

declare let module: object;


export default hot(module)(App);
