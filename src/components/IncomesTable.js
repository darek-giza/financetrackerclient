import React, { useCallback, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment';
import { request } from '../utils/request';
import Alert from '@material-ui/lab/Alert';
import Spinner from './Spinner';
import RemoveButton from './RemoveButton';

export const IncomesTable = ({ shouldRefresh, onRefresh }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const incomes = await request('/api/incomes');
      setIncomes(incomes);
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
      await request('/api/incomes', {
        method: 'DELETE',
        body: JSON.stringify(item),
      });
      fetchIncomes();
    } catch {
      setError("Couldn't delete income");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchIncomes();
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
    <TableContainer>
      {isLoading && <Spinner type="table" />}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomes.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                <Moment format="DD-MM-YYYY">{item.date}</Moment>
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}</TableCell>
              <TableCell>
                <RemoveButton onDelete={onDelete} item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default IncomesTable;
