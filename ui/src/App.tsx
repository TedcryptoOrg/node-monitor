import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUserStore } from './stores/useUserStore';
import AuthenticatedApp from './components/layout/AuthenticatedApp';
import LoginComponent from './components/Security/LoginComponent';
import { useAutoLogin } from './hooks/useAutoLogin';

function App() {
  const { user, securityTokens } = useUserStore();
  useAutoLogin();

  // Show loading state while checking tokens
  if (securityTokens && !user) {
    return <div>Loading...</div>;
  }

  return (
      <Router>
        {user ? <AuthenticatedApp /> : <LoginComponent />}
      </Router>
  );
}

export default App;