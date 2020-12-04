import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export function BasicTable(props) {
  const classes = useStyles();
    const rows = props.rows
    const history = useHistory()

  return (  
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Username</b></TableCell>
            <TableCell align="right"><b>orderID</b></TableCell>
            <TableCell align="right"><b>foodID</b></TableCell>
            <TableCell align="right"><b>quantity</b></TableCell>
            <TableCell align="right"><b>Date Ordered</b></TableCell>
            <TableCell align="right"><b>Seller Username</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.customerUsername}>
              <TableCell component="th" scope="row">
                {row.customerUsername}
              </TableCell>
              <TableCell align="right">{row.orderID}</TableCell>
              <TableCell align="right" onClick={() => history.push(`/posts/${row.foodID}/`) }
>{row.foodID}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.dateOrdered}</TableCell>
              <TableCell align="right">{row.sellerUsername}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}