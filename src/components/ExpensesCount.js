import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../utils/request';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import Spinner from './Spinner';

export const ExpensesCount = ({ shouldRefresh, onRefresh }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [incomes, setIncomes] = useState('');

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const incomes = await request('/api/expenses/expenseCount');
      console.log(incomes);
      setIncomes(incomes);
    } catch {
      setError("Couldn't load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchCount();
      onRefresh();
    }
  }, [shouldRefresh]);

  const refresh = useCallback(() => {
    setError('');
    fetchCount();
  }, []);

  if (error) {
    return (
      <Button onClick={refresh} className="type-button">
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Button>
    );
  }

  return (
    <div>
      {isLoading && <Spinner type="table" />}
      {incomes.annually}
    </div>
  );
};
export default ExpensesCount;
