// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

import './RoleHelper.sol';

contract FishermanRole{
    using RoleHelper for RoleHelper.Role;

    // Define events related to adding and removing
    event FishermanAdded(address indexed account);
    event FishermanRemoved(address indexed account);

    RoleHelper.Role private Fishermen;

    constructor() public{
        _addFisherman(msg.sender);
    }

    modifier onlyFisherman(){
        require(isFisherman(msg.sender), 'Not a Fisherman');
        _;
    }

    function isFisherman(address account) public view returns(bool){
        return Fishermen.has(account);
    }

    function addFisherman(address account) public{
        _addFisherman(account);
    }

    function renounceFisherman(address account) public{
        _removeFisherman(account);
    }

    function _addFisherman(address account) internal{
        Fishermen.add(account);
        emit FishermanAdded(account);
    }

    function _removeFisherman(address account) internal{
        Fishermen.remove(account);
        emit FishermanRemoved(account);
    }
}
