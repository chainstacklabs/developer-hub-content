// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract ReentrancyExample {
  mapping(address => uint) balances;
  mapping(address => bool) locked;

  function deposit() public payable {
    balances[msg.sender] += msg.value;
  }

  function withdraw(uint amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance.");
    require(!locked[msg.sender], "Reentrancy detected.");
    locked[msg.sender] = true;
    balances[msg.sender] -= amount;
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Transfer failed.");
    locked[msg.sender] = false;
  }

  function getBalance() public view returns (uint) {
    return balances[msg.sender];
  }
}
