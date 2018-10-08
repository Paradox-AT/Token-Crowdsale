pragma solidity ^0.4.24;

import "./token/ERC20Burnable.sol";
import "./token/ERC20Capped.sol";
import "./token/ERC20Detailed.sol";
import "./token/ERC20Pausable.sol";

contract Token is ERC20Detailed, ERC20Capped, ERC20Pausable, ERC20Burnable {
    constructor (string name, string symbol, uint8 decimals, uint256 cap)
        ERC20Detailed(name, symbol, decimals)
        ERC20Capped(cap)
    public {}
}