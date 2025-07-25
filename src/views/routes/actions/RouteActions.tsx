import React, { FC } from 'react';

import ActionsDropdown from '@utils/components/ActionsDropdown/ActionsDropdown';
import { RouteKind } from '@utils/types';
import useRouteActions from '@views/routes/actions/hooks/useRouteActions';

type RouteActionsProps = {
  isKebabToggle?: boolean;
  route: RouteKind;
};

const RouteActions: FC<RouteActionsProps> = ({ isKebabToggle, route }) => {
  const [actions] = useRouteActions(route);

  return <ActionsDropdown actions={actions} id="route-actions" isKebabToggle={isKebabToggle} />;
};

export default RouteActions;
