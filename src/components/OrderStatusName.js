// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OrderStatusName = ({ name, tabs }) => {
  const findStatus = _.find(tabs, { key: name });
  if (!findStatus) {
    return '-';
  }

  return findStatus.title;
};

OrderStatusName.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  tabs: PropTypes.array.isRequired,
};

const mapStateToProps = ({ order: { tabs } }) => ({
  tabs,
});

export default connect(mapStateToProps)(OrderStatusName);
