import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
// import ProtectedRoutes from './ProtectedRoutes';
import SecuredRoutes from './SecuredRoutes';
import Login from '../views/login';
import token from '../helpers/token';
import ProtectedRoutes from './ProtectedRoutes';
import Register from '../views/register';
import PasswordReset from '../views/passwordReset';
import PasswordForgot from '../views/passwordForgot';

interface Props {}

const RouterPath: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login/:notify?">{token.checkToken() ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register" component={Register}>
          {token.checkToken() ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/resetpassword/:token" component={PasswordReset} />
        <Route path="/forgotpassword" component={PasswordForgot} />
        <SecuredRoutes path="/" component={ProtectedRoutes} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterPath;
