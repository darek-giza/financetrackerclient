import React, { useCallback, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { request } from '../utils/request';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ExpenseTypeList = ({ shouldRefresh, onRefresh }) => {
  const [types, setTypes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTypes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const types = await request('/api/type');
      setTypes(types);
    } catch {
      setError("Couldn't load incomes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldRefresh) {
      fetchTypes();
      onRefresh();
    }
  }, [shouldRefresh]);

  if (error) {
    return (
      <Alert severity="error" variant="filled">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      {isLoading && <CircularProgress color="secondary" />}
      {types.map(type => {
        return (
          <Chip
            onDelete={() => {}}
            // variant="outlined"
            size="small"
            icon={<ChevronRightIcon />}
            label={type.description}
            clickable
            color="primary"
          />
        );
      })}
    </div>
  );
};
export default ExpenseTypeList;
