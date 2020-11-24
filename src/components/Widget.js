import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  min-height: 400px;
  background: white;
`;

const Widget = ({ children, show, onClose }) => {
  if (!show) {
    return null;
  }

  return <Container>{children}</Container>;
};

export default Widget;
