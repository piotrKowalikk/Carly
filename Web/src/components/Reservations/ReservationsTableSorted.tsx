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
import { Container, Button } from 'react-bootstrap';
import { User } from '../../Models/User';
import {reservationsMock} from '../../MockData/ReservationMock'
import { Reservation } from '../../Models/Reservation';



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

const headCells = [
    { id: 'user', numeric: false, disablePadding: true, label: 'User' },
    { id: 'datefrom', numeric: false, disablePadding: true, label: 'Date From' },
    { id: 'dateto', numeric: false, disablePadding: false, label: 'Date To' }
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead >
            <TableRow>
                <TableCell key={'user'} style={{ width: '180px' }} sortDirection={orderBy === 'user' ? order : false}>
                    <TableSortLabel active={orderBy === 'user'} direction={order} onClick={createSortHandler('year')}>
                        User
                        </TableSortLabel>
                </TableCell>
                <TableCell key={'datefrom'} sortDirection={orderBy === 'datefrom' ? order : false}>
                    <TableSortLabel active={orderBy === 'datefrom'} direction={order} onClick={createSortHandler('datefrom')}>
                        Date From
                        </TableSortLabel>
                </TableCell>
                <TableCell key={'dateto'} >
                    Date To
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableToolbar = props => {
    const { numSelected } = props;
    return (
        <Toolbar className={clsx({})} style={{ paddingLeft: 16, minHeight: 40 }}>
            <Typography style={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">Reservations</Typography>
        </Toolbar>
    );
};

const useStyles = makeStyles(theme => ({

}));
export function EnhancedTableWrapperReservation(){
    const [mockData,setMockData] = React.useState(reservationsMock);
    return (
        <EnhancedTableReservation data={mockData} setData={e=>
            setMockData(e)}/>
    );
}
interface IEnhancedTableProps {
    data: Reservation[];
    setData: Function;
}

function EnhancedTableReservation(props: IEnhancedTableProps) {
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
    const removeFromSource = (id)=>{
      var v=  props.data.splice(props.data.findIndex(x=>id == x.id),1);
        props.setData(props.data);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

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
                                            .map((row, index) => {
                                                const isItemSelected = isSelected(row.user);
                                                const labelId = `enhanced-table-checkbox-${index}`;

                                                return (
                                                    <TableRow key={row.id} hover selected={isItemSelected}>
                                                        <TableCell >{row.userId}</TableCell>
                                                        <TableCell >{row.dateFrom}</TableCell>
                                                        <TableCell >{row.dateTo}</TableCell>                                               
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

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnhancedTableReservation);