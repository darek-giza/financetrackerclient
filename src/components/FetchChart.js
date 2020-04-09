import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Chart from './Chart';
import Spinner from './Spinner';
import Paper from '@material-ui/core/Paper';
import './Chart.css';

const FetchChart = ({ loadData, width, height }) => {
  const [data, setDat] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await loadData();
      setDat(data);
      console.log(data);
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
      <Paper className="chart-container">
        {isLoading && <Spinner />}
        <Chart data={data} onLoad={fetch} width={width} height={height} />
      </Paper>
    </Container>
  );
};
export default FetchChart;
