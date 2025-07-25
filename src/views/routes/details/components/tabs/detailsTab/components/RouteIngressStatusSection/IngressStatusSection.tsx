import React, { FC } from 'react';

import { PageSection } from '@patternfly/react-core';
import { RouteIngress, RouteKind } from '@utils/types';
import IngressStatus from '@views/routes/details/components/tabs/detailsTab/components/RouteIngressStatusSection/IngressStatus';

type IngressStatusSectionProps = {
  route: RouteKind;
};

const IngressStatusSection: FC<IngressStatusSectionProps> = ({ route }) => {
  return (
    <PageSection>
      {route?.status?.ingress.map((ingress: RouteIngress) => (
        <IngressStatus ingress={ingress} key={ingress.routerName} route={route} />
      ))}
    </PageSection>
  );
};

export default IngressStatusSection;
