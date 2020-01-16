import * as React from 'react'
import { Form, InputGroup, Button, Container } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { useHistory } from "react-router-dom";

interface ILogInProps extends RouteComponentProps {

}

interface ILogInState {
    email: string;
    emailError: string
    password: string;
    passwordError: string;
}

class LogIn extends React.Component<ILogInProps, ILogInState>{

    constructor(props) {
        super(props);
        this.state = {
            emailError: '',
            email: '',
            password: '',
            passwordError: ''
        }
    }

    ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    emailChanged = (e) => {
        if (!this.ValidateEmail(e.target.value)) {
            this.setState({
                emailError: 'Incorrect email address.',
                email: e.target.value
            });
            return;
        } else {
            this.setState({
                emailError: '',
                email: e.target.value
            });
        }
    }

    passwordChanged = (e) => {
        if (e.target.value.length < 3) {
            this.setState({
                passwordError: 'Password too short.',
                password: e.target.value
            });
            return;
        } else {
            this.setState({
                passwordError: '',
                password: e.target.value
            });
        }
    }

    onSubmit = (e) => {
        var anyError: boolean = false;
        if (!this.ValidateEmail(this.state.email)) {
            this.setState({
                emailError: 'Incorrect email address.'
            });
            anyError = true;
        }
        if (this.state.password.length < 3) {
            this.setState({
                passwordError: 'Password too short.'
            });
            anyError = true;
        }
        if (anyError) {
            e.preventDefault();
            return;
        }
        console.log('zapytajmy backend')
        this.props.history.push('/cars');
        e.preventDefault();
    }

    render() {
        const style: React.CSSProperties = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '30em',
            padding: '20px',
            marginTop: '-9em', /*set to a negative number 1/2 of your height*/
            marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
            border: ' 1px solid #ccc',
            'backgroundColor': '#f3f3f3',
        }
        return (
            <Container >
                <Form style={style} onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control placeholder="Enter email" onChange={this.emailChanged} />
                        <Form.Text style={{ color: 'red' }} >{this.state.emailError}</Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.passwordChanged} />
                        <Form.Text style={{ color: 'red' }} >{this.state.passwordError}</Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    // searchTypeChange: sth => dispatch(searchTypeChangeAction(sth)),
    // searchStringChange: sth => dispatch(deviceChangeAction(sth)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LogIn));