import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Spinner.css';

export const Spinner = ({ type }) => (
  <Container className="spinner-container">
    <CircularProgress color="secondary" />
  </Container>
);

export default Spinner;
