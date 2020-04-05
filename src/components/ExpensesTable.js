import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import 'react-datepicker/dist/react-datepicker.css';
import { request } from '../utils/request';
import Alert from '@material-ui/lab/Alert';
import Spinner from './Spinner';
import RemoveButton from './RemoveButton';
import { Button } from '@material-ui/core';

export const ExpenseTable = ({ shouldRefresh, onRefresh, onRemove }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const expenses = await request('/api/expenses');
      setExpenses(expenses);
    } catch {
      setError("Couldn't load incomes");
    } finally {
      setLoading(false);
    }
  }, []);

  const onDelete = useCallback(async item => {
    setLoading(true);
    setError('');
    try {
      console.log({ item });
      await request('/api/expenses', {
        method: 'DELETE',
        body: JSON.stringify(item),
      });
      onRemove();
      fetchExpenses();
    } catch {
      setError("Couldn't delete expense. Click alert to refresh page.");
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

  const refresh = useCallback(() => {
    setError('');
    fetchExpenses();
  }, []);

  if (error) {
    return (
      <Button onClick={refresh} className="type-button">
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Button>
    );
  }

  return (
    <TableContainer>
      {isLoading && <Spinner />}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type of expenses</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(item => {
            return (
              <TableRow key={item.id}>
                <TableCell>{moment(item.date).format('DD-MM-YYYY')}</TableCell>
                <TableCell>{item.expenseType.description}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <RemoveButton
                    onDelete={onDelete}
                    item={item}
                    title={'Delete expense ???'}
                    text={'Confirm deleting incomes from the database.'}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ExpenseTable;
