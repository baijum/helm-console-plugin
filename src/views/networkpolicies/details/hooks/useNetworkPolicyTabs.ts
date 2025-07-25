import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import NetworkPolicyDetails from '../tabs/details/NetworkPolicyDetails';
import NetworkPolicyYAML from '../tabs/yaml/NetworkPolicyYAML';

export const useNetworkPolicyTabs = () => {
  const { t } = useNetworkingTranslation();

  return [
    {
      component: NetworkPolicyDetails,
      href: '',
      name: t('Details'),
    },
    {
      component: NetworkPolicyYAML,
      href: 'yaml',
      name: t('YAML'),
    },
  ];
};
