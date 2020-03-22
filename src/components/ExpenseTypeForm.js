import React, { useCallback, useState } from 'react';
import { request } from '../utils/request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Toast from './Toast';
import CircularProgress from '@material-ui/core/CircularProgress';

export const ExpenseTypeForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setLoading] = useState(false);

  const cancelTypes = useCallback(() => {
    document.getElementById('create-type-form').reset();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      try {
        setSuccess('');
        setError('');
        setLoading(true);
        event.preventDefault();
        await request('http://localhost:8080/api/type', {
          method: 'POST',
          body: JSON.stringify({ description }),
        });
        onAdd();
        cancelTypes();
        setSuccess('Adding success.');
      } catch (error) {
        setError('Adding failure');
      } finally {
        setLoading(false);
      }
    },
    [onAdd, description]
  );

  const handleChange = useCallback(event => {
    setDescription(event.target.value);
  }, []);

  return (
    <Container maxWidth="sm">
      {error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}
      {success && <Toast message={success} type="success" />}
      <form autoComplete="off" id="create-type-form" onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            type="text"
            id="description"
            label="Description"
            onChange={handleChange}
            name="description"
          />
        </div>
        <Button color="primary" variant="outlined" size="small" type="submit">
          {isLoading && <CircularProgress color="secondary" />}
          Save
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={cancelTypes}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};
export default ExpenseTypeForm;
