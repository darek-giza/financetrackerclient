import React, { useCallback, useEffect, useState } from 'react';
import UserData from '../components/UserData';
import UserExpenseList from '../components/UserExpenseList';
import UserIncomeList from '../components/UserIncomeList';
import { request } from '../utils/request';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const User = () => {
  const [user, setUser] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const fetchUser = useCallback(async () => {
    const user = await request('http://localhost:8080/api/user');
    setUser(user);
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!isLoaded) {
    return '... is loading';
  }

  return (
    <Grid container spacing={3} direction="column">
      <Typography variant="h2" component="h1">
        User
      </Typography>
      <Typography variant="h5">User data</Typography>
      <UserData user={user} />
      <Typography variant="h5">
        List of amounts of your recent expenses
      </Typography>
      <UserExpenseList user={user} />
      <Typography variant="h5">
        List of amounts of your recent incomes
      </Typography>
      <UserIncomeList user={user} />
    </Grid>
  );
};

export default User;
