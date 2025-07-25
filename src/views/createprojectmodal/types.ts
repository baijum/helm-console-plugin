import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { ClusterUserDefinedNetworkKind, UserDefinedNetworkKind } from '@utils/resources/udns/types';

export enum NETWORK_TYPE {
  POD_NETWORK,
  UDN,
  CLUSTER_UDN,
}

export type CreateProjectModalFormState = {
  clusterUDN?: ClusterUserDefinedNetworkKind;
  networkType: NETWORK_TYPE;
  project: K8sResourceCommon & {
    description: string;
    displayName: string;
    metadata: {
      name: string;
    };
  };
  udn: UserDefinedNetworkKind;
};
