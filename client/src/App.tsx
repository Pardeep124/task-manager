import React from 'react';
import { Toaster } from 'react-hot-toast'
import Layout from './components/layout';
import Dashboard from './screens/dashboard';

const App: React.FC = () => {
  return (
    <Layout>
      <Toaster position="top-right" />
      <Dashboard />
    </Layout>
  );
};

export default App;
