import React, { useCallback, useEffect, useState } from 'react';
import UserData from '../components/UserData';
import { request } from '../utils/request';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Spinner from '../components/Spinner';

export const User = () => {
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
      <Typography variant="h2" component="h1" className="header">
        User
      </Typography>
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
          <Typography variant="h5" className="sub-header">
            User data
          </Typography>
          <UserData user={user} />
        </React.Fragment>
      )}
    </Grid>
  );
};

export default User;
