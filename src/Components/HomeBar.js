import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ButtonGroup } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { dark } from '@material-ui/core/styles/createPalette';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(10),
  },
  title: {
    flexGrow: 1,

  },
}));

export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Finance Tracker
          </Typography>
              <ButtonGroup className={classes.menuButton} color="inherit" variant="outlined" size="small">
                    <Button href='/signin' >Sign in</Button>
                    <Button href='/signup'>Sign up</Button>
              </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}