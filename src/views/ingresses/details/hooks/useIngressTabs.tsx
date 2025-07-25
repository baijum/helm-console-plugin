import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import IngressDetailsTab from '@views/ingresses/details/tabs/details/IngressDetailsTab';
import IngressYAMLTab from '@views/ingresses/details/tabs/yaml/IngressYAMLTab';

const useIngressTabs = () => {
  const { t } = useNetworkingTranslation();

  return [
    {
      component: IngressDetailsTab,
      href: '',
      name: t('Details'),
    },
    {
      component: IngressYAMLTab,
      href: 'yaml',
      name: t('YAML'),
    },
  ];
};

export default useIngressTabs;
