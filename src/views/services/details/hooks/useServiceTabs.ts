import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import ServiceDetails from '../tabs/details/ServiceDetails';
import ServicePods from '../tabs/pods/ServicePods';
import ServiceYAML from '../tabs/yaml/ServiceYAML';

export const useServiceTabs = () => {
  const { t } = useNetworkingTranslation();

  return [
    {
      component: ServiceDetails,
      href: '',
      name: t('Details'),
    },
    {
      component: ServiceYAML,
      href: 'yaml',
      name: t('YAML'),
    },
    {
      component: ServicePods,
      href: 'pods',
      name: t('Pods'),
    },
  ];
};
