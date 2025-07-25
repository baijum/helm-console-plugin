import { UserDefinedNetworkModel } from '@utils/models';

export const UserDefinedNetworksYAMLTemplates = `
apiVersion: ${UserDefinedNetworkModel.apiGroup}/${UserDefinedNetworkModel.apiVersion}
kind: ${UserDefinedNetworkModel.kind}
metadata:
  name: udn-1
  namespace: <some_custom_namespace>
spec:
  topology: Layer2 
  layer2: 
    role: Primary 
    subnets:
      - "10.0.0.0/24"
      - "2001:db8::/60" 
`;

export const ClusterUserDefinedNetworksYAMLTemplates = `
apiVersion: k8s.ovn.org/v1
kind: ClusterUserDefinedNetwork
metadata:
  name: cudn-1
spec:
  namespaceSelector:
    matchLabels: 
      "test.io": "mynetwork"
  network:
    topology: Layer2
    layer2:
      role: Secondary
      subnets: 
        - "10.100.0.0/16"
`;
