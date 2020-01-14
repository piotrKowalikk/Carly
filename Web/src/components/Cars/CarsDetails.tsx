import * as React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter , RouteComponentProps} from 'react-router-dom';
import { cars } from '../../MockData/CarsMock'
import { Container, Form, Button, Col,ButtonToolbar } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import { Reservation } from '../../Models/Reservation';
import ReservationsTable from '../Reservations/ReservationsTable';
import { EnhancedTableWrapperReservation } from '../Reservations/ReservationsTableSorted';

interface IUsersTableProps extends RouteComponentProps {

}

interface IUsersTableState {
    car: Car;
}
class CarsDetails extends React.Component<IUsersTableProps, IUsersTableState>{
    constructor(props) {
        super(props);
        this.state = {
            car: new Car({}),
        }
    }

    
    componentDidMount() {
        console.log("jestem");
    }

    render() {
        const { car } = this.state;
        const style1: React.CSSProperties = {
            position: 'fixed',
            top: '40%',
            left: '50%',
            width: '60em',
            padding: '20px',
            marginTop: '-9em', /*set to a negative number 1/2 of your height*/
            marginLeft: '-30em', /*set to a negative number 1/2 of your width*/
            border: ' 1px solid #ccc',
            backgroundColor: '#f3f3f3',
        }
        const styleButton: React.CSSProperties = {
            marginLeft: '.5em', /*set to a negative number 1/2 of your width*/
        }
        const styleReservations: React.CSSProperties = {
            position: 'fixed',
            top: '80%',
            left: '50%',
            width: '60em',
            padding: '20px',
            border: ' 1px solid #ccc',
            backgroundColor: '#f3f3f3',
        }
        return (
            <div>
            <Form style={style1}  > 
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Text  placeholder={car.carModel} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCarMake">
                        <Form.Label>Car Make</Form.Label>
                        <Form.Text placeholder={car.carMake}/>
                    </Form.Group>

                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEngine">
                        <Form.Label>Engine</Form.Label>
                        <Form.Control placeholder="{car.engine}" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridSeats">
                        <Form.Label>Number of seats</Form.Label>
                        <Form.Control placeholder="{car.seats}" />
                    </Form.Group>
                </Form.Row>

                
                    <Form.Group controlId="formGridLicense">
                        <Form.Label>License</Form.Label>
                        <Form.Control placeholder={car.licenseNumber} />
                    </Form.Group>

                    <Form.Group controlId="formGridLocation">
                        <Form.Label>Location</Form.Label>
                        <Form.Control placeholder="{car.location}" />
                    </Form.Group>

                    
                    <Button  variant="primary"  type="submit" >
                        Save
                    </Button>
                    
                    <Button  variant="info" style={styleButton} type="button" >
                        Make unavailable
                    </Button>
            </Form>
            
            </div>
        );
    }
}

const mapStateToProps = state => ({
    car: state.car
})
const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CarsDetails))

