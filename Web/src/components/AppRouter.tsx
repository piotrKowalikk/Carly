import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, HashRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, connect } from 'react-redux'
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
import Home from './Home';
import { IApplicationState } from '../redux/rootReducer';
import { IAuthorizeState } from '../redux/authorization/types/authorizationTypes';

class AppRouter extends React.Component<{}, undefined> {

    public render() {
        return (
            <div>
                <NavBar />
                <Route exact path="/" component={Home} />
                <Route path="/logIn" component={LogIn} />
                <Route path="/users" component={EnhancedTableUsers} />
                <Route path="/cars" component={EnhancedTableCars} />
                <Route path="/car-details" component={CarsDetails} />
                <Route path="/car-edit" component={CarsEdit} />
                <Route path="/car-add" component={CarsAdd} />
                <Route path="/make-unavailable" component={MakeUnavailable} />
                <Route path="/logOut" component={LogOut} />
                <Route path="/reservations" component={AllReservations} />
            </div>
        );
    }
}

const mapStateToProps = ({ users, authorize }: IApplicationState) => {
    return {
        isLoading: users.isLoading,
        error: users.errorMessage,
        data: users.users,
        isAuthorized: authorize.isAuthorized
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadToken: () => {
        sessionStorage.setItem('jwtToken','');

    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppRouter);
