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
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ExpenseTable = ({ shouldRefresh, onRefresh }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const expenses = await request('http://localhost:8080/api/expenses');
      setExpenses(expenses);
    } catch {
      setError("Couldn't load incomes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchExpenses();
      onRefresh();
    }
  }, [shouldRefresh]);

  if (error) {
    return (
      <Alert severity="error" variant="filled">
        {error}
      </Alert>
    );
  }

  return (
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
          {isLoading && <CircularProgress color="secondary" />}
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
  );
};
export default ExpenseTable;
