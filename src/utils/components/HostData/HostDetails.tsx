import React, { FC } from 'react';

type HostDetailsProps = {
  children: (number | string)[] | number | string;
  title?: string;
};

const HostDetails: FC<HostDetailsProps> = ({ children, title }) => (
  <div className="co-truncate co-select-to-copy" title={title}>
    {children}
  </div>
);

export default HostDetails;
