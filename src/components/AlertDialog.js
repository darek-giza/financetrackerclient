import React, { useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const AlertDialog = ({ open }) => {
  const handleDelete = useCallback(() => {
    console.log('in delete button', open);
  }, [open]);

  const handleCancel = useCallback(() => {
    console.log('in cancel button', open);
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={handleDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Delete expense type ???'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Confirm deleting the item from the database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
