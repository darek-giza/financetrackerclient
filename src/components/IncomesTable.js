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
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const RemoveButton = ({ income, onDelete }) => {
  const onClick = useCallback(() => {
    onDelete(income);
  }, [income, onDelete]);
  return (
    <Button onClick={onClick}>
      <DeleteOutlineIcon color="secondary" />
    </Button>
  );
};

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

  const onDelete = useCallback(async income => {
    setLoading(true);
    setError('');
    try {
      console.log({ income });
      await request('/api/incomes', {
        method: 'DELETE',
        body: JSON.stringify(income),
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
          {incomes.map(income => (
            <TableRow key={income.id}>
              <TableCell>
                <Moment format="DD-MM-YYYY">{income.date}</Moment>
              </TableCell>
              <TableCell>{income.description}</TableCell>
              <TableCell>{income.amount}</TableCell>
              <TableCell>
                <RemoveButton onDelete={onDelete} income={income} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default IncomesTable;
