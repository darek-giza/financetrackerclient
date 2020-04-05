import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TimelineIcon from '@material-ui/icons/Timeline';
import './ListItems.css';

export const MainList = () => {
  const items = [{
    text: 'Home',
    link: '/',
    Icon: DashboardIcon,
  }, {
    text: 'Expenses',
    link: '/expenses',
    Icon: ShoppingCartIcon,
  }, {
    text: 'Incomes',
    link: '/incomes',
    Icon: MonetizationOnIcon,
  }, {
    text: 'Expense types',
    link: '/type',
    Icon: BarChartIcon,
  },
    {
      text: 'Chart yearly',
      link: '/chart',
      Icon: TimelineIcon,
    }];

  return (
    <List>
      {items.map(({text, link, Icon}) => (
        <Link to={link} className="navigation-link">
          <ListItem button className="navigation-list-item">
            <ListItemIcon>
              <Icon className="navigation-link-icon"/>
            </ListItemIcon>
            <ListItemText primary={text} className="navigation-link-text"/>
          </ListItem>
        </Link>
      ))}
    </List>
  )
};

export const SecondaryList = () => {
  const onLogoutClick = useCallback(() => {
    localStorage.removeItem('token');
    window.location.replace('/signin')
  }, []);

  const items = [{
    text: 'Current month',
    Icon: AssignmentIcon
  }, {
    text: 'Last quarter',
    Icon: AssignmentIcon
  }, {
    text: 'Year-end sale',
    Icon: AssignmentIcon
  }, {
    text: 'Logout',
    onClick: onLogoutClick,
    Icon: LockOpenIcon
  }];

  return (
    <List>
      <ListSubheader inset>Saved reports</ListSubheader>
      {items.map(({text, onClick, Icon}) => (
        <ListItem button className="navigation-list-item" onClick={onClick}>
          <ListItemIcon>
            <Icon className="navigation-link-icon"/>
          </ListItemIcon>
          <ListItemText primary={text} className="navigation-link-text"/>
        </ListItem>
      ))}
    </List>
  )
};