import React from 'react';
import PropTypes from 'prop-types';

const TitleSubtitle = ({ title, subtitle }) => {
  return (
    <div>
      <div>{title}</div>
      <small className="text-muted">{subtitle}</small>
    </div>
  );
};

TitleSubtitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default TitleSubtitle;
