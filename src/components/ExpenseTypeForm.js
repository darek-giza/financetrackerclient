import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StickyFooter from '../components/StickyFooter';
import { request } from '../utils/request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Dashboard from '../components/Dashboard';

export const ExpenseTypeForm = ({ onAdd }) => {
  const [types, setTypes] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
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
    <Grid item xs={1} sm={3}>
      <Paper>
        <Container maxWidth="sm">
          <form
            noValidate
            autoComplete="off"
            id="create-type-form"
            onSubmit={handleSubmit}
          >
            <div>
              <h4>Add a new type ...</h4>
            </div>
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
            Save
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
      </Paper>
    </Grid>
  );
};
export default ExpenseTypeForm;
