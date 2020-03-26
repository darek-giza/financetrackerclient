import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const RemoveButton = ({ item, onDelete }) => {
  const onClick = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);
  return (
    <Button onClick={onClick}>
      <DeleteOutlineIcon color="secondary" />
    </Button>
  );
};
export default RemoveButton;
