// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

import './RoleHelper.sol';

contract RegulatorRole{
    using RoleHelper for RoleHelper.Role;

    event RegulatorAdded(address indexed account);
    event RegulatorRemoved(address indexed account);

    RoleHelper.Role private Regulators;

    constructor() public{
        _addRegulator(msg.sender);
    }

    modifier onlyRegulator(){
        require(isRegulator(msg.sender), 'Not a Regulator');
        _;
    }

    function isRegulator(address account) public view returns(bool){
        return Regulators.has(account);
    }

    function addRegulator(address account) public{
        _addRegulator(account);
    }

    function renounceRegulator(address account) public{
        _removeRegulator(account);
    }

    function _addRegulator(address account) internal{
        Regulators.add(account);
        emit RegulatorAdded(account);
    }

    function _removeRegulator(address account) internal{
        Regulators.remove(account);
        emit RegulatorRemoved(account);
    }
}
