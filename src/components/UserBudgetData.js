import React from 'react';
import { Container } from '@material-ui/core';

export const UserBudgetData = ({ user }) =>
  user ? (
    <Container>
      <h2>Balance : {user.budget.balance}</h2>
    </Container>
  ) : null;
export default UserBudgetData;
