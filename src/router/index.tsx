import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
// import ProtectedRoutes from './ProtectedRoutes';
import SecuredRoutes from './SecuredRoutes';
import Login from '../views/login';
import token from '../helpers/token';
import ProtectedRoutes from './ProtectedRoutes';
import Register from '../views/register';

interface Props {}

const RouterPath: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">{token.checkToken() ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register" component={Register}>
          {token.checkToken() ? <Redirect to="/" /> : <Register />}
        </Route>
        <SecuredRoutes path="/" component={ProtectedRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterPath;
