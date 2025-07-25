import React, { FC, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom-v5-compat';

import { k8sCreate, useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import {
  Alert,
  AlertVariant,
  Button,
  ButtonVariant,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
} from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';
import useProjectsWithPrimaryUserDefinedLabel from '@utils/hooks/useProjectsWithPrimaryUserDefinedLabel';
import { ClusterUserDefinedNetworkModel, UserDefinedNetworkModel } from '@utils/models';
import { getName, getNamespace, resourcePathFromModel } from '@utils/resources/shared';

import { PRIMARY_USER_DEFINED_LABEL, PROJECT_NAME } from '../constants';

import { UDNForm } from './constants';
import UserDefinedNetworkCreateForm from './UserDefinedNetworkCreateForm';
import { getDefaultUDN, isUDNValid } from './utils';

import './userdefinednetworkcreatemodal.scss';

type UserDefinedNetworkCreateModalProps = {
  closeModal?: () => void;
  isClusterUDN?: boolean;
};

const UserDefinedNetworkCreateModal: FC<UserDefinedNetworkCreateModalProps> = ({
  closeModal,
  isClusterUDN = false,
}) => {
  const { t } = useNetworkingTranslation();
  const navigate = useNavigate();

  const [activeNamespace] = useActiveNamespace();
  const [projectsReadyForPrimartUDN, loadedPrimaryUDN, errorLoadingPrimaryUDN] =
    useProjectsWithPrimaryUserDefinedLabel();

  const showFailedToRetrieveProjectsError =
    !isClusterUDN && loadedPrimaryUDN && errorLoadingPrimaryUDN;
  const showNoProjectReadyForPrimaryUDNError =
    !isClusterUDN &&
    !showFailedToRetrieveProjectsError &&
    loadedPrimaryUDN &&
    projectsReadyForPrimartUDN?.length === 0;

  const methods = useForm<UDNForm>({
    defaultValues: getDefaultUDN(isClusterUDN),
    mode: 'all',
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = methods;

  const selectedProject = watch(PROJECT_NAME);

  useEffect(() => {
    if (selectedProject || isClusterUDN) {
      return;
    }

    if (projectsReadyForPrimartUDN.some((it) => it?.metadata?.name === activeNamespace)) {
      setValue(PROJECT_NAME, activeNamespace);
    } else if (projectsReadyForPrimartUDN?.length === 1) {
      setValue(PROJECT_NAME, projectsReadyForPrimartUDN[0].metadata.name);
    }
  }, [activeNamespace, selectedProject, isClusterUDN, projectsReadyForPrimartUDN, setValue]);

  const [error, setIsError] = useState<Error>();
  const submit = async (udn: UDNForm) => {
    try {
      const model =
        udn.kind === ClusterUserDefinedNetworkModel.kind
          ? ClusterUserDefinedNetworkModel
          : UserDefinedNetworkModel;

      await k8sCreate({
        data: udn,
        model,
      });
      closeModal();

      navigate(resourcePathFromModel(model, getName(udn), getNamespace(udn)));
    } catch (apiError) {
      setIsError(apiError);
    }
  };

  const udn = watch();

  return (
    <Modal id="udn-create-modal" isOpen onClose={closeModal} variant={ModalVariant.small}>
      <ModalHeader
        title={t('Create {{kind}}', {
          kind: isClusterUDN ? ClusterUserDefinedNetworkModel.kind : UserDefinedNetworkModel.kind,
        })}
      />
      <ModalBody>
        {showFailedToRetrieveProjectsError && (
          <Alert
            isInline
            title={t('Failed to retrieve the list of projects')}
            variant={AlertVariant.danger}
          >
            {errorLoadingPrimaryUDN?.message ?? ''}
          </Alert>
        )}
        {showNoProjectReadyForPrimaryUDNError && (
          <Alert
            isInline
            title={t('No namespace is configured for a primary user-defined network')}
            variant={AlertVariant.danger}
          >
            <Trans t={t}>
              At creation time the namespace must be configured with{' '}
              <Label>{{ label: PRIMARY_USER_DEFINED_LABEL }}</Label> label. Go to{' '}
              <Link target="_blank" to={`/k8s/cluster/namespaces`}>
                Namespaces
              </Link>{' '}
              to create a new namespace.
            </Trans>
          </Alert>
        )}

        <FormProvider {...methods}>
          <UserDefinedNetworkCreateForm
            error={error}
            isClusterUDN={isClusterUDN}
            onSubmit={handleSubmit(submit)}
          />
        </FormProvider>
      </ModalBody>
      <ModalFooter>
        <Button
          data-test="create-udn-submit"
          form="create-udn-form"
          isDisabled={
            isSubmitting ||
            !isUDNValid(udn) ||
            !loadedPrimaryUDN ||
            showFailedToRetrieveProjectsError
          }
          isLoading={isSubmitting || !loadedPrimaryUDN}
          key="submit"
          type="submit"
          variant={ButtonVariant.primary}
        >
          {t('Create')}
        </Button>
        <Button
          data-test-id="create-udn-close"
          isDisabled={isSubmitting}
          key="button"
          onClick={closeModal}
          variant={ButtonVariant.link}
        >
          {t('Cancel')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserDefinedNetworkCreateModal;
