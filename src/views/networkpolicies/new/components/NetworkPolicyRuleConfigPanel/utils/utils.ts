import { t } from '@utils/hooks/useNetworkingTranslation';
import { NetworkPolicyEgressIngress } from '@views/networkpolicies/new/utils/types';

export const getPeersHelpText = (direction: NetworkPolicyEgressIngress) =>
  direction === NetworkPolicyEgressIngress.ingress
    ? t(
        'Sources added to this rule will allow traffic to the pods defined above. Sources in this list are combined using a logical OR operation.',
      )
    : t(
        'Destinations added to this rule will allow traffic from the pods defined above. Destinations in this list are combined using a logical OR operation.',
      );
