/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const CustomLink = ({ history, to, onClick, as: Tag, ...rest }) => (
  <Tag
    {...rest}
    onClick={(event) => {
      onClick(event);
      history.push(to);
    }}
  />
);

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

CustomLink.defaultProps = {
  onClick: () => {},
};

export default withRouter(CustomLink);
