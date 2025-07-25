import { useMemo } from 'react';

import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';
import { PRIMARY_USER_DEFINED_LABEL } from '@views/udns/list/constants';
import useProjects from '@views/udns/list/hooks/useProjects';

const useProjectsWithPrimaryUserDefinedLabel = (): [K8sResourceCommon[], boolean, any] => {
  const [projects, loaded, error] = useProjects();

  const withLabel = useMemo(
    () =>
      projects?.filter(
        (project) => project?.metadata?.labels?.[PRIMARY_USER_DEFINED_LABEL] !== undefined,
      ) ?? [],
    [projects],
  );
  return [withLabel, loaded, error];
};

export default useProjectsWithPrimaryUserDefinedLabel;
