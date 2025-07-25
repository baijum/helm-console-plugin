import React, { FC } from 'react';

import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { NetworkPolicyPort } from '@utils/resources/networkpolicies/types';

type NetworkPolicyDetailsRowIPProps = { port: NetworkPolicyPort };

const NetworkPolicyDetailsRowIP: FC<NetworkPolicyDetailsRowIPProps> = ({ port }) => {
  const { t } = useNetworkingTranslation();

  const val = `${port?.protocol}/${port?.port}`;

  return port ? <p key={val}>{val}</p> : <div>{t('Any port')}</div>;
};

export default NetworkPolicyDetailsRowIP;
