// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Dispute {
    uint256 public number;

    struct Dispute{
        string name;
        address dealer;
        string dealerMessage;
        string[] dealerImages;
        address counterparty;
        string counterpartyMessage;
        string[] counterpartyImages;
    }
}
