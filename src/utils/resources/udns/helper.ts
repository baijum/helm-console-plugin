import {
  ClusterUserDefinedNetworkKind,
  UserDefinedNetworkKind,
  UserDefinedNetworkRole,
} from './types';

export const isPrimaryUDN = (udn: ClusterUserDefinedNetworkKind | UserDefinedNetworkKind) =>
  udn?.spec?.layer2?.role === UserDefinedNetworkRole.Primary ||
  udn?.spec?.network?.layer2?.role === UserDefinedNetworkRole.Primary;
