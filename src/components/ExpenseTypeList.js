import React, { useCallback, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { request } from '../utils/request';
import Alert from '@material-ui/lab/Alert';
import Spinner from './Spinner';
import './ExpenseTypeList.css';
import RemoveButton from './RemoveButton';

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

  const onDelete = useCallback(async item => {
    setLoading(true);
    setError('');
    try {
      console.log(item);
      await request('/api/type', {
        method: 'DELETE',
        body: JSON.stringify(item),
      });
      fetchTypes();
    } catch {
      setError("Couldn't delete expense type");
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
    <div className="type-chips-container">
      {isLoading && <Spinner color="secondary" />}
      {types.map(item => {
        return (
          <Chip
            className="type-chip"
            size="small"
            label={item.description}
            clickable
            color="primary"
            icon={<RemoveButton onDelete={onDelete} item={item} />}
          />
        );
      })}
    </div>
  );
};
export default ExpenseTypeList;
