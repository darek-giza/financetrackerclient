import React, { useCallback, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Circle from './Circle';

export const Summary = ({ loadData, avatarClassName }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState();

  const fetch = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await loadData();
      setData(response);
    } catch {
      setError("Couldn't load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    setError('');
    fetch();
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      {error && (
        <Button onClick={refresh} className="type-button">
          <Alert severity="error" variant="filled">
            {error}. Click here to refresh.
          </Alert>
        </Button>
      )}
      <Grid container direction="row" justify="space-around" align="center">
        <Circle
          isLoading={isLoading}
          value={data && data.yearly}
          header="Yearly"
          avatarClassName={avatarClassName}
        />
        <Circle
          isLoading={isLoading}
          value={data && data.monthly}
          header="Monthly"
          avatarClassName={avatarClassName}
        />
        <Circle
          isLoading={isLoading}
          value={data && data.weekly}
          header="Weekly"
          avatarClassName={avatarClassName}
        />
        <Circle
          isLoading={isLoading}
          value={data && data.daily}
          header="Daily"
          avatarClassName={avatarClassName}
        />
      </Grid>
    </>
  );
};

export default Summary;
