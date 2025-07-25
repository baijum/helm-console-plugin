import React, { FC } from 'react';
import { Link } from 'react-router-dom-v5-compat';
import * as _ from 'lodash-es';

import { Selector as SelectorKind } from '@openshift-console/dynamic-plugin-sdk';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';
import { useNetworkingTranslation } from '@utils/hooks/useNetworkingTranslation';

import { selectorToString } from './utilts';

const Requirement: FC<RequirementProps> = ({ kind, namespace = '', requirements }) => {
  // Strip off any trailing '=' characters for valueless selectors
  const requirementAsString = selectorToString(requirements).replace(/=,/g, ',').replace(/=$/g, '');
  const requirementAsUrlEncodedString = encodeURIComponent(requirementAsString);

  const to = namespace
    ? `/search/ns/${namespace}?kind=${kind}&q=${requirementAsUrlEncodedString}`
    : `/search/all-namespaces?kind=${kind}&q=${requirementAsUrlEncodedString}`;

  return (
    <div className="co-m-requirement">
      <Link className={`co-m-requirement__link co-text-${kind.toLowerCase()}`} to={to}>
        <SearchIcon className="co-m-requirement__icon co-icon-flex-child" />
        <span className="co-m-requirement__label">{requirementAsString.replace(/,/g, ', ')}</span>
      </Link>
    </div>
  );
};
Requirement.displayName = 'Requirement';

export const Selector: FC<SelectorProps> = ({
  kind = 'Pod',
  namespace = undefined,
  selector = {},
}) => {
  const { t } = useNetworkingTranslation();
  return (
    <div className="co-m-selector">
      {_.isEmpty(selector) ? (
        <p className="text-muted">{t('No selector')}</p>
      ) : (
        <Requirement kind={kind} namespace={namespace} requirements={selector} />
      )}
    </div>
  );
};
Selector.displayName = 'Selector';

type RequirementProps = {
  kind: string;
  namespace?: string;
  requirements: SelectorKind;
};

type SelectorProps = {
  kind?: string;
  namespace?: string;
  selector: SelectorKind;
};
