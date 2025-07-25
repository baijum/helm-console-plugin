import { Selector } from '@openshift-console/dynamic-plugin-sdk';

export type NetworkPolicyPeer = {
  ipBlock?: {
    cidr: string;
    except?: string[];
  };
  namespaceSelector?: Selector;
  podSelector?: Selector;
};

export type NetworkPolicyPort = {
  port?: number | string;
  protocol?: string;
};
