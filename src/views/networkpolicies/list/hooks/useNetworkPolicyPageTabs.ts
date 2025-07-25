import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import MultiNetworkPolicyList from '../MultiNetworkPolicyList';
import NetworkPolicyList from '../NetworkPolicyList';

export const useNetworkPolicyPageTabs = () => {
  const { t } = useNetworkingTranslation();

  return [
    {
      component: NetworkPolicyList,
      href: '',
      name: t('NetworkPolicies'),
    },
    {
      component: MultiNetworkPolicyList,
      href: 'multi',
      name: t('MultiNetworkPolicies'),
    },
  ];
};
