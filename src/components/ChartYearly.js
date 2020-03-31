import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../utils/request';
import { Button, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Chart from './Chart';
import Spinner from './Spinner';

const ChartYearly = () => {
  const [data, setDat] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request('/api/chartYearly');
      setDat(data);
    } catch {
      setError("Couldn't load chart data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const refresh = useCallback(() => {
    setError('');
    fetch();
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
      {isLoading && <Spinner />}
      <Chart data={data} />
    </div>
  );
};
export default ChartYearly;
