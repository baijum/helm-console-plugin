import { GroupVersionKind, OwnerReference } from '@openshift-console/dynamic-plugin-sdk';

export const groupVersionFor = (apiVersion: string) => ({
  group: apiVersion.split('/').length === 2 ? apiVersion.split('/')[0] : 'core',
  version: apiVersion.split('/').length === 2 ? apiVersion.split('/')[1] : apiVersion,
});

export const referenceForOwnerRef = (ownerRef: OwnerReference): GroupVersionKind =>
  `${groupVersionFor(ownerRef.apiVersion).group}~${groupVersionFor(ownerRef.apiVersion).version}~${
    ownerRef.kind
  }`;
