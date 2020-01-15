import * as React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { withRouter , RouteComponentProps,Link} from 'react-router-dom';
import { cars } from '../../MockData/CarsMock'
import { Container, Form, Button, Col,ButtonToolbar,Row } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import { Reservation } from '../../Models/Reservation';
import ReservationsTable from '../Reservations/ReservationsTable';
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
        console.log("jestem");
    }

    render() {
        const { car } = this.state;
        const styleForm: React.CSSProperties = {
            width: '60em',
            padding: '20px',
            marginTop: '1em', /*set to a negative number 1/2 of your height*/
            border: ' 1px solid #ccc',
            backgroundColor: '#f3f3f3',
           
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
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"

             >
               
            <Form style={styleForm} > 
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

                    <Link to="/make-unavailable">
                        <Button  variant="info" style={styleButton} type="button" >
                            Make unavailable
                        </Button>
                    </Link>
            </Form>
            
            
            <EnhancedTableWrapperReservation ></EnhancedTableWrapperReservation>
          
            </Grid>
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

