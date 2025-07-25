import { SetFeatureFlag, useK8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { UserDefinedNetworkModelGroupVersionKind } from '@utils/models';
import { isEmpty } from '@utils/utils';

import { FLAG_UDN_ENABLED } from './consts';

export const useUDNEnabledFlag = (setFeatureFlag: SetFeatureFlag) => {
  const [udnModel] = useK8sModel(UserDefinedNetworkModelGroupVersionKind);

  setFeatureFlag(FLAG_UDN_ENABLED, !isEmpty(udnModel));
};
