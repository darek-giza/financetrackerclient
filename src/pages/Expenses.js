import React, { useCallback, useState } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import 'react-datepicker/dist/react-datepicker.css';
import ExpensesTable from '../components/ExpensesTable';
import ExpensesForm from '../components/ExpensesForm';

export const Expenses = () => {
  const [refresh, setRefresh] = useState(true);

  const onAdd = useCallback(() => {
    setRefresh(true);
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  return (
    <React.Fragment>
      <MenuAppBar />
      <ExpensesForm onAdd={onAdd} />
      <ExpensesTable shouldRefresh={refresh} onRefresh={onRefresh} />
    </React.Fragment>
  );
};
export default Expenses;
