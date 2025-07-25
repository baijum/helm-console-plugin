import React, { FC } from 'react';

import { InfoCircleIcon } from '@patternfly/react-icons';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

const SubnetsHelperText: FC = () => {
  const { t } = useNetworkingTranslation();

  return (
    <>
      <InfoCircleIcon className="info-icon" />
      <span className="helper-text">
        {t('Assigns IP addresses from this subnet to Pods and VirtualMachines.')}
      </span>
    </>
  );
};

export default SubnetsHelperText;
