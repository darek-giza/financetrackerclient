import React from 'react';
import Title from './Dashboard/Title';
import Typography from '@material-ui/core/Typography';

export const UserBudgetData = ({ user }) =>
  user ? (
    <React.Fragment>
      <Title>Recent Deposit</Title>
      <Typography component="p" variant="h4">
        {user.budget.balance}
      </Typography>
      <Typography color="textSecondary">on 15 March, 2019</Typography>
    </React.Fragment>
  ) : null;
export default UserBudgetData;
