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
import { EnhancedTableWrapperReservation } from '../Reservations/ReservationsTableSorted';

interface ICarTableProps extends RouteComponentProps {

}

interface ICarTableState {
    car: Car;
}
class CarsDetails extends React.Component<ICarTableProps, ICarTableState>{
    constructor(props) {
        super(props);
        this.state = {
            car: new Car({}),
        }
    }


    componentDidMount() {
    }

    render() {
        const { car } = this.state;
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
        return (
            <Container>

                <Form style={styleForm} >
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Text placeholder={car.carModel} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCarMake">
                            <Form.Label>Car Make</Form.Label>
                            <Form.Text placeholder={car.carMake} />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSeats">
                            <Form.Label>Number of seats</Form.Label>
                            <Form.Text defaultValue={car.seats} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Text defaultValue={car.year} />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLicense">
                            <Form.Label>License</Form.Label>
                            <Form.Text placeholder={car.licenseNumber} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Text placeholder={car.location} />
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
                </Form>



                <EnhancedTableWrapperReservation ></EnhancedTableWrapperReservation>


            </Container>
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

