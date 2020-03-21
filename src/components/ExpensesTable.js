import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import 'react-datepicker/dist/react-datepicker.css';
import { request } from '../utils/request';
import Grid from '@material-ui/core/Grid';

export const ExpenseTable = ({ shouldRefresh, onRefresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const fetchExpenses = useCallback(async () => {
    const expenses = await request('http://localhost:8080/api/expenses');
    setExpenses(expenses);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchExpenses();
      onRefresh();
    }
  }, [shouldRefresh]);

  if (isLoaded !== true) {
    return '... is loading';
  }

  return (
    <Grid item xs={12} sm={6}>
      <Paper>
        <h1>Statement of all expenses</h1>
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
                    <TableCell>
                      {moment(expense.date).format('DD-MM-YYYY')}
                    </TableCell>
                    <TableCell>{expense.expenseType.description}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};
export default ExpenseTable;
