import NetworkAttachmentDefinitionModel from '@kubevirt-ui/kubevirt-api/console/models/NetworkAttachmentDefinitionModel';

export const NetworkAttachmentDefinitionsYAMLTemplates = `
apiVersion: ${NetworkAttachmentDefinitionModel.apiGroup}/${NetworkAttachmentDefinitionModel.apiVersion}
kind: ${NetworkAttachmentDefinitionModel.kind}
metadata:
  name: example
spec:
  config: '{}'
`;
