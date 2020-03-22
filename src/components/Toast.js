import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import React, { useCallback, useState } from 'react';

const Toast = ({ message, type }) => {
  const [open, setOpen] = useState(true);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Alert severity={type} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Toast;
