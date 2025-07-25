import { NetworkPolicyPeer } from '@utils/resources/networkpolicies/types';

import { ConsolidatedRow } from './types';

export const consolidatePeers = (peers?: NetworkPolicyPeer[]): ConsolidatedRow[] => {
  // Consolidate peers as one row per peer, except ipblock peers which are merged into a single row
  if (!peers) {
    return [{}]; // stands for "any peer"
  }
  const ipBlocks = peers.filter((p) => !!p.ipBlock).map((p) => p.ipBlock);
  const consolidated = peers.filter((p) => !p.ipBlock) as ConsolidatedRow[];
  if (ipBlocks.length > 0) {
    consolidated.push({ ipBlocks });
  }
  return consolidated;
};
