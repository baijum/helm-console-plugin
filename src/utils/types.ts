import { K8sResourceCommon, K8sResourceCondition } from '@openshift-console/dynamic-plugin-sdk';

type EndpointSlice = {
  kind?: string;
  name?: string;
  namespace?: string;
  uid?: string;
};

export type EndpointSliceKind = {
  endpoints?: EndpointSlice[];
} & K8sResourceCommon;

export type RouteTarget = {
  kind: 'Service';
  name: string;
  weight?: number;
};

export type RouteTLS = {
  caCertificate?: string;
  certificate?: string;
  destinationCACertificate?: string;
  insecureEdgeTerminationPolicy?: string;
  key?: string;
  termination: string;
};

export type RouteIngress = {
  conditions: K8sResourceCondition[];
  host?: string;
  routerCanonicalHostname?: string;
  routerName?: string;
  wildcardPolicy?: string;
};

export type RouteKind = {
  spec: {
    alternateBackends?: RouteTarget[];
    host?: string;
    path?: string;
    port?: {
      targetPort: number | string;
    };
    subdomain?: string;
    tls?: RouteTLS;
    to: RouteTarget;
    wildcardPolicy?: string;
  };
  status?: {
    conditions?: K8sResourceCondition[];
    ingress: RouteIngress[];
    url?: string;
  };
} & K8sResourceCommon;
