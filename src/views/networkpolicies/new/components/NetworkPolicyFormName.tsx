import React, { ChangeEvent, FC } from 'react';

import { TextInput } from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { NetworkPolicy } from '@utils/models';

type NetworkPolicyFormNameProps = {
  networkPolicy: NetworkPolicy;
  onPolicyChange: (policy: NetworkPolicy) => void;
};

const NetworkPolicyFormName: FC<NetworkPolicyFormNameProps> = ({
  networkPolicy,
  onPolicyChange,
}) => {
  const { t } = useNetworkingTranslation();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    onPolicyChange({ ...networkPolicy, name: event.currentTarget.value });

  return (
    <div className="form-group co-create-networkpolicy__name">
      <label className="co-required" htmlFor="name">
        {t('Policy name')}
      </label>
      <TextInput
        id="name"
        name="name"
        onChange={handleNameChange}
        placeholder="my-policy"
        required
        value={networkPolicy.name}
      />
    </div>
  );
};

export default NetworkPolicyFormName;
