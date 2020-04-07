import React, { useCallback, useEffect, useState } from 'react';
import { request } from '../utils/request';
import { Button, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Chart from './Chart';
import Spinner from './Spinner';
import Paper from '@material-ui/core/Paper';
import './Chart.css';
import Typography from '@material-ui/core/Typography';

const ChartYearly = () => {
  const [data, setDat] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request('/api/chartWeekly');
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
    <Container>
      <Typography variant="h2" component="h1" className="header">
        Chart for 2020
      </Typography>
      <Paper className="chart-container">
        {isLoading && <Spinner />}
        <Chart data={data} />
      </Paper>
    </Container>
  );
};
export default ChartYearly;
