export type IngressPathRule = {
  host: string;
  path: string;
  pathType?: string;
  serviceName: string;
  servicePort: number | string;
};
