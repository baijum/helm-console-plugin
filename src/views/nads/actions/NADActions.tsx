import React, { FC } from 'react';

import ActionsDropdown from '@utils/components/ActionsDropdown/ActionsDropdown';
import { NetworkAttachmentDefinitionKind } from '@utils/resources/nads/types';

import useNADsActions from './hooks/useNADsActions';

type NADsActionsProps = {
  obj: NetworkAttachmentDefinitionKind;
};

const NADsActions: FC<NADsActionsProps> = ({ obj }) => {
  const [actions] = useNADsActions(obj);

  return (
    <ActionsDropdown actions={actions} id="network-attachment-definition-actions" isKebabToggle />
  );
};

export default NADsActions;
