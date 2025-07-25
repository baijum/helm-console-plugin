import React, { FC } from 'react';

import { Bullseye } from '@patternfly/react-core';

import InlineLoading from './InlineLoading';

import './loading.scss';

const Loading: FC = () => (
  <div className="Loading--main">
    <Bullseye>
      <InlineLoading />
    </Bullseye>
  </div>
);

export default Loading;
