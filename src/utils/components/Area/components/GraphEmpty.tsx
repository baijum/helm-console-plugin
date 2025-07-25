import React, { FC } from 'react';

import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

type GraphEmptyProps = {
  height?: number | string;
  loading?: boolean;
};

const GraphEmpty: FC<GraphEmptyProps> = ({ height = 180, loading = false }) => {
  const { t } = useNetworkingTranslation();

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        height,
        justifyContent: 'center',
        padding: '5px',
        width: '100%',
      }}
    >
      {loading ? (
        <div className="skeleton-chart" data-test="skeleton-chart" />
      ) : (
        <div className="text-secondary" data-test="datapoints-msg">
          {t('No datapoints found.')}
        </div>
      )}
    </div>
  );
};

export default GraphEmpty;
