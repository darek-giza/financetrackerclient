import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { request } from '../utils/request';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Dariusz Giza
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    margin: theme.spacing(3, 0),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onUsernameChange = event => {
    setUsername(event.target.value);
  };

  const onEmailChange = event => {
    setEmail(event.target.value);
  };

  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const SignUp = async event => {
    event.preventDefault();
    try {
      setError('');
      setLoading(true);
      const data = await request('/register', {
        body: JSON.stringify({ username, email, password }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setError('Creating user failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {success && <Redirect to="/signin" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={SignUp}>
          {error && (
            <Alert className={classes.alert} severity="error" variant="filled">
              {error}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={onUsernameChange}
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="User Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onEmailChange}
                variant="outlined"
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onPasswordChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isLoading && <CircularProgress color="secondary" />}
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
