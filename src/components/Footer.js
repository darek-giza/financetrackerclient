import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import './Footer.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit">Dariusz Giza</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <Container maxWidth="sm">
          <Typography variant="body1">Finance tracker</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
