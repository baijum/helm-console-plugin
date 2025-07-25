import React, { FC } from 'react';

import { BlueInfoCircleIcon } from '@openshift-console/dynamic-plugin-sdk';
import { Tooltip } from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { isEmpty } from '@utils/utils';

import { IPBlock } from '../../utils/types';

type NetworkPolicyDetailsRowIPBlocksProps = { ipBlock: IPBlock };

const NetworkPolicyDetailsRowIPBlocks: FC<NetworkPolicyDetailsRowIPBlocksProps> = ({ ipBlock }) => {
  const { t } = useNetworkingTranslation();
  const { cidr, except } = ipBlock || {};

  return (
    <div>
      {cidr}
      {!isEmpty(except) && (
        <Tooltip
          content={
            <div>
              {t('Exceptions')}
              {': '}
              {except.join(', ')}
            </div>
          }
        >
          <span>
            {` (${t('with exceptions')}) `}
            <BlueInfoCircleIcon />
          </span>
        </Tooltip>
      )}
    </div>
  );
};

export default NetworkPolicyDetailsRowIPBlocks;
