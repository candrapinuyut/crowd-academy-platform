/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';


// eslint-disable-next-line react/prop-types
function PrivateRoute({ children, isAuthenticated, ...rest }) {
  // eslint-disable-next-line no-unused-vars
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
}

const mapStateToProps = ({ app: { isAuthenticated } }) => {
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
