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

export const IncomesTable = ({ shouldRefresh, onRefresh }) => {
  const [isLoaded, setLoaded] = useState(false);
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = useCallback(async () => {
    const incomes = await request('http://localhost:8080/api/incomes');
    setIncomes(incomes);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchIncomes();
      onRefresh();
    }
  }, [shouldRefresh]);

  if (isLoaded !== true) {
    return '... is loading';
  }

  return (
    <React.Fragment>
      <h1>Statement of all incomes</h1>
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
    </React.Fragment>
  );
};
export default IncomesTable;
