import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../utils/request';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Spinner from '../components/Spinner';
import UserBudgetData from './UserBudgetData';

export const UserBudget = () => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const user = await request('/api/user');
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
      {error ? (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      ) : (
        <React.Fragment>
          {isLoading && (
            <Paper className="section">
              <Spinner />
            </Paper>
          )}
          <UserBudgetData user={user} />
        </React.Fragment>
      )}
    </Grid>
  );
};
export default UserBudget;
