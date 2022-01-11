// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

library RoleHelper{
    struct Role{
        mapping( address => bool) bearer;
    }
    function add(Role storage role, address account) internal{
        // address(0) represents an empty address
        require(account != address(0));
        require(!has(role, account));

        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal{
        require(account != address(0));
        require(has(role, account));

        role.bearer[account] = false;
    }

    function has(Role storage role, address account) internal view returns(bool){
        require(account != address(0));
        return role.bearer[account];
    }
}
