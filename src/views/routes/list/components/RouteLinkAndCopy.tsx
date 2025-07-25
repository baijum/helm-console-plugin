import React, { FC } from 'react';

import { ExternalLinkWithCopy } from '@utils/components/ExternalLinkWithCopy/ExternalLinkWithCopy';
import { RouteKind } from '@utils/types';
import { getRouteWebURL } from '@views/routes/list/utils/utils';

type RouteLinkAndCopyProps = {
  additionalClassName: string;
  route: RouteKind;
};

const RouteLinkAndCopy: FC<RouteLinkAndCopyProps> = ({ additionalClassName, route }) => {
  const link = getRouteWebURL(route);

  return (
    <ExternalLinkWithCopy
      additionalClassName={additionalClassName}
      dataTestID="route-link"
      link={link}
      text={link}
    />
  );
};

export default RouteLinkAndCopy;
