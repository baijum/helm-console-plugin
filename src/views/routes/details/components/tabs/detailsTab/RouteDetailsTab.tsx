import React, { FC } from 'react';

import { RouteKind } from '@utils/types';
import { isEmpty } from '@utils/utils';
import NoRouteStatus from '@views/routes/details/components/tabs/detailsTab/components/NoRouteStatus';
import IngressStatusSection from '@views/routes/details/components/tabs/detailsTab/components/RouteIngressStatusSection/IngressStatusSection';
import TrafficSection from '@views/routes/details/components/tabs/detailsTab/components/TrafficSection/TrafficSection';

import RouteDetailsSection from './components/RouteDetailsSection/RouteDetailsSection';
import TLSSettingsSection from './components/TLSSettingsSection/TLSSettingsSection';

type RouteDetailsTabProps = {
  obj: RouteKind;
};

const RouteDetailsTab: FC<RouteDetailsTabProps> = ({ obj: route }) => (
  <>
    <RouteDetailsSection route={route} />
    <TLSSettingsSection route={route} />
    {!isEmpty(route?.spec?.alternateBackends) && <TrafficSection route={route} />}
    {isEmpty(route?.status?.ingress) ? <NoRouteStatus /> : <IngressStatusSection route={route} />}
  </>
);

export default RouteDetailsTab;
