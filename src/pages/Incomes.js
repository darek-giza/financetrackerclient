import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuAppBar from '../components/MenuAppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StickyFooter from '../components/StickyFooter';
import Moment from 'react-moment';
import { request } from '../utils/request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';
import MaterialUIPickers from '../components/MaterialUIPickers';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(2),
  },
  cont: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));

export const Incomes = props => {
  const { classes } = props;
  const [isLoaded, setLoaded] = useState(false);
  const [income, setIncome] = useState({
    description: null,
    amount: null,
    date: new Date(),
  });
  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = useCallback(async () => {
    const incomes = await request('http://localhost:8080/api/incomes');
    setIncomes(incomes);
    setLoaded(true);
  }, []);

  const cancelIncomes = useCallback(() => {
    document.getElementById('create-income-form').reset();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      try {
        event.preventDefault();
        income.date = moment(income.date).format('YYYY-MM-DD');
        await request('http://localhost:8080/api/incomes', {
          method: 'POST',
          body: JSON.stringify([income]),
        });
        await fetchIncomes();
        cancelIncomes();
      } catch (error) {
        console.log('Adding income failed', error);
      }
    },
    [income]
  );

  const handleChange = useCallback(
    event => {
      setIncome({ ...income, [event.target.name]: event.target.value });
    },
    [income]
  );

  const handleDateChange = useCallback(
    date => {
      setIncome({ ...income, date });
    },
    [income]
  );

  useEffect(() => {
    fetchIncomes();
  }, []);

  if (isLoaded !== true) {
    return '... is loading';
  }

  return (
    <React.Fragment>
      <MenuAppBar />
      <Container className={classes.cont} maxWidth="sm">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          id="create-income-form"
          onSubmit={handleSubmit}
        >
          <div>
            <h4>Add a new income ...</h4>
          </div>
          <TextField
            type="text"
            id="description"
            label="Description"
            onChange={handleChange}
            name="description"
          />
          <div>
            <TextField
              type="text"
              id="amount"
              label="Amount"
              onChange={handleChange}
              name="amount"
            />
          </div>
          <div>
            <MaterialUIPickers
              selected={income.date}
              onChange={handleDateChange}
              id="date"
              name="date"
            />
          </div>
        </form>
        <Button
          color="primary"
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleSubmit}
          type="submit"
        >
          Save
        </Button>{' '}
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={cancelIncomes}
        >
          Cancel
        </Button>
      </Container>

      <h1>Statement of all incomes</h1>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomes.map(income => {
              return (
                <TableRow key={income.id}>
                  <TableCell>
                    <Moment format="DD-MM-YYYY">{income.date}</Moment>
                  </TableCell>
                  <TableCell>{income.description}</TableCell>
                  <TableCell align="right">{income.amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <StickyFooter />
    </React.Fragment>
  );
};
export default withStyles(useStyles)(Incomes);
