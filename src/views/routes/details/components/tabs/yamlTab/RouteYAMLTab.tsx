import React, { FC, Suspense } from 'react';

import { ResourceYAMLEditor } from '@openshift-console/dynamic-plugin-sdk';
import Loading from '@utils/components/Loading/Loading';
import { RouteKind } from '@utils/types';

type RouteYAMLTabProps = {
  obj: RouteKind;
};

const RouteYAMLTab: FC<RouteYAMLTabProps> = ({ obj: route }) => {
  if (!route) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ResourceYAMLEditor initialResource={route} />
    </Suspense>
  );
};

export default RouteYAMLTab;
