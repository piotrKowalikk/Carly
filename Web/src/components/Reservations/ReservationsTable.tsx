import * as React from 'react'
import { Form, InputGroup, Button, Container, Table } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {reservationsMock} from '../../MockData/ReservationMock'
import { Reservation } from '../../Models/Reservation';

interface IUsersTableProps {

}

interface IUsersTableState {
    reservations: Reservation[];
}

class ReservationsTable extends React.Component<IUsersTableProps, IUsersTableState>{

    constructor(props) {
        super(props);
        this.state = {
            reservations: reservationsMock
        }
    }

    componentDidMount() {

    }

    render() {
      
        return (
        
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Date From</th>
                            <th>Date To</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reservations.map(x => {
                               return ( <tr>
                                    <td></td>
                                    <td>{x.userId}</td>
                                    <td>{x.dateFrom}</td>
                                    <td>{x.dateTo}</td>
                                    <td>{x.type}</td>
                                </tr>);
                            })
                        }

                    </tbody>
                </Table>
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
)(withRouter(ReservationsTable));
