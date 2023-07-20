import React from 'react';
import AppRouter from './routes';
import UserProvider from './context/user/provider';

export const App: React.FC = () => (
  <UserProvider>
    <AppRouter />
  </UserProvider>
);
