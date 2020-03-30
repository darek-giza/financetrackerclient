import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Spinner from './Spinner';

const Circle = ({ value, header, isLoading, avatarClassName }) => (
  <Grid item>
    <Typography variant="h5" component="h1" className="header">
      {header}
    </Typography>
    <Paper className="block">
      <Avatar className={`badge ${avatarClassName}`}>
        {isLoading ? <Spinner type="table" /> : `$${value || ' - '}`}
      </Avatar>
    </Paper>
  </Grid>
);

export default Circle;
