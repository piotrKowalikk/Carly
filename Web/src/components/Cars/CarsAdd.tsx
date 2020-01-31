import * as React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { cars } from '../../MockData/CarsMock'
import { Container, Form, Button, Col, ButtonToolbar, Row } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import { AddBox, Edit, Cancel } from '@material-ui/icons'
import { IconButton } from 'material-ui';
import { createCarAction } from '../../redux/cars/actions/createCarAction';
import { number } from 'prop-types';
import { IApplicationState } from '../../redux/rootReducer';

interface ICarsAddProps extends RouteComponentProps {
    createCar: typeof createCarAction;
    isAuthorized: boolean;
}

interface ICarsAddState {
    carMake: string;
    carModel: string;
    licenseNumber: string;
    seats: number;
    year: number;
    location: string;
    price: number;
    yearError: string;
    carMakeError: string;
    carModelError: string;
    licenseNumberError: string;
    locationError: string;
    seatsError: string;
    priceError: string;
}
class CarsAdd extends React.Component<ICarsAddProps, ICarsAddState>{
    constructor(props) {
        super(props);
        this.state = {
            carMake: '',
            carModel: '',
            licenseNumber: '',
            seats: 0,
            year: 0,
            price: 0,
            location: '',
            yearError: '',
            carMakeError: '',
            carModelError: '',
            licenseNumberError: '',
            locationError: '',
            seatsError: '',
            priceError: '',
        }
    }

    SeatsChanged = (e) => {
        if (!e.target.value)
            this.setState({ seatsError: 'Required' })
        else
            this.setState({ seats: e.target.value, seatsError: '' });
    }

    PriceChanged = (e) => {
        if (!e.target.value)
            this.setState({ priceError: 'Required' })
        else if (e.target.value <= 0)
            this.setState({ priceError: 'Cannot be less than zero' })
        else
            this.setState({ price: e.target.value, priceError: '' });
    }

    YearChanged = (e) => {
        if (!this.ValidateYear(e.target.value)) {
            this.setState({
                yearError: 'Year cannot be of the future date or before the cars were made'
            });
            return;
        }
        else
            this.setState({ year: e.target.value, yearError: '' });
    }

    ValidateYear = (year) => {
        const currentyear = new Date().getFullYear();
        if (year > currentyear || year < 1886) {
            return (false)
        }
        return (true)
    }

    CarMakeChanged = (e) => {

        if (!e.target.value)
            this.setState({ carMakeError: 'Required' })
        else
            this.setState({ carMake: e.target.value, carMakeError: '' });
    }

    LicenseChanged = (e) => {

        if (!e.target.value)
            this.setState({ licenseNumberError: 'Required' })
        else
            this.setState({ licenseNumber: e.target.value, licenseNumberError: '' });
    }

    ModelChanged = (e) => {

        if (!e.target.value)
            this.setState({ carModelError: 'Required' })
        else
            this.setState({ carModel: e.target.value, carModelError: '' });
    }

    LocationChanged = (e) => {

        if (!e.target.value)
            this.setState({ locationError: 'Required' })
        else
            this.setState({ location: e.target.value, locationError: '' });

    }

    componentDidMount() {

    }

    createCar = async (e) => {
        e.preventDefault();


        if (this.state.yearError || !this.state.carMake || !this.state.carModel || !this.state.licenseNumber || !this.state.location || !this.state.price || this.state.price < 0)
            return;

        var car: Car = new Car();
        car.carMake = this.state.carMake;
        car.carModel = this.state.carModel;
        car.licenseNumber = this.state.licenseNumber;
        car.location = this.state.location;
        car.seats = this.state.seats;
        car.year = this.state.year;
        car.price = this.state.price;

        //expected
        await this.props.createCar(car);
        //this.props.createCar(car);
        this.props.history.push('/cars');
    }

    render() {
        if (!this.props.isAuthorized) {
            this.props.history.push('/logIn');
        }
        const { carMake,
            carModel,
            licenseNumber,
            seats,
            year,
            location } = this.state;
        const style: React.CSSProperties = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '60em',
            padding: '20px',
            marginTop: '-9em',
            marginLeft: '-30em',
            border: ' 1px solid #ccc',
            'backgroundColor': '#f3f3f3',
        }
        const styleButton: React.CSSProperties = {
            marginLeft: '.5em',
        }

        return (

            <Container >
                <Form style={style}>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCarMake">
                            <Form.Label>Car Make</Form.Label>
                            <Form.Control type="text" onChange={this.CarMakeChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.carMakeError}</Form.Text>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" onChange={this.ModelChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.carModelError}</Form.Text>

                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridSeats">
                            <Form.Label>Number of seats</Form.Label>
                            <Form.Control type="number" onChange={this.SeatsChanged} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLicense">
                            <Form.Label>License</Form.Label>
                            <Form.Control onChange={this.LicenseChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.licenseNumberError}</Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" onChange={this.YearChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.yearError}</Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} controlId="priceYear">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" onChange={this.PriceChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.priceError}</Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" onChange={this.LocationChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.locationError}</Form.Text>

                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onClick={this.createCar}>
                        Save
                    </Button>

                    <Link to="/cars">
                        <Button variant="danger" style={styleButton} type="button" >
                            Cancel
                        </Button>
                    </Link>
                </Form>
            </Container>
        );
    }
}

const mapStateToProps = ({ cars, authorize }: IApplicationState) => ({
    isAuthorized: authorize.isAuthorized,
})
const mapDispatchToProps = (dispatch) => ({
    createCar: (car: Car) => dispatch(createCarAction(car))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CarsAdd))
