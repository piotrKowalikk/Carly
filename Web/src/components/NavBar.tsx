import * as React from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';




export function NavBar() {
    return (
        <Navbar className="bg-dark justify-content-between">
            <Form inline>
                <Button>  <Link style={{ color: 'white' }} to="/">Home</Link></Button>
                <Button>  <Link style={{ color: 'white' }} to="/users">Users</Link></Button>
                <Button>  <Link style={{ color: 'white' }} to="/cars">Cars</Link></Button>
                <Button>  <Link style={{ color: 'white' }} to="/reservations">Reservations</Link></Button>
            </Form>
            <Form inline>
                <Button>  <Link style={{ color: 'white' }} to="/logIn">Log In</Link></Button>
            </Form>

        </Navbar>
    );
}



