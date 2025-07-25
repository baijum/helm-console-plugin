import React, { FC } from 'react';

import {
  ListPageBody,
  ListPageFilter,
  ListPageHeader,
  useK8sWatchResources,
  useListPageFilter,
  useModal,
  VirtualizedTable,
} from '@openshift-console/dynamic-plugin-sdk';
import ListEmptyState from '@utils/components/ListEmptyState/ListEmptyState';
import { documentationURLs, getDocumentationURL } from '@utils/constants/documentation';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import {
  ClusterUserDefinedNetworkModelGroupVersionKind,
  UserDefinedNetworkModel,
  UserDefinedNetworkModelGroupVersionKind,
} from '@utils/models';
import { ClusterUserDefinedNetworkKind, UserDefinedNetworkKind } from '@utils/resources/udns/types';

import UDNListCreateButton from './components/UDNListCreateButton';
import UserDefinedNetworkCreateModal from './components/UserDefinedNetworkCreateModal';
import UserDefinedNetworkRow from './components/UserDefinedNetworkRow';
import useUDNColumns from './hooks/useUDNColumns';
import useUDNFilters from './hooks/useUDNFilters';

type UserDefinedNetworksListProps = {
  namespace: string;
};

const UserDefinedNetworksList: FC<UserDefinedNetworksListProps> = ({ namespace }) => {
  const { t } = useNetworkingTranslation();
  const createModal = useModal();
  const resources = useK8sWatchResources({
    ClusterUserDefinedNetwork: {
      groupVersionKind: ClusterUserDefinedNetworkModelGroupVersionKind,
      isList: true,
      namespaced: false,
    },
    UserDefinedNetwork: {
      groupVersionKind: UserDefinedNetworkModelGroupVersionKind,
      isList: true,
      namespace,
      namespaced: true,
    },
  });

  const loaded = Object.values(resources)
    .filter((r) => !r.loadError)
    .every((r) => r.loaded);

  const loadError = resources.UserDefinedNetwork.loadError;
  const allResources: Array<ClusterUserDefinedNetworkKind | UserDefinedNetworkKind> = Object.values(
    resources,
  )
    .map((resource) => resource.data)
    .flat();

  const filters = useUDNFilters();
  const [data, filteredData, onFilterChange] = useListPageFilter(allResources, filters);
  const columns = useUDNColumns();

  const title = t('UserDefinedNetworks');

  return (
    <ListEmptyState<ClusterUserDefinedNetworkKind | UserDefinedNetworkKind>
      createButtonAction={<UDNListCreateButton allUDNs={allResources} namespace={namespace} />}
      data={data}
      error={loadError}
      kind={UserDefinedNetworkModel.kind}
      learnMoreLink={getDocumentationURL(documentationURLs.multipleNetworks)}
      loaded={loaded}
      onCreate={() => createModal(UserDefinedNetworkCreateModal, {})}
      title={title}
    >
      <ListPageHeader title={title}>
        <UDNListCreateButton allUDNs={allResources} namespace={namespace} />
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter
          data={data}
          loaded={loaded}
          onFilterChange={onFilterChange}
          rowFilters={filters}
        />
        <VirtualizedTable<ClusterUserDefinedNetworkKind | UserDefinedNetworkKind>
          columns={columns}
          data={filteredData}
          loaded={loaded}
          loadError={loadError}
          Row={UserDefinedNetworkRow}
          unfilteredData={data}
        />
      </ListPageBody>
    </ListEmptyState>
  );
};

export default UserDefinedNetworksList;
