import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../../utils/request';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import Spinner from '../Spinner';

export const IncomeMonthly = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [monthly, setMonthly] = useState("0.00");

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const incomes = await request('/api/incomes/incomesCount');
      setMonthly(incomes.monthly);
    } catch {
      setError("Couldn't load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCount();
  }, []);

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
      {isLoading && <Spinner type="table"/>}
      {monthly}
    </div>
  );
};
export default IncomeMonthly;