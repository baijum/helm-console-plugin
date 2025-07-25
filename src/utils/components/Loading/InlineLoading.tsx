import React, { FC } from 'react';

const InlineLoading: FC = () => (
  <div className="co-m-loader co-an-fade-in-out" data-test="loading-indicator">
    <div className="co-m-loader-dot__one" />
    <div className="co-m-loader-dot__two" />
    <div className="co-m-loader-dot__three" />
  </div>
);

export default InlineLoading;
