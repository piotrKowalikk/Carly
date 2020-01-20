import * as React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { cars } from '../../MockData/CarsMock'
import { Container, Form, Button, Col, ButtonToolbar, Row } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import {AddBox, Edit, Cancel} from '@material-ui/icons'
import { IconButton } from 'material-ui';

interface ICarsAddProps extends RouteComponentProps {
}

interface ICarsAddState {
    car: Car;
    seats: Number;
    year: Number;
}
class CarsAdd extends React.Component<ICarsAddProps, ICarsAddState>{
    constructor(props) {
        super(props);
        this.state = {
            car: new Car({}),
            seats: 0,
            year: 0,
        }
    }

   SeatsChanged = (e) => {
    this.setState({seats: e.target.value});
   }

   YearChanged = (e) => {
    this.setState({year: e.target.value});
   }

    componentDidMount() {
        console.log("jestem");
    }
  
    render() {
        const { car } = this.state;
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
                    <Form  style={style}>
                   
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridModel">
                                <Form.Label>Model</Form.Label>
                                <Form.Control placeholder={car.carModel} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCarMake">
                                <Form.Label>Car Make</Form.Label>
                                <Form.Control placeholder={car.carMake} />
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

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridYear">
                                <Form.Label>Year</Form.Label>
                                <Form.Control type="number" onChange={this.YearChanged}/>
                            </Form.Group>
                        
                            <Form.Group as={Col} controlId="formGridLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control placeholder={car.location} />
                            </Form.Group>
                        </Form.Row>
                        
                        <Button variant="primary" type="submit" >
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

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CarsAdd))