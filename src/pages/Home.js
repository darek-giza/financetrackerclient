import React, { useCallback } from 'react';
import { request } from '../utils/request';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Summary from '../components/Summary';
import './Home.css';

const Home = () => {
  const loadExpenses = useCallback(async () => {
    return await request('/api/expenses/expenseCount');
  }, []);

  const loadIncomes = useCallback(async () => {
    return await request('/api/incomes/incomesCount');
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" className="header">
        Dashboard
      </Typography>
      <Typography variant="h4" component="h2" className="header">
        Expenses
      </Typography>
      <Summary loadData={loadExpenses} avatarClassName="badge-orange" />
      <Typography variant="h4" component="h2" className="header">
        Incomes
      </Typography>
      <Summary loadData={loadIncomes} avatarClassName="badge-green" />
    </Container>
  );
};
export default Home;
