import * as React from 'react'
import { Form, InputGroup, Button, Container, Table } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {usersMock} from '../../MockData/UsersMock'
import { User } from '../../Models/User';
interface IUsersTableProps {

}

interface IUsersTableState {
    users: User[];
}

class UsersTable extends React.Component<IUsersTableProps, IUsersTableState>{

    constructor(props) {
        super(props);
        this.state = {
            users: usersMock
        }
    }

    componentDidMount() {

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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(x => {
                               return ( <tr>
                                    <td></td>
                                    <td>{x.name}</td>
                                    <td>{x.lastName}</td>
                                    <td>{x.email}</td>
                                </tr>);
                            })
                        }

                    </tbody>
                </Table>
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
)(withRouter(UsersTable));