import * as React from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { IApplicationState } from '../redux/rootReducer';
import { IAuthorizeState } from '../redux/authorization/types/authorizationTypes';

interface IHomeComponentProps extends RouteComponentProps {
    isAuthorized: boolean;
}

interface IHomeComponentState {
}

class Home extends React.Component<IHomeComponentProps, any>{

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isAuthorized) {
            this.props.history.push('/cars');
        }
        else {
            this.props.history.push('/logIn');
        }

        return (
            <div>
                HOME LAYOUT
            </div>
        );
    }
}
const mapStateToProps = ({ authorize }: IApplicationState) => {
    var authorize: IAuthorizeState = authorize;
    return {
        isAuthorized: authorize.isAuthorized
    }
}
export default connect(
    mapStateToProps,
    null)
    (withRouter(Home))
