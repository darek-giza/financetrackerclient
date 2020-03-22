import React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './Home.css';

const Home = () => (
  <Container>
    <Typography variant="h2" component="h1" className="header">
      Dashboard
    </Typography>
    <Typography variant="h4" component="h1" className="header">
      Expenses
    </Typography>
    <Grid container direction="row" justify="space-around" align="center">
      <Grid item>
        <Typography variant="h5" component="h1" className="header">
          Daily
        </Typography>
        <Paper className="block">
          <Avatar className="badge badge-green">$250</Avatar>
        </Paper>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h1" className="header">
          Weekly
        </Typography>
        <Paper className="block">
          <Avatar className="badge badge-green">$250</Avatar>
        </Paper>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h1" className="header">
          Monthly
        </Typography>
        <Paper className="block">
          <Avatar className="badge badge-green">$250</Avatar>
        </Paper>
      </Grid>
    </Grid>
    <Typography variant="h4" component="h1" className="header">
      Incomes
    </Typography>
    <Grid container direction="row" justify="space-around" align="center">
      <Grid item>
        <Typography variant="h5" component="h1" className="header">
          Daily
        </Typography>
        <Paper className="block">
          <Avatar className="badge badge-orange">$250</Avatar>
        </Paper>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h1" className="header">
          Weekly
        </Typography>
        <Paper className="block">
          <Avatar className="badge badge-orange">$250</Avatar>
        </Paper>
      </Grid>
      <Grid item>
        <Typography variant="h5" component="h1" className="header">
          Monthly
        </Typography>
        <Paper className="block">
          <Avatar className="badge badge-orange">$250</Avatar>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);
export default Home;
