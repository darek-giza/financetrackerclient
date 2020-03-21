import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpenseTypeForm from '../components/ExpenseTypeForm';
import ExpenseTypeList from '../components/ExpenseTypeList';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(10),
      width: 200,
    },
    flexGrow: 100,
  },
}));

export const Types = () => {
  const [refresh, setRefresh] = useState(true);
  const { root } = useStyles();

  const onAdd = useCallback(() => {
    setRefresh(true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  return (
    <Grid container spacing={3} direction="column">
      <ExpenseTypeForm onAdd={onAdd} />
      <ExpenseTypeList shouldRefresh={refresh} onRefresh={onRefresh} />
    </Grid>
  );
};
export default Types;
