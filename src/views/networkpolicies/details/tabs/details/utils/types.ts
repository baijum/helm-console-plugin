import { NetworkPolicyPeer } from '@utils/resources/networkpolicies/types';

export type ConsolidatedRow = Omit<NetworkPolicyPeer, 'ipBlock'> & {
  ipBlocks?: IPBlock[];
};

export type IPBlock = {
  cidr: string;
  except?: string[];
};
