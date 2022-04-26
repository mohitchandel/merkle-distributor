// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FreshToken.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleDistributor {
    address private admin;
    FreshToken public token;
    bytes32 public merkleRoot;

    mapping(address => bool) public isClaimed;

    constructor(FreshToken _token, bytes32 _merkleRoot) {
        admin = msg.sender;
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function claimAirDrop(address _claimer, bytes32[] calldata _merkleProof)
        external
    {
        require(
            msg.sender == admin || msg.sender == _claimer,
            "Only claimer or admin can call"
        );
        require(!isClaimed[_claimer], "already claimed");
        require(canClaim(_claimer, _merkleProof), "Not able to claim");
        require(
            MerkleProof.verify(
                _merkleProof,
                merkleRoot,
                keccak256(abi.encodePacked(_claimer))
            ),
            "Undefined merkle proof"
        );
        token.transferFrom(admin, _claimer, 10000 * (10**token.decimals()));
        isClaimed[_claimer] = true;
    }

    function canClaim(address _address, bytes32[] calldata merkleProof)
        public
        view
        returns (bool)
    {
        return
            !isClaimed[_address] &&
            MerkleProof.verify(
                merkleProof,
                merkleRoot,
                keccak256(abi.encodePacked(_address))
            );
    }
}
