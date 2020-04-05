import React from 'react';
import { Container } from '@material-ui/core';

export const UserBudgetData = ({ user }) =>
  user ? (
    <Container>
      <h2>Balance :</h2>
      <h1>{user.budget.balance}</h1>
    </Container>
  ) : null;
export default UserBudgetData;
