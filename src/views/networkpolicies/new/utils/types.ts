import { EGRESS, INGRESS } from './const';

export type NetworkPolicyPeerType = 'anyNS' | 'ipBlock' | 'sameNS';

export enum NetworkPolicyEgressIngress {
  egress = EGRESS,
  ingress = INGRESS,
}
