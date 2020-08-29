import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
// import ProtectedRoutes from './ProtectedRoutes';
import SecuredRoutes from './SecuredRoutes';
import Login from '../views/login';
import checkLogin from '../helpers/checkLogin';
import ProtectedRoutes from './ProtectedRoutes';
import Register from '../views/register';

interface Props {}

const RouterPath: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">{checkLogin() ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register" component={Register}>
          {checkLogin() ? <Redirect to="/" /> : <Register />}
        </Route>
        <SecuredRoutes path="/" component={ProtectedRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterPath;
