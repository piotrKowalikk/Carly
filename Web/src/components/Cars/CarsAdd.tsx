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

interface ICarsAddProps extends RouteComponentProps {
    createCar: typeof createCarAction
}

interface ICarsAddState {
    carMake: string;
    carModel: string;
    licenseNumber: string;
    seats: number;
    year: number;
    location: string;
    yearError: string;
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
            location: '',
            yearError: '',
        }
    }

    SeatsChanged = (e) => {
        this.setState({ seats: e.target.value });
    }

    YearChanged = (e) => {
        if (!this.ValidateYear(e.target.value)) {
            this.setState({
                yearError: 'Year cannot be of the future date or before the cars were made',
            });
            return;
        }
        else
            this.setState({ year: e.target.value,yearError:'' });
    }

    ValidateYear = (year) => {
        const currentyear = new Date().getFullYear();
        if (year > currentyear || year < 1886) {
            return (false)
        }
        return (true)
    }

    CarMakeChanged = (e) => {
        this.setState({ carMake: e.target.value });
    }

    LicenseChanged = (e) => {
        this.setState({ licenseNumber: e.target.value });
    }

    ModelChanged = (e) => {
        this.setState({ carModel: e.target.value });
    }

    LocationChanged = (e) => {
        this.setState({ location: e.target.value });
    }

    componentDidMount() {
        
    }

    createCar = async (e) => {
       e.preventDefault();

        if(this.state.yearError)
            return;

        var car: Car = new Car();
        car.carMake = this.state.carMake;
        car.carModel = this.state.carModel;
        car.licenseNumber = this.state.licenseNumber;
        car.location = this.state.location;
        car.seats = this.state.seats;
        car.year = this.state.year;
        
        //expected
        await this.props.createCar(car);
        //this.props.createCar(car);
        this.props.history.push('/cars');
    }

    render() {
        const { carMake,
                carModel,
                licenseNumber,
                seats,
                year,
                location} = this.state;
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
                        <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" onChange={this.ModelChanged} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridCarMake">
                            <Form.Label>Car Make</Form.Label>
                            <Form.Control type="text" onChange={this.CarMakeChanged} />
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
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridYear">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="number" onChange={this.YearChanged} />
                            <Form.Text style={{ color: 'red' }} >{this.state.yearError}</Form.Text>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" onChange={this.LocationChanged} />
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

const mapStateToProps = state => ({
    car: state.car
})
const mapDispatchToProps = (dispatch) => ({
    createCar: (car: Car) => dispatch(createCarAction(car))

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CarsAdd))
