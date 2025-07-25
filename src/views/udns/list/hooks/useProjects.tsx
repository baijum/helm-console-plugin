import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk-internal/lib/extensions/console-types';

import { ProjectGroupVersionKind } from '../constants';

const useProjects = () =>
  useK8sWatchResource<K8sResourceCommon[]>({
    groupVersionKind: ProjectGroupVersionKind,
    isList: true,
  });

export default useProjects;
