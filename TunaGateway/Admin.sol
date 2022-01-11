// SPDX-License-Identifier: TFT-1.0.0

pragma solidity ^0.5.0;

contract Admin{
  address private origOwner;

  event TransferOwnership(address indexed oldOwner, address indexed newOwner);

  constructor() internal{
    origOwner = msg.sender;
    emit TransferOwnership(address(0), origOwner);
  }

  function owner() public view returns(address) {
    return origOwner;
  }

  modifier onlyOwner(){
    require(isOwner());
    _;
  }

  function isOwner() public view returns(bool){
    return msg.sender == origOwner;
  }

  function renounceOwnership() public onlyOwner{
    emit TransferOwnership(origOwner, address(0));
    origOwner = address(0);
  }

  function transferOwnership(address newOwner) public onlyOwner{
    _transferOwnership(newOwner);
  }

  function _transferOwnership(address newOwner) internal{
    require(newOwner != address(0));
    emit TransferOwnership(origOwner, newOwner);

    origOwner = newOwner;
  }

  function kill() public onlyOwner {
    selfdestruct(msg.sender);
  }
}
