import React, { FC, useRef } from 'react';
import { Trans } from 'react-i18next';

import { Button, ButtonVariant } from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import NetworkPolicySelectorPreview from './components/NetworkPolicySelectorPreview/NetworkPolicySelectorPreview';
import { NetworkPolicyEgressIngress } from './utils/types';
import { getHelpTextPodSelector } from './utils/utils';
import NetworkPolicyConditionalSelector from './NetworkPolicyConditionalSelector';

type NetworkPolicyPeerSelectorsProps = {
  direction: NetworkPolicyEgressIngress;
  namespaceSelector?: string[][];
  onChange: (podSelector: string[][], namespaceSelector?: string[][]) => void;
  podSelector: string[][];
  policyNamespace: string;
};

const NetworkPolicyPeerSelectors: FC<NetworkPolicyPeerSelectorsProps> = ({
  direction,
  namespaceSelector,
  onChange,
  podSelector,
  policyNamespace,
}) => {
  const { t } = useNetworkingTranslation();

  const handlePodSelectorChange = (updated: string[][]) => {
    onChange(updated, namespaceSelector);
  };

  const handleNamespaceSelectorChange = (updated: string[][]) => {
    onChange(podSelector, updated);
  };
  const podsPreviewPopoverRef = useRef();

  return (
    <>
      {namespaceSelector && (
        <div className="form-group">
          <NetworkPolicyConditionalSelector
            dataTest="peer-namespace-selector"
            helpText={t(
              'If no namespace selector is provided, pods from all namespaces will be eligible.',
            )}
            onChange={handleNamespaceSelectorChange}
            selectorType="namespace"
            values={namespaceSelector}
          />
        </div>
      )}
      <div className="form-group">
        <NetworkPolicyConditionalSelector
          dataTest="peer-pod-selector"
          helpText={getHelpTextPodSelector(direction, !!namespaceSelector)}
          onChange={handlePodSelectorChange}
          selectorType="pod"
          values={podSelector || []}
        />
      </div>
      <p>
        {direction === 'ingress' ? (
          <Trans t={t}>
            Show a preview of the{' '}
            <Button
              data-test="show-affected-pods-ingress"
              isInline
              ref={podsPreviewPopoverRef}
              variant={ButtonVariant.link}
            >
              affected pods
            </Button>{' '}
            that this ingress rule will apply to.
          </Trans>
        ) : (
          <Trans t={t}>
            Show a preview of the{' '}
            <Button
              data-test="show-affected-pods-egress"
              isInline
              ref={podsPreviewPopoverRef}
              variant={ButtonVariant.link}
            >
              affected pods
            </Button>{' '}
            that this egress rule will apply to.
          </Trans>
        )}
      </p>
      <NetworkPolicySelectorPreview
        dataTest={`pods-preview-${direction}`}
        namespaceSelector={namespaceSelector}
        podSelector={podSelector}
        policyNamespace={policyNamespace}
        popoverRef={podsPreviewPopoverRef}
      />
    </>
  );
};

export default NetworkPolicyPeerSelectors;
