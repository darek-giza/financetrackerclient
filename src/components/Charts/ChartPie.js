import React, { useCallback } from 'react';
import { Container } from '@material-ui/core';
import './Chart.css';
import AsyncPie from "./AsyncPie";
import { request } from "../../utils/request";


const ChartPie = () => {

  const load = useCallback(async () => {
    return await request('/api/chartPie');
  }, []);

  return (
    <Container>
      <AsyncPie/>
    </Container>
  );
};
export default ChartPie;