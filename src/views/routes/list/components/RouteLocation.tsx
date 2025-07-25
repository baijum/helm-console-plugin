import React, { FC } from 'react';

import { RouteKind } from '@utils/types';
import RouteLinkAndCopy from '@views/routes/list/components/RouteLinkAndCopy';
import { getRouteLabel, isWebRoute } from '@views/routes/list/utils/utils';

type RouteLocationProps = {
  route: RouteKind;
};

const RouteLocation: FC<RouteLocationProps> = ({ route }) => (
  <div className="co-break-word">
    {isWebRoute(route) ? (
      <RouteLinkAndCopy additionalClassName="co-external-link--block" route={route} />
    ) : (
      getRouteLabel(route)
    )}
  </div>
);

export default RouteLocation;
