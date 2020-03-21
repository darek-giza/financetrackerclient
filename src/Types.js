import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StickyFooter from './StickyFooter';
import { request } from './request';
import TextField from '@material-ui/core/TextField';
import { Button, Container } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Dashboard from "./Dashboard/Dashboard";


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(10),
      width: 200,
    },
    flexGrow: 100,
  },
  button: {
    margin: theme.spacing(0),
  },
  cont: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const Types = (props) => {
  const {classes} = props;
  const [types, setTypes] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [description, setDescription] = useState('');

  const fetchTypes = useCallback(async () => {
    const types = await request('http://localhost:8080/api/type');
    setTypes(types);
    setLoaded(true);
  }, []);

  const cancelTypes = useCallback(() => {
    document.getElementById('create-type-form').reset();
  }, []);

  const handleSubmit = useCallback(async (event) => {
    try {
      event.preventDefault();
      await request('http://localhost:8080/api/type', {
        method: 'POST',
        body: JSON.stringify({description}),
      });
      fetchTypes();
      cancelTypes();
    } catch (error) {
      console.log('Adding type failed', error);
    }
  }, [description]);

  const handleChange = useCallback((event) => {
    setDescription(event.target.value)
  }, []);


  useEffect(() => {
    fetchTypes();
  }, []);

  if (isLoaded !== true) {
    return "... is loading"
  }
  return (
    <React.Fragment>
      {/*<MenuAppBar/>*/}
      <Dashboard />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
              <Container className={classes.cont} maxWidth="sm">
                <form
                  className={classes.root}
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
                  className={classes.button}
                  onClick={handleSubmit}
                  type="submit"
                >
                  Save
                </Button>{' '}
                <Button
                  color="secondary"
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={cancelTypes}
                >
                  Cancel
                </Button>
              </Container>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <h4>All types of expenses you have</h4>
            <Paper className={classes.paper}>
              <div className={classes.chip}>
                <Chip
                  variant="outlined"
                  color="secondary"
                  size="small"
                  label="Expenses types"
                />
                {types.map(type => {
                  return (
                    <Chip
                      variant="outlined"
                      size="small"
                      icon={<FaceIcon/>}
                      label={type.description}
                      clickable
                      color="primary"
                      deleteIcon={<DoneIcon/>}
                    />
                  );
                })}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <StickyFooter/>
    </React.Fragment>

  );
};
export default withStyles(useStyles)(Types)
