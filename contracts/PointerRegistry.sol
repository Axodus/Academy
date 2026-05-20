// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {OwnableLite} from "./OwnableLite.sol";

contract PointerRegistry is OwnableLite {
    struct Pointer { bytes32 contentHash; string uri; uint256 timestamp; }
    mapping(address => Pointer) private _pointer;
    event PointerSet(address indexed account, bytes32 indexed contentHash, string uri, uint256 timestamp);

    constructor(address initialOwner) OwnableLite(initialOwner) {}

    function setPointer(bytes32 contentHash, string calldata uri) external {
        _pointer[msg.sender] = Pointer({ contentHash: contentHash, uri: uri, timestamp: block.timestamp });
        emit PointerSet(msg.sender, contentHash, uri, block.timestamp);
    }

    function getPointer(address account) external view returns (bytes32, string memory, uint256) {
        Pointer memory p = _pointer[account];
        return (p.contentHash, p.uri, p.timestamp);
    }
}
