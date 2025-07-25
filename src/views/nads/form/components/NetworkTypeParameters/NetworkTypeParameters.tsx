import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { isEmpty } from '@utils/utils';

import { NetworkAttachmentDefinitionFormInput, NetworkTypeKeysType } from '../../utils/types';

import { networkTypeComponentMapper } from './utils/constants';

const NetworkTypeParameters: FC = () => {
  const { watch } = useFormContext<NetworkAttachmentDefinitionFormInput>();
  const networkType = watch('networkType') as NetworkTypeKeysType;
  const ParametersComponent = networkTypeComponentMapper?.[networkType];

  if (isEmpty(networkType) || isEmpty(ParametersComponent)) return null;

  return <ParametersComponent />;
};

export default NetworkTypeParameters;
