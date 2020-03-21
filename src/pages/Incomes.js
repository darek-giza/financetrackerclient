import React, { useCallback, useState } from 'react';
import MenuAppBar from '../components/MenuAppBar';
import IncomesForm from '../components/IncomesForm';
import IncomesList from '../components/IncomesTable';

export const Incomes = () => {
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
      <IncomesForm onAdd={onAdd} />
      <IncomesList shouldRefresh={refresh} onRefresh={onRefresh} />
    </React.Fragment>
  );
};
export default Incomes;
