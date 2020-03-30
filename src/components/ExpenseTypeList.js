import React, { useCallback, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import { request } from '../utils/request';
import Alert from '@material-ui/lab/Alert';
import Spinner from './Spinner';
import './ExpenseTypeList.css';
import RemoveButton from './RemoveButton';
import { Button } from '@material-ui/core';

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

  const refresh = useCallback(() => {
    setError('');
    fetchTypes();
  }, []);

  const onDelete = useCallback(async item => {
    setLoading(true);
    setError('');
    try {
      await request('/api/type', {
        method: 'DELETE',
        body: JSON.stringify(item),
      });
      fetchTypes();
    } catch {
      setError(
        "Added expense , couldn't delete expense type. Click alert to refresh page."
      );
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
      <Button onClick={refresh} className="type-button">
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Button>
    );
  }

  return (
    <div className="type-chips-container">
      {types.map(item => {
        return (
          <Chip
            className="type-chip"
            size="small"
            label={item.description}
            clickable
            color="primary"
            icon={
              <RemoveButton
                onDelete={onDelete}
                item={item}
                title={'Delete expense type ???'}
                text={'Confirm deleting the item from the database.'}
              />
            }
          />
        );
      })}
      {isLoading && <Spinner color="secondary" />}
    </div>
  );
};
export default ExpenseTypeList;
