import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { connect } from 'react-redux';
import { usersMock } from '../../MockData/UsersMock'
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import { User } from '../../Models/User';
import { IApplicationState } from '../../redux/rootReducer';
import { fetchUsers } from '../../redux/users/actions/fetchUsers';
import { DeleteOutline, AddBox, Edit } from '@material-ui/icons'
import { cleanUpUsersAction } from '../../redux/users/actions/cleanUpUsersAction';
import { removeUserAction } from '../../redux/users/actions/removeUserAction';


function desc(a, b, orderBy) {
    var yearA: number = a[orderBy];
    var yearB: number = b[orderBy];
    if (yearA == 10 || yearB == 10) {
        var p = 1;
    }
    if (yearB < yearA)
        return -1;
    if (yearB > yearA)
        return 1;
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0)
            return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

//not used anywhere
const headCells = [
    // { id: 'name', numeric: false, disablePadding: true, label: 'First Name' },
    // { id: 'lastName', numeric: true, disablePadding: true, label: 'Last Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' }
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead >
            <TableRow>
                {/* <TableCell key={'name'} style={{ width: '180px' }} sortDirection={orderBy === 'name' ? order : false}>
                    <TableSortLabel active={orderBy === 'name'} direction={order} onClick={createSortHandler('year')}>
                        First name
                        </TableSortLabel>
                </TableCell> */}
                {/* <TableCell key={'lastName'} sortDirection={orderBy === 'lastName' ? order : false}>
                    <TableSortLabel active={orderBy === 'lastName'} direction={order} onClick={createSortHandler('lastName')}>
                        Lastname
                        </TableSortLabel>
                </TableCell> */}
                <TableCell key={'email'} >
                    Email
                </TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = props => {
    const { numSelected } = props;
    return (
        <Toolbar className={clsx({})} style={{ paddingLeft: 16, minHeight: 40 }}>
            <Typography style={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">Users</Typography>
        </Toolbar>
    );
};

const useStyles = makeStyles(theme => ({

}));


interface IEnhancedTableUsersProps {
    data: User[];
    error: string;
    isLoading: boolean;
    fetchData: typeof fetchUsers;
    cleanUpUsersAction: typeof cleanUpUsersAction;
    removeUser: Function;
}

function EnhancedTableUsers(props: IEnhancedTableUsersProps) {
    
    if (!props.error && props.data == null) {
        props.fetchData();  
            return (<Container style={{ textAlign: "center" }}>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>)
    }

    React.useEffect(() => {
        return () => {
            props.cleanUpUsersAction();
        }
    }, []);

    const classes = useStyles({});
    const [order, setOrder] = React.useState('asc');//TODO
    const [orderBy, setOrderBy] = React.useState('year');//TODO
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = name => selected.indexOf(name) !== -1;

    const removeFromSource = (id) => {
        //        var v = props.data.splice(props.data.findIndex(x => id == x.id), 1);
        props.removeUser(id);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);


    if (props.isLoading) {
        return (<Container style={{ textAlign: "center" }}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </Container>)
    }

    if (props.error) {
        return (
            <Alert variant="danger" >
                <Alert.Heading>You got an error!</Alert.Heading>
                <p>
                    Probably connection with server is broken. {props.error}
                </p>
            </Alert>
        );
    }
    return (
        <Container className="mt-4">
            <Paper className="mb-3">
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.data.length}
                        />
                        <TableBody>
                            {stableSort(props.data, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow key={row.title} hover selected={isItemSelected}>
                                            {/* <TableCell >{row.name}</TableCell>
                                                        <TableCell >{row.lastName}</TableCell> */}
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell>
                                                <IconButton aria-label="delete user" onClick={(e) => {
                                                    removeFromSource(row.id)
                                                }}>
                                                    <DeleteOutline color='error' ></DeleteOutline>
                                                </IconButton>
                                                {/* <Button className="btn btn-danger mr-1"
                                                            onClick={(e) => {
                                                                removeFromSource(row.id)
                                                            }}>Delete</Button>
                                                        */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}

const mapStateToProps = ({ users }: IApplicationState) => {
    return {
        isLoading: users.isLoading,
        error: users.errorMessage,
        data: users.users
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchData: () => dispatch(fetchUsers()),
    cleanUpUsersAction: () => dispatch(cleanUpUsersAction()),
    removeUser: (id: string) => removeUserAction(dispatch, id)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnhancedTableUsers);