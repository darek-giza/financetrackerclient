import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

export const UserIncomeList = ({ user }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Description</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell width="5%">
            <Button variant="outlined" color="primary" href="/incomes">
              details
            </Button>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {user &&
          user.budget.incomes.map(item => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.amount} </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  </TableContainer>
);
export default UserIncomeList;
