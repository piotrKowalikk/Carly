import * as React from 'react'
import { Form, Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IApplicationState } from '../../redux/rootReducer';
import { IAuthorizeState } from '../../redux/authorization/types/authorizationTypes';
import { logOutAction } from '../../redux/authorization/actions/logOutAction';

interface ILogOutProps extends RouteComponentProps {
    logOutAction: Function;
}

interface ILogOutState {
}

class LogOut extends React.Component<ILogOutProps, ILogOutState>{

    constructor(props) {
        super(props);
        props.logOutAction();
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
                <Form style={style}>
                    <Form.Group style={{ textAlign: "center" }}>
                        <Form.Label >You have successfully logged out.</Form.Label>
                    </Form.Group>
                </Form>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    var props = {
        logOutAction: () => dispatch(logOutAction())
    };
    return (
        props
    );
}
export default connect(
    null,
    mapDispatchToProps
)(LogOut);