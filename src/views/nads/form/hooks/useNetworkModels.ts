import { SriovNetworkNodePolicyModelRef } from '@kubevirt-ui/kubevirt-api/console';
import { HyperConvergedModelRef } from '@kubevirt-ui/kubevirt-api/console/models/HyperConvergedModel';
import { useK8sModels } from '@openshift-console/dynamic-plugin-sdk';

const useNetworkModels = (): [hasHyperConvergedCRD: boolean, hasSriovNetNodePolicyCRD: boolean] => {
  const [models] = useK8sModels();

  const hasHyperConvergedCRD = !!models?.[HyperConvergedModelRef];

  const hasSriovNetNodePolicyCRD = !!models?.[SriovNetworkNodePolicyModelRef];
  return [hasHyperConvergedCRD, hasSriovNetNodePolicyCRD];
};
export default useNetworkModels;
