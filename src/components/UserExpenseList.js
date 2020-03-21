import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export const UserExpenseList = ({ user }) => (
  <Grid item xs={12} sm={6}>
    <TableContainer>
      <h4>List of amounts of your recent expenses</h4>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%">Type of expense</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>
              <Button variant="outlined" color="primary" href="/expenses">
                details
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user.budget.expense.map(item => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.expenseType.description} </TableCell>
                <TableCell>{item.amount} </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  </Grid>
);
export default UserExpenseList;
