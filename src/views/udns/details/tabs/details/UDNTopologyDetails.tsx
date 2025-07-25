import React, { FC } from 'react';

import { DetailsItemComponentProps } from '@openshift-console/dynamic-plugin-sdk';
import MutedText from '@utils/components/MutedText/MutedText';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { getTopology } from '@utils/resources/udns/selectors';
import { ClusterUserDefinedNetworkKind, UserDefinedNetworkKind } from '@utils/resources/udns/types';

const UDNTopologyDetails: FC<
  DetailsItemComponentProps<ClusterUserDefinedNetworkKind | UserDefinedNetworkKind>
> = ({ obj }) => {
  const { t } = useNetworkingTranslation();
  const topology = getTopology(obj);

  if (!topology) return <MutedText content={t('Not available')} />;

  return <div>{topology}</div>;
};

export default UDNTopologyDetails;
