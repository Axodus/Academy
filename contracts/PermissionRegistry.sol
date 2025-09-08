// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PermissionRegistry is Ownable {
    mapping(address => mapping(bytes32 => mapping(bytes4 => bool))) public acl;
    event AccessUpdated(address indexed who, bytes32 indexed resource, bytes4 indexed op, bool allowed);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function setAccess(address who, bytes32 resource, bytes4 op, bool allowed) external onlyOwner {
        acl[who][resource][op] = allowed;
        emit AccessUpdated(who, resource, op, allowed);
    }

    function hasAccess(address who, bytes32 resource, bytes4 op) external view returns (bool) {
        return acl[who][resource][op];
    }
}
