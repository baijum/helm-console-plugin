import { t } from '@utils/hooks/useNetworkingTranslation';

// IPv4 format
const subnetRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}\/(?:[0-9]|[1-2][0-9]|3[0-2])$/;
const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

export const validateSubnets = (value: string): boolean | string => {
  if (!value) {
    return true;
  }

  const subnets = value.split(',').map((subnet) => subnet.trim());

  for (const subnet of subnets) {
    if (!subnetRegex.test(subnet)) {
      return t('Invalid subnet format');
    }
  }
  return true;
};

export const validateIpOrSubnets = (value: string): boolean | string => {
  if (!value) {
    return true;
  }

  const parts = value.split(',').map((part) => part.trim());

  for (const part of parts) {
    if (!subnetRegex.test(part) && !ipRegex.test(part)) {
      return t('Invalid IP address or subnet format');
    }
  }
  return true;
};
