import React from 'react';
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const ExpensesTable = ({ expenses }) => (
  <TableContainer component={Paper}>
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Type of expenses</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {expenses.map(expense => {
          return (
            <TableRow key={expense.id}>
              <TableCell>{moment(expense.date).format('DD-MM-YYYY')}</TableCell>
              <TableCell>{expense.expenseType.description}</TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell>{expense.amount}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ExpensesTable;
