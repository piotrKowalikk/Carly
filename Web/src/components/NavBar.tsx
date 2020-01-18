import * as React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { IApplicationState } from '../redux/rootReducer';
import { IAuthorizeState } from '../redux/authorization/types/authorizationTypes';
import { connect } from 'react-redux';


export interface INavBarProps  {
    isAuthorized: boolean;
}


const NavBar = (props: INavBarProps) => {
     return (
        <Navbar className="bg-dark justify-content-between">
            <Form inline>
                <Button>  <Link style={{ color: 'white' }} to="/">Home</Link></Button>
                {/* {props.isAuthorized && */}
                    <div>
                        <Button>  <Link style={{ color: 'white' }} to="/users">Users</Link></Button>
                        <Button>  <Link style={{ color: 'white' }} to="/cars">Cars</Link></Button>
                        <Button>  <Link style={{ color: 'white' }} to="/reservations">Reservations</Link></Button>
                    </div>
                
            </Form>
            <Form inline>
                {/* {props.isAuthorized && */}
                    <Button>  <Link style={{ color: 'white' }} to="/logOut">Log Out</Link></Button>
                
                {/* {!props.isAuthorized && */}
                    <Button>  <Link style={{ color: 'white' }} to="/logIn">Log In</Link></Button>
                
            </Form>
        </Navbar>
    );
}

const mapStateToProps = ({ authorize }: IApplicationState) => {
    var authorize: IAuthorizeState = authorize;
    return {
        isAuthorized: authorize.isAuthorized
    }
}

export default connect(
    mapStateToProps
)(NavBar);

