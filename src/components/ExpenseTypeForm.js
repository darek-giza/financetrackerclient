import React, { useCallback, useState } from 'react';
import { request } from '../utils/request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';

export const ExpenseTypeForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');

  const cancelTypes = useCallback(() => {
    document.getElementById('create-type-form').reset();
  }, []);

  const handleSubmit = useCallback(
    async event => {
      try {
        await request('http://localhost:8080/api/type', {
          method: 'POST',
          body: JSON.stringify({ description }),
        });
        onAdd();
        cancelTypes();
      } catch (error) {
        console.log('Adding type failed', error);
      }
    },
    [onAdd, description]
  );

  const handleChange = useCallback(event => {
    setDescription(event.target.value);
  }, []);

  return (
    <Container maxWidth="sm">
      <form
        noValidate
        autoComplete="off"
        id="create-type-form"
        onSubmit={handleSubmit}
      >
        <div>
          <TextField
            type="text"
            id="description"
            label="Description"
            onChange={handleChange}
            name="description"
          />
        </div>
      </form>
      <Button
        color="primary"
        variant="outlined"
        size="small"
        onClick={handleSubmit}
        type="submit"
      >
        {' '}
        Save{' '}
      </Button>{' '}
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        onClick={cancelTypes}
      >
        Cancel
      </Button>
    </Container>
  );
};
export default ExpenseTypeForm;
