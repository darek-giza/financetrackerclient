import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ButtonGroup } from '@material-ui/core';

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
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Finance Tracker
          </Typography>
          <div className={classes.menuButton}>
            <ButtonGroup color="inherit" variant="outlined" size="small">
              <Button href="/user">User</Button>
              <Button href="/incomes">Incomes</Button>
              <Button href="/expenses">Expenses</Button>
              <Button href="/type">Expenses type</Button>
              <Button href="/logout">Logout</Button>
            </ButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
