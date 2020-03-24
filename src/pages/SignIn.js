import React, { useState } from 'react';
import { request } from '../utils/request';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Signin.css';

export default function SignIn() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onUsernameChange = event => {
    setUsername(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const login = async event => {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      localStorage.removeItem('token');
      const data = await request('/authenticate', {
        body: JSON.stringify({ username, password }),
        method: 'POST',
      });
      localStorage.setItem('token', data.token);
      if (data.token != null) {
        setLoggedIn(true);
      }
    } catch (error) {
      localStorage.removeItem('token');
      setLoggedIn(false);
      setError('User name or password incorrect');
      return <Redirect to="/" />;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {loggedIn && <Redirect to="/incomes" />}
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" onSubmit={login}>
          {error && (
            <Alert severity="error" variant="filled">
              {error}
            </Alert>
          )}
          <TextField
            onChange={onUsernameChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User name"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            onChange={onPasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            className="submit"
          >
            {isLoading && <CircularProgress color="secondary" />}
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
