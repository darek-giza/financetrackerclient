import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ExpenseTypeForm from '../components/ExpenseTypeForm';
import ExpenseTypeList from '../components/ExpenseTypeList';

export const Types = () => {
  const [refresh, setRefresh] = useState(true);

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
