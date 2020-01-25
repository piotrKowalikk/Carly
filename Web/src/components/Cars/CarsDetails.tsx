import * as React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { cars } from '../../MockData/CarsMock'
import { Container, Form, Button, Col, ButtonToolbar, Row } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import { Reservation } from '../../Models/Reservation';
import { EnhancedTableReservation } from '../Reservations/ReservationsTableSorted';
import { removeCarAction } from '../../redux/cars/actions/removeCarAction';
import { IApplicationState } from '../../redux/rootReducer';
import { getAllCarReservations } from '../../redux/.resources/apiURLs';

interface ICarTableProps extends RouteComponentProps {
    removeCar: typeof removeCarAction;
    car: Car;
}

interface ICarTableState {
    car: Car;
}
class CarsDetails extends React.Component<ICarTableProps, ICarTableState>{
    constructor(props) {
        super(props);
        this.state = {
            car: this.props.car//new Car({}),
        }
    }


    componentDidMount() {
    }

    removeCar = (e) => {
        console
        //this.props.removeCar();
    }

    render() {
        const car = this.props.car;
        const styleForm: React.CSSProperties = {
            width: 'auto',
            padding: '20px',
            marginTop: '1em', /*set to a negative number 1/2 of your height*/
            border: ' 1px solid #ccc',

        }
        const styleButton: React.CSSProperties = {
            marginLeft: '.5em', /*set to a negative number 1/2 of your width*/
        }
        const styleReservations: React.CSSProperties = {
            width: '60em',
            padding: '20px',
            marginTop: '1em', /*set to a negative number 1/2 of your height*/
            border: ' 1px solid #ccc',
        }
        if (!car)
            return (<div></div>);
        return (
            <Container>
                <Form style={styleForm} >
                    <h3>Car details</h3>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLicense">
                            <Form.Label>License</Form.Label>
                            <Form.Control disabled value={car.licenseNumber} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control disabled value={car.location} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control disabled value={car.carModel} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCarMake">
                            <Form.Label>Car Make</Form.Label>
                            <Form.Control disabled value={car.carMake} />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSeats">
                            <Form.Label>Number of seats</Form.Label>
                            <Form.Control disabled value={car.seats.toString()} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control disabled value={car.year.toString()} />
                        </Form.Group>
                    </Form.Row>

                    <Link to="/car-edit">
                        <Button variant="primary" type="button" >
                            Edit
                        </Button>
                    </Link>

                    <Link to="/make-unavailable">
                        <Button variant="info" style={styleButton} type="button" >
                            Make unavailable
                        </Button>
                    </Link>
                    <Button variant="info" style={styleButton} type="button" onClick={this.removeCar}>
                        Remove
                    </Button>
                </Form>
                {/* <EnhancedTableReservation title={"Car reservations"} dense={true} /> */}
            </Container>
        );
    }
}

const mapStateToProps = ({ cars }: IApplicationState) => {
    return {
        car: cars.selectedCar,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getCatReservations: (car: Car) => dispatch((car.id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CarsDetails))

