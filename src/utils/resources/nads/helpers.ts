import { UDN_LABEL } from './constants';
import { NetworkAttachmentDefinitionKind } from './types';

export const isUserDefinedNetworkNAD = (nad: NetworkAttachmentDefinitionKind) =>
  Object.keys(nad?.metadata?.labels || {})?.includes(UDN_LABEL);
