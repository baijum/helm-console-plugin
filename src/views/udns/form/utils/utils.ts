import { FC } from 'react';

import { k8sCreate, ObjectMetadata } from '@openshift-console/dynamic-plugin-sdk';
import { ClusterUserDefinedNetworkModel, UserDefinedNetworkModel } from '@utils/models';
import { getName } from '@utils/resources/shared';
import {
  ClusterUserDefinedNetworkKind,
  UserDefinedNetworkAnnotations,
  UserDefinedNetworkKind,
  UserDefinedNetworkRole,
  UserDefinedNetworkSpec,
} from '@utils/resources/udns/types';
import { isEmpty } from '@utils/utils';

import Layer2Parameters from '../components/UDNLayer2Parameters';
import Layer3Parameters from '../components/UDNLayer3Parameters';

import { TopologyKeys, UserDefinedNetworkFormInput } from './types';

export const topologyComponentMapper: Record<TopologyKeys, FC> = {
  [TopologyKeys.Layer2]: Layer2Parameters,
  [TopologyKeys.Layer3]: Layer3Parameters,
};

export const fromUDNObjToFormData = (
  obj: ClusterUserDefinedNetworkKind | UserDefinedNetworkKind,
): UserDefinedNetworkFormInput => {
  const networkSpec = obj?.spec?.network || obj?.spec;
  return {
    apiVersion: obj?.apiVersion,
    description: obj?.metadata?.annotations?.description,
    kind: obj?.kind,
    name: getName(obj),
    namespaceSelector: obj?.spec?.namespaceSelector,
    topology: Object.keys(TopologyKeys).find((key) => TopologyKeys[key] === networkSpec.topology),
    [TopologyKeys.Layer2]: {
      ...networkSpec.layer2,
      ipamLifecycle: networkSpec.layer2?.ipam?.lifecycle === 'Persistent' ? 'true' : undefined,
      role: UserDefinedNetworkRole[networkSpec.layer2?.role],
    },
    [TopologyKeys.Layer3]: {
      ...networkSpec.layer3,
      role: UserDefinedNetworkRole[networkSpec.layer3?.role],
    },
  };
};

export const fromDataToUDNObj = (
  formData: UserDefinedNetworkFormInput,
  namespace: null | string,
): ClusterUserDefinedNetworkKind | UserDefinedNetworkKind => {
  const { apiVersion, description, kind, Layer2, Layer3, name, namespaceSelector, topology } =
    formData;
  const annotations: UserDefinedNetworkAnnotations = {
    ...(!isEmpty(description) && { description: description }),
  };

  let metadata: ObjectMetadata = {
    annotations,
    name,
  };
  if (namespace !== null) {
    metadata = {
      ...metadata,
      namespace,
    };
  }

  const networkSpec: UserDefinedNetworkSpec = {
    layer2:
      topology === TopologyKeys.Layer2
        ? {
            ...Layer2,
            ipam: Layer2?.ipam?.lifecycle ? { lifecycle: 'Persistent' } : undefined,
            mtu: Layer2.mtu ? Number(Layer2.mtu) : undefined,
          }
        : undefined,
    layer3:
      topology === TopologyKeys.Layer3
        ? {
            ...Layer3,
            mtu: Layer3.mtu ? Number(Layer3.mtu) : undefined,
          }
        : undefined,
    topology: TopologyKeys[topology],
  };

  return {
    apiVersion,
    kind,
    metadata,
    spec:
      namespace === null
        ? {
            namespaceSelector,
            network: networkSpec,
          }
        : networkSpec,
  };
};

export const createUDN = (formData: UserDefinedNetworkFormInput, namespace: null | string) =>
  k8sCreate({
    data: fromDataToUDNObj(formData, namespace),
    model: namespace === null ? ClusterUserDefinedNetworkModel : UserDefinedNetworkModel,
  });
