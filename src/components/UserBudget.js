import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../utils/request';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Spinner from '../components/Spinner';
import UserBudgetData from './UserBudgetData';
import { Button } from '@material-ui/core';
import './UserBudget.css';

export const UserBudget = ({ shouldRefresh, onRefresh }) => {
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
    if (shouldRefresh) {
      fetchUser();
      onRefresh();
    }
  }, [shouldRefresh]);

  const refresh = useCallback(() => {
    setError('');
    fetchUser();
  }, []);

  if (error) {
    return (
      <Button onClick={refresh} className="type-button">
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Button>
    );
  }

  return (
    <Grid container spacing={3} direction="column" className="container-card">
      <React.Fragment>
        {isLoading && <Spinner />}
        <UserBudgetData user={user} date={new Date()} />
      </React.Fragment>
    </Grid>
  );
};
export default UserBudget;
