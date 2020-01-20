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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IReservationTableProps extends RouteComponentProps {

}

interface IReservationTableState {
    car: Car;
    dateFrom: Date;
    dateTo: Date;
    comment: string;
}
class MakeUnavailable extends React.Component<IReservationTableProps, IReservationTableState>{
    constructor(props) {
        super(props);
        this.state = {
            car: new Car({}),
            dateFrom: new Date(),
            dateTo: new Date(),
            comment: '',
        }
    }

    onCancel = (e) => {
        this.props.history.push('/car-details');
        e.preventDefault();
    }

    handleChange = date => {
        this.setState({
          dateFrom: date
        });
    };
    handleChangeTo = date => {
        this.setState({
          dateTo: date
        });
    };
    componentDidMount() {
        
    }

    render() {
        const { car,dateFrom,dateTo,comment} = this.state;
       
        const styleForm: React.CSSProperties = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '30em',
            padding: '20px',
            marginTop: '-9em', /*set to a negative number 1/2 of your height*/
            marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
            border: ' 1px solid #ccc',
            backgroundColor: '#f3f3f3',
        }
        const styleButton: React.CSSProperties = {
            marginLeft: '.5em', 
        }
      
        return (
       
            <Form style={styleForm} title="aaaa"> 
                <Form.Group controlId="formGridTitle">
                    <Form.Label>{car.carMake}</Form.Label>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDateFrom">
                        <Form.Label>Date from  </Form.Label>
                        
                    </Form.Group>
                    <Form.Group as={Col}>
                    <DatePicker 
                            selected={dateFrom}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                </Form.Row>
                
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDateTo">
                        <Form.Label>Date To</Form.Label>

                    </Form.Group>
                    <Form.Group as={Col}>
                    <DatePicker style={styleButton}
                                selected={dateTo}
                                onChange={this.handleChangeTo}
                                />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control placeholder={comment} />
                </Form.Group>

                    
                    <Button  variant="primary"  type="submit" >
                        Save
                    </Button>

                    
                    <Button  variant="danger" style={styleButton} type="button" onClick={this.onCancel}>
                        Cancel
                    </Button>
               
            </Form>
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
)(withRouter(MakeUnavailable))

