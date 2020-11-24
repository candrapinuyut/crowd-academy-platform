/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { setTitle } from '../containers/App/action';

const SetTitle = ({ setTitle, children }) => {
  const location = useLocation();

  useEffect(() => {
    setTitle(children);
  }, [location, setTitle, children]);

  return <Helmet title={children} />;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setTitle }, dispatch);

export default connect(null, mapDispatchToProps)(SetTitle);
