import React, { useCallback, useState } from 'react';
import IncomesForm from '../components/IncomesForm';
import IncomesList from '../components/IncomesTable';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import UserBudget from '../components/UserBudget';
import './Incomes.css';

export const Incomes = () => {
  const [refresh, setRefresh] = useState(true);

  const onAdd = useCallback(() => {
    setRefresh(true);
  }, []);
  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  const onRemove = useCallback(() => {
    setRefresh(true);
  }, []);

  return (
    <Grid container spacing={3} direction="column">
      <Typography variant="h2" component="h1" className="header">
        Incomes
      </Typography>
      <Typography variant="h5" className="sub-header">
        Add a new income ...
      </Typography>
      <Paper className="container">
        <IncomesForm onAdd={onAdd} />
        <UserBudget shouldRefresh={refresh} onRefresh={onRefresh} />
      </Paper>
      <Typography variant="h5" className="sub-header">
        Statement of all incomes
      </Typography>
      <Paper className="section">
        <IncomesList
          shouldRefresh={refresh}
          onRefresh={onRefresh}
          onRemove={onRemove}
        />
      </Paper>
    </Grid>
  );
};
export default Incomes;
