// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

import "../TunaSupplyChain/Tracking.sol";
import "./Admin.sol";

contract Gateway is Tracking, Admin{
  constructor() public payable{

  }

  function kill() public onlyOwner{
    selfdestruct(msg.sender);
  }

  function transferOwner(address newOwner) public onlyOwner{
    transferOwnership(newOwner);
  }
}
