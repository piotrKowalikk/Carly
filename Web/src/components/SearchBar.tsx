import * as React from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deviceChangeAction } from '../redux/users/actions/fetchUsers';

interface IExampleComponentProps {
    searchTypeChange: Function;
    errorMessage: string;
    searchStringChange: Function;
}

interface IExampleComponentState {
}

class ExampleComponent extends React.Component<IExampleComponentProps, IExampleComponentState>{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form.Group className='mb-0' >

            </Form.Group>
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
)(withRouter(ExampleComponent));