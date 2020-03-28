import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './Home.css';
import Yearly from '../components/ExpenseCount/Yearly';
import Monthly from '../components/ExpenseCount/Monthly';
import { Weekly } from '../components/ExpenseCount/Weekly';
import { Daily } from '../components/ExpenseCount/Daily';

const Home = () => {
  const [refresh, setRefresh] = useState(true);

  const onAdd = useCallback(() => {
    setRefresh(true);
  }, []);
  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  return (
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
            <Avatar className="badge badge-green">${<Daily />}</Avatar>
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h1" className="header">
            Weekly
          </Typography>
          <Paper className="block">
            <Avatar className="badge badge-green">${<Weekly />}</Avatar>
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h1" className="header">
            Monthly
          </Typography>
          <Paper className="block">
            <Avatar className="badge badge-green">${<Monthly />}</Avatar>
          </Paper>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h1" className="header">
            Yearly
          </Typography>
          <Paper className="block">
            <Avatar className="badge badge-green">${<Yearly />}</Avatar>
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
};
export default Home;
