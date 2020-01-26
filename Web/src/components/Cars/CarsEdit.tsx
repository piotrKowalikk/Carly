import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { Container, Form, Button, Col, ButtonToolbar, Row } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import { IApplicationState } from '../../redux/rootReducer';
import { editCarAction } from '../../redux/cars/actions/editCarAction';

interface ICarsEditProps extends RouteComponentProps {
    car: Car;
    carEdit: typeof editCarAction;
}

interface ICarsEditState {
    car: Car;
    licenseNumber: string;
    seats: number;
    location: string;
}
class CarsEdit extends React.Component<ICarsEditProps, ICarsEditState>{
    constructor(props) {
        super(props);
        this.state = {
            car: new Car(this.props.car),
            seats: this.props.car.seats,
            location: this.props.car.location,
            licenseNumber: this.props.car.licenseNumber,
        }
    }

    //only seats, license and location can change
    SeatsChanged = (e) => {
        this.setState({ seats: e.target.value });
    }

    LocationChanged = (e) => {
        this.setState({ location: e.target.value });
    }

    LicenseChanged = (e) => {
        this.setState({ licenseNumber: e.target.value });
    }

    componentDidMount() {
        console.log(this.state);
    }

    editCar = (e) => {
        e.preventDefault();
        var exampleCarEdit: Car = this.props.car;
        exampleCarEdit.location = this.state.location;
        exampleCarEdit.seats = this.state.seats;
        exampleCarEdit.licenseNumber = this.state.licenseNumber;
        console.log(exampleCarEdit);
        //this.props.carEdit(this.state.car);
        this.props.carEdit(exampleCarEdit);
        
        this.props.history.push('/cars');

    }

    render() {
        const car = this.state.car;
        const styleForm: React.CSSProperties = {
            position: 'fixed',
            top: '50%',
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
        const styleText: React.CSSProperties = {
            fontSize: '14px', /*set to a negative number 1/2 of your width*/
        }
        return (
            <div
            >
                <Container >
                    <Form style={styleForm} >
                        <Form.Row>
                            <Form.Group controlId="formGridModel">
                                <Form.Label><h4>{car.carMake}  {car.carModel}</h4></Form.Label>
                             </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridSeats">
                                <Form.Label>Number of seats</Form.Label>
                                <Form.Control type="number" defaultValue={car.seats} onChange={this.SeatsChanged}  />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLicense">
                                <Form.Label>License</Form.Label>
                                <Form.Control defaultValue={car.licenseNumber} onChange={this.LicenseChanged} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control defaultValue={car.location} onChange={this.LocationChanged} />
                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={this.editCar} >
                            Save
                        </Button>

                        <Link to="/car-details">
                            <Button variant="danger" style={styleButton} type="button" >
                                Cancel
                        </Button>
                        </Link>
                    </Form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = ({ cars }: IApplicationState) => {
    return {
        car: cars.selectedCar
    };
}
const mapDispatchToProps = (dispatch) => ({
    carEdit: (car: Car) => dispatch(editCarAction(car))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CarsEdit))

