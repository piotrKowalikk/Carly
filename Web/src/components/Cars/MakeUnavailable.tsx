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
import { createReservationAction } from '../../redux/reservations/actions/createReservationAction';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IApplicationState } from '../../redux/rootReducer';
import { selectCarAction } from '../../redux/cars/actions/selectCarAction';

interface IReservationTableProps extends RouteComponentProps {
    createReservation: typeof createReservationAction;
    selectCar: typeof selectCarAction;
    car: Car;
}

interface IReservationTableState {
    dateFrom: Date;
    dateTo: Date;
    comment: string;
    dateFromError: string;
    dateToError: string;
}
class MakeUnavailable extends React.Component<IReservationTableProps, IReservationTableState>{
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: new Date(),
            dateTo: new Date(),
            comment: '',
            dateFromError: '',
            dateToError: '',
        }
    }

    onCancel = (e) => {
        this.props.history.push('/car-details');
        e.preventDefault();
    }

    handleSubmit = async (e) => {

        if (this.state.dateTo < this.state.dateFrom)
            return;
        e.preventDefault();
        var reservation: Reservation = new Reservation({});
        reservation.carData = this.props.car.id;
        reservation.comment = this.state.comment;
        reservation.dateFrom = this.state.dateFrom;
        reservation.dateTo = this.state.dateTo;
        await this.props.createReservation(reservation);
        await this.props.selectCar(this.props.car);
        this.props.history.push('/car-details');

    }

    DateFromChanged = date => {
        if (date > this.state.dateTo)
            this.setState({ dateFromError: 'Cannot be after date to' })
        else
            this.setState({ dateFrom: date, dateFromError: '' });
        console.log('date.target.value')
    };

    DateToChanged = date => {
        if (date < this.state.dateFrom)
            this.setState({ dateToError: 'Cannot be before date from' })
        else
            this.setState({ dateTo: date, dateToError: '' });
    };

    componentDidMount() {

    }

    render() {
        const { dateFrom, dateTo, comment } = this.state;
        const car = this.props.car;
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

            <Form style={styleForm}>
                <Form.Group controlId="formGridTitle">
                    <Form.Label><h5>Choose dates for {car.carMake} to be unavailable</h5></Form.Label>
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridDateFrom">
                        <Form.Label>Date from  </Form.Label>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <DatePicker
                            minDate={new Date()}
                            selected={this.state.dateFrom}
                            onChange={this.DateFromChanged}
                        />
                        <Form.Text style={{ color: 'red' }} >{this.state.dateFromError}</Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Row>

                    <Form.Group as={Col} controlId="formGridDateTo">
                        <Form.Label>Date To</Form.Label>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <DatePicker style={styleButton}
                            selected={this.state.dateTo}
                            onChange={this.DateToChanged}
                        />
                        <Form.Text style={{ color: 'red' }} >{this.state.dateToError}</Form.Text>
                    </Form.Group>

                </Form.Row>

                <Form.Group controlId="formGridComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control placeholder={comment} onChange={(e) => this.setState({ comment: e.target.value })} />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Save
                    </Button>

                <Button variant="danger" style={styleButton} type="button" onClick={this.onCancel}>
                    Cancel
                    </Button>

            </Form>
        );
    }
}

const mapStateToProps = ({ cars }: IApplicationState) => ({
    car: cars.selectedCar
})
const mapDispatchToProps = (dispatch) => ({
    createReservation: (reservation) => dispatch(createReservationAction(reservation)),
    selectCar: (car) => dispatch(selectCarAction(car))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MakeUnavailable))