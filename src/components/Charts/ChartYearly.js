import React, { useCallback } from 'react';
import { request } from '../../utils/request';
import { Container } from '@material-ui/core';
import './Chart.css';
import FetchChart from './FetchChart';

const Chart2020 = () => {
  const loadYearly = useCallback(async () => {
    return await request('/api/chartYearly');
  }, []);

  return (
    <Container>
      <FetchChart loadData={loadYearly} title={'Chart for 2020'} />
    </Container>
  );
};
export default Chart2020;
