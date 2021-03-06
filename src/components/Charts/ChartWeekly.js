import React, { useCallback } from 'react';
import { request } from '../../utils/request';
import { Container } from '@material-ui/core';
import './Chart.css';
import AsyncChart from './AsyncChart';

const ChartWeekly = ({shouldRefresh, onRefresh}) => {

  const load = useCallback(async () => {
    return await request('/api/chartWeekly');
  }, []);

  return (
    <Container>
      <AsyncChart loadData={load}
                  width={1000}
                  height={300}
                  shouldRefresh={shouldRefresh}
                  onRefresh={onRefresh}
      />
    </Container>
  );
};
export default ChartWeekly;
