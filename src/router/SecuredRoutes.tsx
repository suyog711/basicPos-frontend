import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import token from '../helpers/token';

const SecuredRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        token.checkToken() ? (
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
