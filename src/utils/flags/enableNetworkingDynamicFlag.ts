import { SetFeatureFlag } from '@openshift-console/dynamic-plugin-sdk';

import { FLAG_NET_ATTACH_DEF } from './consts';

export const enableNetworkingDynamicFlag = (setFeatureFlag: SetFeatureFlag) =>
  setFeatureFlag(FLAG_NET_ATTACH_DEF, true);
