import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import checkLogin from '../helpers/checkLogin';

const SecuredRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        checkLogin() ? (
          <React.Fragment>
            <Component />
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default SecuredRoutes;
