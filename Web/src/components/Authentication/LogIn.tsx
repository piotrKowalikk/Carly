import * as React from 'react'
import { Form, InputGroup, Button, Container } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import { withRouter, Route, RouteComponentProps } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { submitUserCredentials } from '../../redux/authorization/actions/submitUserCredentials';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IApplicationState } from '../../redux/rootReducer';
import { IAuthorizeState } from '../../redux/authorization/types/authorizationTypes';
import { cleanUpAutorizationAction } from '../../redux/authorization/actions/cleanUpAutorizationAction';

interface ILogInProps extends RouteComponentProps {
    submitUserCredentials: typeof submitUserCredentials;
    cleanUpAction: typeof cleanUpAutorizationAction;
    isLoading: boolean;
}

interface ILogInState {
    email: string;
    emailError: string
    password: string;
    passwordError: string;
    error: string;
    loading: boolean;
}

class LogIn extends React.Component<ILogInProps, ILogInState>{

    submitButton = React.createRef<any>();
    constructor(props) {
        super(props);
        this.state = {
            emailError: '',
            email: '',
            password: '',
            passwordError: '',
            error: null,
            loading: false
        }
    }
    componentWillUnmount() {
        this.props.cleanUpAction();
    }

    ValidateEmail = (mail) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*$/.test(mail)) {
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
                //        passwordError: 'Password too short.',
                password: e.target.value
            });
            return;
        } else {
            this.setState({
                //      passwordError: '',
                password: e.target.value
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();

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
        this.setState({
            loading: true
        })
        var response = await this.props.submitUserCredentials(this.state.email, this.state.password);
        console.log('zapytajmy backend')
        if (response)
            this.props.history.push('/cars');
        else
            this.setState({
                loading: false,
                error: "Bad email or pasasword"
            })
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

        const buttonProgress: React.CSSProperties = {
            //    position: 'absolute',
            top: '50%',
            left: '50%',
            // marginTop: -12,
            // marginLeft: -12,
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
                        {this.state.error &&

                            <Form.Text style={{ color: 'red' }} >{this.state.error}</Form.Text>
                        }
                    </Form.Group>
                    <div>
                        <Button ref={this.submitButton} disabled={this.props.isLoading} className="btn-primary" type="submit">Submit</Button>
                        {this.state.loading &&
                            <div style={{ marginLeft: (-1) * (this.submitButton.current ? this.submitButton.current.offsetWidth / 2 + 6 : 0) }} className="spinner-border spinner-border-sm" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </div>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = ({ authorize }: IApplicationState) => {
}

const mapDispatchToProps = (dispatch) => {
    var props = {
        submitUserCredentials: (login, password) => dispatch(submitUserCredentials(login, password)),
        cleanUpAction: () => dispatch(cleanUpAutorizationAction())

    };
    return (
        props
    );
}
export default connect(
    null,
    mapDispatchToProps
)(withRouter(LogIn));