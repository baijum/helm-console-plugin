import React, { FC } from 'react';

import { Alert, AlertVariant, PageSection } from '@patternfly/react-core';

type NetworkPolicyFormAlertProps = {
  message: string;
  title: string;
};

const NetworkPolicyFormAlert: FC<NetworkPolicyFormAlertProps> = ({ message, title }) => {
  return (
    <PageSection>
      <Alert title={title} variant={AlertVariant.danger}>
        {message}
      </Alert>
    </PageSection>
  );
};

export default NetworkPolicyFormAlert;
