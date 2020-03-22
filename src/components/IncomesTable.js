import React, { useCallback, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';
import { request } from '../utils/request';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <CircularProgress color="secondary" />}
          {incomes.map(income => {
            return (
              <TableRow key={income.id}>
                <TableCell>
                  <Moment format="DD-MM-YYYY">{income.date}</Moment>
                </TableCell>
                <TableCell>{income.description}</TableCell>
                <TableCell align="right">{income.amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default IncomesTable;
