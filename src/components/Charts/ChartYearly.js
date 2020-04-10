import React, { useCallback, useState } from 'react';
import { request } from "../../utils/request";
import { Container } from '@material-ui/core';
import './Chart.css';
import AsyncChart from "./AsyncChart";
import Typography from "@material-ui/core/Typography";

const ChartYearly = () => {
  const [refresh,setRefresh] = useState(true);

  const load = useCallback(async () => {
    return await request('/api/chartYearly');
  }, []);

  const onRefresh = useCallback(()=>{
    setRefresh(false);
  },[]);

  return (
    <Container>
      <Typography variant="h2" component="h1" className="header">
        Chart for 2020
      </Typography>
      <AsyncChart loadData={load}
                  width={1100}
                  height={300}
                  shouldRefresh={refresh}
                  onRefresh={onRefresh}
      />
    </Container>
  );
};
export default ChartYearly;