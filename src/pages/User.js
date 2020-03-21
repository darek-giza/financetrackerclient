import React, { useCallback, useEffect, useState } from 'react';
import UserData from '../components/UserData';
import UserExpenseList from '../components/UserExpenseList';
import UserIncomeList from '../components/UserIncomeList';
import { request } from '../utils/request';

export const User = () => {
  const [user, setUser] = useState();
  const [isLoaded, setLoaded] = useState(false);

  const fetchUser = useCallback(async () => {
    const user = await request('http://localhost:8080/api/user');
    setUser(user);
    setLoaded(true);
  }, []);

  useEffect(() => {
    fetchUser();
  }, []);

  if (!isLoaded) {
    return '... is loading';
  }

  return (
    <React.Fragment>
      <UserData user={user} />
      <UserExpenseList user={user} />
      <UserIncomeList user={user} />
    </React.Fragment>
  );
};

export default User;
