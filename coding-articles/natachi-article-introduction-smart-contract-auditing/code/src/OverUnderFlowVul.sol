// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Lottery {
address public owner;
uint256 public jackpot;
mapping(address => uint256) public balances;
address[] public players;
bool public isEnded;

constructor() {
    owner = msg.sender;
    jackpot = 0;
    isEnded = false;
}

function buyTicket() public payable {
    require(!isEnded, "Lottery has ended");
    require(msg.value == 1 ether, "Please send 1 ether to buy a ticket");
    players.push(msg.sender);
    balances[msg.sender] += msg.value;
    require(jackpot + msg.value > jackpot, "Jackpot overflow");
    jackpot += msg.value;
}

function endLottery() public {
    require(msg.sender == owner, "Only owner can end the lottery");
    require(!isEnded, "Lottery has already ended");
    isEnded = true;
    uint256 winnerIndex = uint256(blockhash(block.number - 1)) % players.length;
    address winner = players[winnerIndex];
    require(jackpot > 0, "No jackpot to award");
    balances[winner] += jackpot;
    require(balances[winner] >= jackpot, "Balance underflow");
    jackpot = 0;
}
}