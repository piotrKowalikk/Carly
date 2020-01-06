import * as React from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar, Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';




export function NavBar() {
    return (
        <Navbar className="bg-dark justify-content-between">
            <Form inline>
                <Button>  <Link style={{ color: 'white' }} to="/logIn">Home</Link></Button>
            </Form>
            <Form inline>
                <Button>  <Link style={{ color: 'white' }} to="/logIn">Log In</Link></Button>
            </Form>
        </Navbar>
    );
}



