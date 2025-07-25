import React, { FC } from 'react';

import { Selector as K8sSelector } from '@openshift-console/dynamic-plugin-sdk';
import { Td, Tr } from '@patternfly/react-table';
import { NetworkPolicyPort } from '@utils/resources/networkpolicies/types';

import { ConsolidatedRow } from '../../utils/types';

import NetworkPolicyDetailsRowIP from './NetworkPolicyDetailsRowIP';
import NetworkPolicyDetailsRowPodSelector from './NetworkPolicyDetailsRowPodSelector';
import NetworkPolicyDetailsRowSelector from './NetworkPolicyDetailsRowSelector';

type NetworkPolicyDetailsRowProps = {
  mainPodSelector: K8sSelector;
  namespace: string;
  ports: NetworkPolicyPort[];
  row: ConsolidatedRow;
};

const NetworkPolicyDetailsRow: FC<NetworkPolicyDetailsRowProps> = ({
  mainPodSelector,
  namespace,
  ports,
  row,
}) => {
  return (
    <Tr>
      <Td>
        <NetworkPolicyDetailsRowPodSelector
          mainPodSelector={mainPodSelector}
          namespace={namespace}
        />
      </Td>
      <Td>
        <NetworkPolicyDetailsRowSelector namespace={namespace} row={row} />
      </Td>
      <Td>
        {(ports || []).map((port) => (
          <NetworkPolicyDetailsRowIP key={port.port} port={port} />
        ))}
      </Td>
    </Tr>
  );
};

export default NetworkPolicyDetailsRow;
