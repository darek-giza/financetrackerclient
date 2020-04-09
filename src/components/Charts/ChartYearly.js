import React, { useCallback } from 'react';
import { request } from '../../utils/request';
import { Container } from '@material-ui/core';
import './Chart.css';
import FetchChart from './FetchChart';

const ChartYearly = () => {
  const load = useCallback(async () => {
    return await request('/api/chartYearly');
  }, []);

  return (
    <Container>
      <FetchChart loadData={load}
                  width={1000}
                  height={300}
      />
    </Container>
  );
};
export default ChartYearly;
