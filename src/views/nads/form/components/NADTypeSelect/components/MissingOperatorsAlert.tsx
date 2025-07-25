import React, { FC } from 'react';
import { Trans } from 'react-i18next';

import { Alert, AlertVariant } from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { isEmpty } from '@utils/utils';
import { NetworkTypeKeysType } from '@views/nads/form/utils/types';

type MissingOperatorsAlertProps = { networkTypeItems: Record<NetworkTypeKeysType, string> };

const MissingOperatorsAlert: FC<MissingOperatorsAlertProps> = ({ networkTypeItems }) => {
  const { t } = useNetworkingTranslation();

  if (!isEmpty(networkTypeItems)) return null;

  return (
    <Alert isInline title={t('Missing installed operators')} variant={AlertVariant.warning}>
      <Trans t={t}>
        <strong>OpenShift Virtualization Operator</strong> or{' '}
        <strong>SR-IOV Network Operator </strong>
        needs to be installed on the cluster, in order to pick the Network Type.
      </Trans>
    </Alert>
  );
};

export default MissingOperatorsAlert;
