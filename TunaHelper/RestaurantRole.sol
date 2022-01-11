// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

import './RoleHelper.sol';

contract RestaurantRole{
    using RoleHelper for RoleHelper.Role;

    event RestaurantAdded(address indexed account);
    event RestaurantRemoved(address indexed account);

    RoleHelper.Role private Restaurants;

    constructor() public{
        _addRestaurant(msg.sender);
    }

    modifier onlyRestaurants(){
        require(isRestaurant(msg.sender), 'Not a Restaurant');
        _;
    }

    function isRestaurant(address account) public view returns(bool){
        return Restaurants.has(account);
    }

    function addRestaurant(address account) public{
        _addRestaurant(account);
    }

    function renounceRestaurant(address account) public{
        _removeRestaurant(account);
    }

    function _addRestaurant(address account) internal{
        Restaurants.add(account);

        emit RestaurantAdded(account);
    }

    function _removeRestaurant(address account) internal{
        Restaurants.remove(account);

        emit RestaurantRemoved(account);
    }
}
