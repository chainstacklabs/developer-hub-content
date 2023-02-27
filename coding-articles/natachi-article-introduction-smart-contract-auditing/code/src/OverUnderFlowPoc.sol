// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./OverUnderFlowVul.sol";

contract LotteryPOC {
    OverUnderFlowVul public lottery;

    constructor() {
        lottery = new OverUnderFlowVul();
    }

    function buyTickets(uint256 numTickets) public payable {
        for (uint256 i = 0; i < numTickets; i++) {
            lottery.buyTicket{value: 1 ether}();
        }
    }

    function endLottery() public {
        lottery.endLottery();
    }

    function withdraw() public {
        uint256 balance = lottery.balances(msg.sender);
        require(balance > 0, "No funds to withdraw");
        lottery.balances(msg.sender) = 0;
        payable(msg.sender).transfer(balance);
    }
}
