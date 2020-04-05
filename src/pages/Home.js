import React, { useCallback, useState } from 'react';
import { request } from '../utils/request';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Summary from '../components/Summary';
import './Home.css';
import UserBudget from '../components/UserBudget';

const Home = () => {
  const [refresh, setRefresh] = useState(true);
  const loadExpenses = useCallback(async () => {
    return await request('/api/expenses/expenseCount');
  }, []);

  const loadIncomes = useCallback(async () => {
    return await request('/api/incomes/incomesCount');
  }, []);

  const onRefresh = useCallback(() => {
    setRefresh(false);
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" className="header">
        Dashboard
      </Typography>
      <Typography variant="h8" component="h8" className="header">
        <UserBudget shouldRefresh={refresh} onRefresh={onRefresh} />
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
