// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {OwnableLite} from "./OwnableLite.sol";

contract LockedNeuronsVault is OwnableLite {
    struct Balance {
        uint256 totalCredited;
        uint256 spent;
    }

    mapping(address => bool) public issuers;
    mapping(address => Balance) private balances;

    event IssuerUpdated(address indexed issuer, bool enabled);
    event LockedNeuronsCredited(address indexed account, uint256 amount, bytes32 indexed reason);
    event LockedNeuronsSpent(address indexed account, uint256 amount, bytes32 indexed utility);

    modifier onlyIssuer() {
        require(issuers[msg.sender] || msg.sender == owner, "LOCKED_NEURONS_NOT_ISSUER");
        _;
    }

    constructor(address initialOwner) OwnableLite(initialOwner) {}

    function setIssuer(address issuer, bool enabled) external onlyOwner {
        require(issuer != address(0), "LOCKED_NEURONS_ZERO_ISSUER");
        issuers[issuer] = enabled;
        emit IssuerUpdated(issuer, enabled);
    }

    function credit(address account, uint256 amount, bytes32 reason) external onlyIssuer {
        require(account != address(0), "LOCKED_NEURONS_ZERO_ACCOUNT");
        require(amount > 0, "LOCKED_NEURONS_ZERO_AMOUNT");
        balances[account].totalCredited += amount;
        emit LockedNeuronsCredited(account, amount, reason);
    }

    function spend(address account, uint256 amount, bytes32 utility) external onlyIssuer {
        require(account != address(0), "LOCKED_NEURONS_ZERO_ACCOUNT");
        require(amount > 0, "LOCKED_NEURONS_ZERO_AMOUNT");
        require(available(account) >= amount, "LOCKED_NEURONS_INSUFFICIENT");
        balances[account].spent += amount;
        emit LockedNeuronsSpent(account, amount, utility);
    }

    function available(address account) public view returns (uint256) {
        Balance memory balance = balances[account];
        return balance.totalCredited - balance.spent;
    }

    function balanceOf(address account) external view returns (uint256 totalCredited, uint256 spent, uint256 availableBalance) {
        Balance memory balance = balances[account];
        return (balance.totalCredited, balance.spent, balance.totalCredited - balance.spent);
    }
}
