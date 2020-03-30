import React, { useCallback, useState } from 'react';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AlertDialog from './AlertDialog';

const RemoveButton = ({ item, onDelete, title, text }) => {
  let [open, setOpen] = useState(false);

  const onClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    onDelete(item);
    setOpen(false);
  }, [item, onDelete, open]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [open]);
  return (
    <div>
      <Button onClick={onClick}>
        <DeleteOutlineIcon color="secondary" />
      </Button>
      <AlertDialog
        open={open}
        item={item}
        onDelete={onDelete}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        title={title}
        text={text}
      />
    </div>
  );
};
export default RemoveButton;
