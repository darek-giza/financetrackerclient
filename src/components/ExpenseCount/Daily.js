import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../../utils/request';
import Alert from '@material-ui/lab/Alert';
import { Button } from '@material-ui/core';
import Spinner from '../Spinner';

export const Daily = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [daily ,setDaily] = useState(0.00);

  const fetchCount = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const expense = await request('/api/expenses/expenseCount');
      setDaily(expense.daily);
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

  if (daily == null) {
    setDaily(0.00);
  }

  return (
    <div>
      {isLoading && <Spinner type="table"/>}
      {daily}
    </div>
  );
};
export default Daily;