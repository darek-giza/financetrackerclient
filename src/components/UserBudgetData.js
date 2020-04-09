import React from 'react';
import Title from './Dashboard/Title';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

export const UserBudgetData = ({ user, date }) =>
  user ? (
    <React.Fragment>
      <Typography>
        <Title>Recent Deposit</Title>
      </Typography>
      <Typography component="p" variant="h4">
        ${user.budget.balance}
      </Typography>
      <Typography color="textSecondary" variant="h5">
        <Moment format=" on DD MMMM , YYYY">{date}</Moment>
      </Typography>
    </React.Fragment>
  ) : null;
export default UserBudgetData;
