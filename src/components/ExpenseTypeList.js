import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import { request } from '../utils/request';

export const ExpenseTypeList = ({ shouldRefresh, onRefresh }) => {
  const [types, setTypes] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const fetchTypes = useCallback(async () => {
    const types = await request('http://localhost:8080/api/type');
    setTypes(types);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchTypes();
      onRefresh();
    }
  }, [shouldRefresh]);

  if (!isLoaded || !types) {
    return '... is loading';
  }

  return (
    <Grid item xs={6} sm={3}>
      <h4>All types of expenses you have</h4>
      <Paper>
        <div>
          <Chip
            variant="outlined"
            color="secondary"
            size="small"
            label="Expenses types"
          />
          {types.map(type => {
            return (
              <Chip
                variant="outlined"
                size="small"
                icon={<FaceIcon />}
                label={type.description}
                clickable
                color="primary"
                deleteIcon={<DoneIcon />}
              />
            );
          })}
        </div>
      </Paper>
    </Grid>
  );
};
export default ExpenseTypeList;
