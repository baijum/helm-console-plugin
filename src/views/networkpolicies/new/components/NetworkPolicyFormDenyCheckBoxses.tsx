import React, { FC, ReactEventHandler } from 'react';

import { Checkbox, FormGroup } from '@patternfly/react-core';
import { ClusterNetworkFeatures } from '@utils/hooks/useClusterNetworkFeatures';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { NetworkPolicy } from '@utils/models';

type NetworkPolicyFormDenyCheckBoxsesProps = {
  networkFeatures: ClusterNetworkFeatures;
  networkFeaturesLoaded: boolean;
  networkPolicy: NetworkPolicy;
  onPolicyChange: (policy: NetworkPolicy) => void;
};

const NetworkPolicyFormDenyCheckBoxses: FC<NetworkPolicyFormDenyCheckBoxsesProps> = ({
  networkFeatures,
  networkFeaturesLoaded,
  networkPolicy,
  onPolicyChange,
}) => {
  const { t } = useNetworkingTranslation();

  const handleDenyAllIngress: ReactEventHandler<HTMLInputElement> = (event) =>
    onPolicyChange({
      ...networkPolicy,
      ingress: {
        ...networkPolicy.ingress,
        denyAll: event.currentTarget.checked,
      },
    });

  const handleDenyAllEgress: ReactEventHandler<HTMLInputElement> = (event) =>
    onPolicyChange({
      ...networkPolicy,
      egress: { ...networkPolicy.egress, denyAll: event.currentTarget.checked },
    });

  return (
    <FormGroup isInline label={t('Select default ingress and egress deny rules')} role="group">
      <Checkbox
        id="denyAllIngress"
        isChecked={networkPolicy.ingress.denyAll}
        label={t('Deny all ingress traffic')}
        name="denyAllIngress"
        onChange={handleDenyAllIngress}
      />
      {networkFeaturesLoaded && networkFeatures.PolicyEgress !== false && (
        <Checkbox
          id="denyAllEgress"
          isChecked={networkPolicy.egress.denyAll}
          label={t('Deny all egress traffic')}
          name="denyAllEgress"
          onChange={handleDenyAllEgress}
        />
      )}
    </FormGroup>
  );
};

export default NetworkPolicyFormDenyCheckBoxses;
