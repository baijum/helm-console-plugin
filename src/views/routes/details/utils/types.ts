import { K8sResourceCondition } from '@openshift-console/dynamic-plugin-sdk';

export type IngressStatusProps = {
  conditions: K8sResourceCondition[];
  host: string;
  routerCanonicalHostname: string;
  routerName: string;
  wildcardPolicy: string;
};

export type ClusterServiceVersionCondition = {
  lastTransitionTime?: string;
  message?: string;
  phase: string;
  reason?: string;
};

/**
 * Since ClusterServiceVersionCondition type is different from K8sResourceCondition,
 * but InstallPlanCondition and SubscriptionCondition are identical, we will use the
 * following enum to render the proper conditions table based on type.
 */
export enum ConditionTypes {
  ClusterServiceVersion = 'ClusterServiceVersion',
  K8sResource = 'K8sResource',
}
