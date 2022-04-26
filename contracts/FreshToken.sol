// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FreshToken is ERC20 {

    uint256 tokenTotalSupply;

    constructor () ERC20("FreshToken", "FTK") {
        tokenTotalSupply = 1000000000 * (10**decimals());
        _mint(msg.sender, tokenTotalSupply);
    }

}