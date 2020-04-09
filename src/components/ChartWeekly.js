import React, { useCallback } from 'react';
import { request } from '../utils/request';
import { Container } from '@material-ui/core';
import './Chart.css';
import FetchChart from './FetchChart';

const ChartWeekly = () => {
  const loadYearly = useCallback(async () => {
    return await request('/api/chartWeekly');
  }, []);

  return (
    <Container>
      <FetchChart loadData={loadYearly} width={1000} height={300} />
    </Container>
  );
};
export default ChartWeekly;
