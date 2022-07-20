import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import DashBoard from './pages/dashboard';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import PrivateRoute from './shared/privateRoute';

function IfLogin() {
  return <Navigate to="/" />;
}

function RouterList() {
  const token = localStorage.getItem('token')

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={token ? <IfLogin /> : <SignIn />}
        />
        <Route
          exact
          path="/signUp"
          element={<SignUp />}
        />
        <Route
          exact
          path="/signIn"
          element={<SignIn />}
        />
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path="/dashboard"
            element={<DashBoard />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouterList;
