import { v4 as uuidv4 } from 'uuid';

import { t } from '@utils/hooks/useNetworkingTranslation';
import { NetworkPolicy, NetworkPolicyPeer, NetworkPolicyRule } from '@utils/models';
import { generateName } from '@utils/utils';

import { NetworkPolicyEgressIngress, NetworkPolicyPeerType } from './types';

export const getInitialPolicy = (ns: string): NetworkPolicy => ({
  egress: {
    denyAll: false,
    rules: [],
  },
  ingress: {
    denyAll: false,
    rules: [],
  },
  name: generateName('policy'),
  namespace: ns,
  podSelector: [['', '']],
});

export const FORM_HELPER_TEXT = t('Create by completing the form.');
export const YAM_HELPER_TEXT = t(
  'Create by manually entering YAML or JSON definitions, or by dragging and dropping a file into the editor.',
);

export const emptyRule = (): NetworkPolicyRule => {
  return {
    key: uuidv4(),
    peers: [],
    ports: [],
  };
};

export const getPeerRuleTitle = (
  direction: NetworkPolicyEgressIngress,
  peer: NetworkPolicyPeer,
) => {
  if (peer.ipBlock) {
    return direction === 'ingress'
      ? t('Allow traffic from peers by IP block')
      : t('Allow traffic to peers by IP block');
  }
  if (peer.namespaceSelector) {
    return direction === 'ingress'
      ? t('Allow traffic from pods inside the cluster')
      : t('Allow traffic to pods inside the cluster');
  }
  return direction === 'ingress'
    ? t('Allow traffic from pods in the same namespace')
    : t('Allow traffic to pods in the same namespace');
};

export const emptyPeer = (type: NetworkPolicyPeerType): NetworkPolicyPeer => {
  const key = uuidv4();
  switch (type) {
    case 'sameNS':
      return {
        key,
        podSelector: [],
      };
    case 'anyNS':
      return {
        key,
        namespaceSelector: [],
        podSelector: [],
      };
    case 'ipBlock':
    default:
      return {
        ipBlock: { cidr: '', except: [] },
        key,
      };
  }
};

export const getHelpTextPodSelector = (direction: string, namespaceSelector: boolean) => {
  if (direction === 'ingress') {
    return namespaceSelector
      ? t(
          'If no pod selector is provided, traffic from all pods in eligible namespaces will be allowed.',
        )
      : t(
          'If no pod selector is provided, traffic from all pods in this namespace will be allowed.',
        );
  }

  return namespaceSelector
    ? t(
        'If no pod selector is provided, traffic to all pods in eligible namespaces will be allowed.',
      )
    : t('If no pod selector is provided, traffic to all pods in this namespace will be allowed.');
};
