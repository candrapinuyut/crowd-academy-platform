import React from 'react';
import ContentLoader from 'react-content-loader';

export default () => (
  <ContentLoader speed={2} width="100%" height={50}>
    <rect x="0" y="8" rx="3" ry="3" width="88" height="6" />
    <rect x="0" y="26" rx="3" ry="3" width="52" height="6" />
  </ContentLoader>
);
