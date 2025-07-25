import React, { FC, MutableRefObject } from 'react';

import { Popover } from '@patternfly/react-core';
import { isEmpty } from '@utils/utils';

import NetworkPolicyPodsPreview from './components/NetworkPolicyPodsPreview';

type NetworkPolicySelectorPreviewProps = {
  dataTest?: string;
  namespaceSelector?: string[][];
  podSelector: string[][];
  policyNamespace: string;
  popoverRef: MutableRefObject<undefined>;
};

const NetworkPolicySelectorPreview: FC<NetworkPolicySelectorPreviewProps> = ({
  dataTest,
  namespaceSelector,
  podSelector,
  policyNamespace,
  popoverRef,
}) => {
  const allNamespaces = isEmpty(namespaceSelector?.filter((pair) => Boolean(pair?.[0])));

  const AllNamespaceSelector = allNamespaces ? (
    <NetworkPolicyPodsPreview podSelector={podSelector} />
  ) : (
    <NetworkPolicyPodsPreview namespaceSelector={namespaceSelector} podSelector={podSelector} />
  );

  return (
    <Popover
      aria-label="pods-list"
      bodyContent={
        namespaceSelector ? (
          AllNamespaceSelector
        ) : (
          <NetworkPolicyPodsPreview namespace={policyNamespace} podSelector={podSelector} />
        )
      }
      data-test={dataTest ? `${dataTest}-popover` : `pods-preview-popover`}
      position={'bottom'}
      triggerRef={popoverRef}
    />
  );
};

export default NetworkPolicySelectorPreview;
