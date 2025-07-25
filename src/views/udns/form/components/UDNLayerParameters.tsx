import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { isEmpty } from '@utils/utils';

import { TopologyKeys, UserDefinedNetworkFormInput } from '../utils/types';
import { topologyComponentMapper } from '../utils/utils';

const UserDefinedNetworkLayerParameters: FC = () => {
  const { watch } = useFormContext<UserDefinedNetworkFormInput>();
  const topology = watch('topology') as TopologyKeys;
  const LayerComponent = topologyComponentMapper?.[topology];

  if (isEmpty(topology) || isEmpty(LayerComponent)) return null;

  return <LayerComponent />;
};

export default UserDefinedNetworkLayerParameters;
