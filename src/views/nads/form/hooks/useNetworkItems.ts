import { NetworkTypeKeys, NetworkTypeKeysType, networkTypes } from '../utils/types';

import useNetworkModels from './useNetworkModels';
import useOVNK8sNetwork from './useOVNK8sNetwork';

const useNetworkItems = () => {
  const [hasHyperConvergedCRD, hasSriovNetNodePolicyCRD] = useNetworkModels();
  const [hasOVNK8sNetwork] = useOVNK8sNetwork();

  const types: Record<NetworkTypeKeysType, string> = { ...networkTypes };
  if (!hasSriovNetNodePolicyCRD) {
    delete types[NetworkTypeKeys.sriovNetworkType];
  }

  if (!hasHyperConvergedCRD) {
    delete types[NetworkTypeKeys.cnvBridgeNetworkType];
  }

  if (!hasOVNK8sNetwork) {
    delete types[NetworkTypeKeys.ovnKubernetesNetworkType];
    delete types[NetworkTypeKeys.ovnKubernetesSecondaryLocalnet];
  }

  return types;
};

export default useNetworkItems;
