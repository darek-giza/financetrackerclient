import React, { useCallback, useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import { request } from '../utils/request';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
    <div>
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
