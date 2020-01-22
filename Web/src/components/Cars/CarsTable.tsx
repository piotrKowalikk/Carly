import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { Link } from 'react-router-dom';
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
import { withRouter } from 'react-router-dom';
import { cars } from '../../MockData/CarsMock'
import { Container, Button } from 'react-bootstrap';
import { Car } from '../../Models/Car';
import { fetchCars } from '../../redux/cars/actions/fetchCars';
import { IApplicationState } from '../../redux/rootReducer';
import { cleanupAction } from '../../redux/cars/actions/cleanUpAction';
import { AddBox, Edit, DriveEta } from '@material-ui/icons'


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

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead >
            <TableRow>
                <TableCell key={'licenseNumber'} >
                    License number
                </TableCell>
                <TableCell key={'carMake'} style={{ width: '180px' }} sortDirection={orderBy === 'carMake' ? order : false}>
                    <TableSortLabel active={orderBy === 'carMake'} direction={order} onClick={createSortHandler('year')}>
                        Car Make
                        </TableSortLabel>
                </TableCell>
                <TableCell key={'carModel'} sortDirection={orderBy === 'carModel' ? order : false}>
                    <TableSortLabel active={orderBy === 'carModel'} direction={order} onClick={createSortHandler('carModel')}>
                        Car Model
                        </TableSortLabel>
                </TableCell>

                <TableCell key={'location'} >
                    Location
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
            <Typography style={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">Cars</Typography>
            <Link to="/car-add">
                <Tooltip title="Add a new car">
                    <IconButton aria-label="new car">
                        <AddBox color='primary' />
                    </IconButton>
                </Tooltip>
            </Link>
        </Toolbar>
    );
};

const useStyles = makeStyles(theme => ({

}));

interface IEnhancedTableCarsProps {
    data: Car[];
    fetchCars: Function;
    cleanupAction: Function;
    error: string;
}

function EnhancedTableCars(props: IEnhancedTableCarsProps) {

    if (props.data.length == 0 && !props.error) {
        props.fetchCars();
    }

    React.useEffect(() => {
        return () => {
            props.cleanupAction();
        }
    }, []);

    const classes = useStyles({});
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('year');
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
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    if (props.error)
        return (
            <Container>
                <label style={{ color: 'red' }}>{props.error}</label>
            </Container>
        );

    return (
        <div>

            <Container className="mt-4">
                {props.data.length != 0 &&
                    <div>
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
                                            .map((row: Car, index) => {
                                                const isItemSelected = isSelected(row.id);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow key={row.id} hover selected={isItemSelected}>
                                                        <TableCell >{row.licenseNumber}</TableCell>
                                                        <TableCell >{row.carMake}</TableCell>
                                                        <TableCell >{row.carModel}</TableCell>
                                                        <TableCell >{row.location}</TableCell>
                                                        <TableCell title='edit this car'>
                                                            <Link to="/car-details">
                                                                <Tooltip title="Car details">
                                                                    <IconButton aria-label="car deatils">
                                                                        <DriveEta color='primary' />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </Link>
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
                    </div>
                }
            </Container>
        </div>
    );
}

const mapStateToProps = ({ cars }: IApplicationState) => {
    return {
        data: cars.cars,
        error: cars.errorMessage
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchCars: () => dispatch(fetchCars()),
    cleanupAction: () => dispatch(cleanupAction())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnhancedTableCars);