import React, { useCallback, useEffect, useState } from 'react';
import './Chart.css';
import PieCharts from "./PieCharts";
import { request } from "../../utils/request";
import { Button, Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Spinner from "../Spinner";

const ChartPie = () => {
  const [data, setDat] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await request('/api/chartPie');
      console.log("DATA",data)
      setDat(data);
    } catch {
      setError("Couldn't load chart data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  },[]);



  //   if (shouldRefresh) {
  //     fetch();
  //     onRefresh();
  //   }
  // }, [shouldRefresh]);

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
        {isLoading && <Spinner/>}
        <PieCharts data={data}/>
      </Paper>
    </Container>
  );
};
export default ChartPie;