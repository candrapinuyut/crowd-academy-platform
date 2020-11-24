/* eslint-disable no-shadow */
/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import LoginPage from '../LoginPage';
import NotFoundPage from '../NotFoundPage';

import 'bootstrap';
import AppWrapper from './AppWrapper';
import PrivateRoute from '../../components/PrivateRoute';
import { toast } from 'react-toastify';
import HomePage from './../HomePage'
import ProfilePage from './../ProfilePage'
import KelasPage from './../KelasPage'
import ArtikelPage from './../ArtikelPage'
import ArtikelDetail from './../ArtikelPage/detail.js'
import RegisterPage from './../RegisterPage'
import RegisterDonePage from './../RegisterPage/DonePage'

import ArtikelManajemenPage from './../ArtikelPage/router.js'

function App({ isAuthenticated, getDeliveryOptions ,app}) {
  useEffect(() => {
    //localStorage.removeItem('AUTHORIZATION');
    console.log('auth = '+isAuthenticated)
  }, []);
  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - BANK CROWD ACADEMY"
        defaultTitle="BANK CROWD ACADEMY">
        <meta name="description" content="BANK CROWD ACADEMY" />
      </Helmet>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route  path="/register" exact component={RegisterPage}/>
        <Route  path="/register/donepage" component={RegisterDonePage}/>
        <PrivateRoute path="/dashboard" component={HomePage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/kelas" component={KelasPage} />
        <PrivateRoute path="/artikel/detail/:id" component={ArtikelDetail} />
        <PrivateRoute path="/artikel" component={ArtikelPage} />
        <PrivateRoute path="/manajemen-artikel" component={ArtikelManajemenPage} />

        <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/dashboard" /> : <LoginPage level={0} />}
        </Route>

        <Route component={NotFoundPage} />
      </Switch>
    </AppWrapper>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  getDeliveryOptions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => app;
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps,[])(App);
