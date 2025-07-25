import React, { FC, Ref, useState } from 'react';

import { Dropdown, DropdownItem, MenuToggle, MenuToggleElement } from '@patternfly/react-core';
import { NetworkPolicyPort } from '@utils/models';

type NetworkPolicyPortsDropdownProps = {
  index: number;
  onSingleChange: (port: NetworkPolicyPort, index: number) => void;
  port: NetworkPolicyPort;
};

const NetworkPolicyPortsDropdown: FC<NetworkPolicyPortsDropdownProps> = ({
  index,
  onSingleChange,
  port,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <Dropdown
      data-test="port-protocol"
      isOpen={isDropdownOpen}
      onSelect={(_event, protocol) => {
        setIsDropdownOpen(false);
        onSingleChange({ ...port, protocol: protocol?.toString() }, index);
      }}
      selected={port?.protocol}
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          id={`toggle-${port.key}-${index}`}
          isExpanded={isDropdownOpen}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          ref={toggleRef}
        >
          {port?.protocol}
        </MenuToggle>
      )}
    >
      <DropdownItem value="TCP">TCP</DropdownItem>
      <DropdownItem value="UDP">UDP</DropdownItem>
      <DropdownItem value="SCTP">SCTP</DropdownItem>
    </Dropdown>
  );
};

export default NetworkPolicyPortsDropdown;
