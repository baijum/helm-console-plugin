import React, { FC, FormEventHandler, useState } from 'react';

import {
  Alert,
  AlertVariant,
  Form,
  FormAlert,
  Tab,
  Tabs,
  TabTitleText,
} from '@patternfly/react-core';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import DetailsProjectTab from './DetailsProjectTab';
import NetworkTab from './NetworkTab';

type CreateProjectModalFormProps = {
  errorMessage: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

const CreateProjectModalForm: FC<CreateProjectModalFormProps> = ({ errorMessage, onSubmit }) => {
  const { t } = useNetworkingTranslation();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Form id="create-project-modal-form" onSubmit={onSubmit}>
      <div className="create-project-modal__tabs-container">
        <Tabs
          activeKey={selectedTab}
          className="create-project-modal__tabs"
          isBox
          isVertical
          onSelect={(_, newTab) => setSelectedTab(newTab as number)}
          role="region"
        >
          <Tab
            className="create-project-modal__tabs-content"
            eventKey={0}
            title={
              <TabTitleText aria-label="vertical" role="region">
                {t('Details')}
              </TabTitleText>
            }
          >
            <DetailsProjectTab />
          </Tab>
          <Tab
            className="create-project-modal__tabs-content"
            eventKey={1}
            title={<TabTitleText>{t('Network')}</TabTitleText>}
          >
            <NetworkTab />
          </Tab>
        </Tabs>
      </div>
      {errorMessage && (
        <FormAlert>
          <Alert
            data-test="alert-error"
            isInline
            title={t('An error occurred.')}
            variant={AlertVariant.danger}
          >
            {errorMessage}
          </Alert>
        </FormAlert>
      )}
    </Form>
  );
};

export default CreateProjectModalForm;
