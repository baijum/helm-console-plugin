import React, { FC, ReactNode } from 'react';
import Linkify from 'react-linkify';

type LinkifyExternalProps = {
  children: ReactNode;
};

const LinkifyExternal: FC<LinkifyExternalProps> = ({ children }) => (
  <Linkify properties={{ rel: 'noopener noreferrer', target: '_blank' }}>{children}</Linkify>
);

export default LinkifyExternal;
