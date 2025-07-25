import React, { FC } from 'react';

import MutedText from '@utils/components/MutedText/MutedText';
import { Selector } from '@utils/components/Selector/Selector';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import { isEmpty } from '@utils/utils';

import { ConsolidatedRow } from '../../utils/types';

import NetworkPolicyDetailsRowIPBlocks from './NetworkPolicyDetailsRowIPBlocks';

type NetworkPolicyDetailsRowSelectorProps = {
  namespace: string;
  row: ConsolidatedRow;
};

const NetworkPolicyDetailsRowSelector: FC<NetworkPolicyDetailsRowSelectorProps> = ({
  namespace,
  row,
}) => {
  const { t } = useNetworkingTranslation();

  const { ipBlocks, namespaceSelector, podSelector } = row;

  if (!namespaceSelector && !podSelector && !ipBlocks) return <div>{t('Any peer')}</div>;

  return (
    <>
      {namespaceSelector ? (
        <div>
          <MutedText content={t('NS selector')} />
          {isEmpty(namespaceSelector) ? (
            <span>{t('Any namespace')}</span>
          ) : (
            <Selector kind="Namespace" selector={namespaceSelector} />
          )}
        </div>
      ) : (
        podSelector && (
          <div>
            <MutedText content={t('Namespace')} />
            <div>{namespace}</div>
          </div>
        )
      )}
      {podSelector && (
        <div>
          <MutedText content={t('Pod selector')} />
          <div>
            {isEmpty(podSelector) ? (
              <span>{t('Any pod')}</span>
            ) : (
              <Selector
                namespace={namespaceSelector ? undefined : namespace}
                selector={podSelector}
              />
            )}
          </div>
        </div>
      )}
      {ipBlocks && (
        <div>
          <MutedText content={t('IP blocks')} />
          {ipBlocks.map((ipblock, idx) => (
            <NetworkPolicyDetailsRowIPBlocks ipBlock={ipblock} key={`${ipblock?.cidr}-${idx}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default NetworkPolicyDetailsRowSelector;
