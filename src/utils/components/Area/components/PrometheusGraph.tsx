import React, { FC, forwardRef, Ref, RefObject } from 'react';
import classNames from 'classnames';

import { Title } from '@patternfly/react-core';

type PrometheusGraphProps = {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  title?: string;
};

const PrometheusGraph: FC<PrometheusGraphProps> = forwardRef(
  ({ children, className, title }, ref: RefObject<HTMLDivElement>) => (
    <div className={classNames('graph-wrapper graph-wrapper__horizontal-bar', className)} ref={ref}>
      {title && (
        <Title className="graph-title" headingLevel="h5">
          {title}
        </Title>
      )}
      {children}
    </div>
  ),
);

export default PrometheusGraph;
