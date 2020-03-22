import React, { useCallback, useEffect, useState } from 'react';
import UserData from '../components/UserData';
import UserExpenseList from '../components/UserExpenseList';
import UserIncomeList from '../components/UserIncomeList';
import { request } from '../utils/request';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

export const User = () => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const user = await request('http://localhost:8080/api/user');
      setUser(user);
    } catch {
      setError("Couldn't load user data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Grid container spacing={3} direction="column">
      <Typography variant="h2" component="h1">
        User
      </Typography>
      {error ? (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      ) : (
        <React.Fragment>
          {isLoading && <CircularProgress color="secondary" />}
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
        </React.Fragment>
      )}
    </Grid>
  );
};

export default User;
