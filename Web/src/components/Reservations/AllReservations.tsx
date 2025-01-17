import * as React from 'react';
import { fetchAllReservations } from "../../redux/reservations/actions/fetchAllReservations";
import { Reservation } from '../../Models/Reservation';
import { IApplicationState } from '../../redux/rootReducer';
import { connect } from 'react-redux';
import { EnhancedTableReservation } from './ReservationsTableSorted';
import { Container, Form, Spinner, Alert } from 'react-bootstrap';
import { cleanUpReservationsAction } from '../../redux/reservations/actions/cleanUpReservationsAction';
import { RouteComponentProps } from 'react-router-dom';

interface IReservationsDispatchProps {
    fetchReservations: typeof fetchAllReservations;
    cleanup: Function;

}

interface IReservationsStateProps {
    isAuthorized: boolean;
    isLoading: boolean;
    data: Reservation[];
    error: string;
}

interface IReservationsOwnProps {
}

type IReservationsProps = IReservationsDispatchProps & IReservationsStateProps & IReservationsOwnProps & RouteComponentProps;

class AllReservations extends React.Component<IReservationsProps, any>{

    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        this.props.cleanup();
    }
    async componentDidMount() {
        if (this.props.isAuthorized && this.props.data.length == 0 && !this.props.error) {
            await this.props.fetchReservations();
        }
    }

    style: React.CSSProperties = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '30em',
        padding: '20px',
        marginTop: '-9em', /*set to a negative number 1/2 of your height*/
        marginLeft: '-15em', /*set to a negative number 1/2 of your width*/
        border: ' 1px solid #ccc',
        'backgroundColor': '#f3f3f3',
    };

    render() {
        if (!this.props.isAuthorized) {
            this.props.history.push('/logIn');
        }

        if (this.props.error) {
            return (
                <Alert variant="danger" >
                    <Alert.Heading>You got an error!</Alert.Heading>
                    <p>
                        Probably connection with server is broken. {this.props.error}
                    </p>
                </Alert>
            );
        }

        if (this.props.isLoading) {
            return (<Container style={{ textAlign: "center" }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>)
        }

        return (<EnhancedTableReservation
            dense={false}
            title={"Reservations"}
            data={this.props.data}
            showCarData={true}
        />);
    }
}


const mapStateToProps = ({ reservations, authorize }: IApplicationState, props: IReservationsOwnProps): IReservationsStateProps => {
    var rsl: IReservationsStateProps = {
        isLoading: reservations.isLoading,
        error: reservations.errorMessage,
        data: reservations.reservations,
        isAuthorized: authorize.isAuthorized
    };
    return rsl;
}

const mapDispatchToProps = (dispatch, props): IReservationsDispatchProps => {
    var rsl: IReservationsDispatchProps = {
        cleanup: () => dispatch(cleanUpReservationsAction()),
        fetchReservations: () => dispatch(fetchAllReservations())
    };
    return rsl;
}

export default connect<IReservationsStateProps, IReservationsDispatchProps, IReservationsOwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(AllReservations);