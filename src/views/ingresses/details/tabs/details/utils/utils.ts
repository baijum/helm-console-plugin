import { IoK8sApiNetworkingV1IngressServiceBackend } from '@kubevirt-ui/kubevirt-api/kubernetes/models';

export const getPort = (service: IoK8sApiNetworkingV1IngressServiceBackend): number | string =>
  service?.port?.number || service?.port?.name;
