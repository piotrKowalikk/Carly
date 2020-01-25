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
    seats: Number;
    car: Car;
}
class CarsEdit extends React.Component<ICarsEditProps, ICarsEditState>{
    constructor(props) {
        super(props);
        this.state = {
            car: new Car(this.props.car),
            seats: 0
        }
    }

    //only seats can change
    SeatsChanged = (e) => {
        this.setState({ seats: e.target.value });
    }
    componentDidMount() {
        console.log("jestem");
    }

    editCar = () => {
        var exampleCarEdit: Car = this.props.car;
        exampleCarEdit.carMake = "Toyota";
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

        return (
            <div
            >
                <Container >
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
                                <Form.Control type="number" onChange={this.SeatsChanged} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLicense">
                                <Form.Label>License</Form.Label>
                                <Form.Control placeholder={car.licenseNumber} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control placeholder="{car.location}" />
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

