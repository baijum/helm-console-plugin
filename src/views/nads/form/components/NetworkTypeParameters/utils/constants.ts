import { FC } from 'react';

import { NetworkTypeKeys, NetworkTypeKeysType } from '@views/nads/form/utils/types';

import BridgeParameters from '../components/BridgeParameters/BridgeParameters';
// import Layer2Parameters from '../components/Layer2Parameters/Layer2Parameters';
import SecondaryLocalnetParameters from '../components/OVNK8sSecondaryLocalnetParameters/OVNK8sSecondaryLocalnetParameters';
import SriovParameters from '../components/SriovParameters/SriovParameters';

export const networkTypeComponentMapper: Record<NetworkTypeKeysType, FC> = {
  [NetworkTypeKeys.cnvBridgeNetworkType]: BridgeParameters,
  [NetworkTypeKeys.ovnKubernetesNetworkType]: null, //Layer2Parameters revert subnets to 4.18
  [NetworkTypeKeys.ovnKubernetesSecondaryLocalnet]: SecondaryLocalnetParameters,
  [NetworkTypeKeys.sriovNetworkType]: SriovParameters,
};
