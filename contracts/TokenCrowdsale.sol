pragma solidity ^0.4.24;

import "./crowdsale/emission/AllowanceCrowdsale.sol";
import "./crowdsale/distribution/RefundableCrowdsale.sol";
import "./crowdsale/validation/IndividuallyCappedCrowdsale.sol";
import "./crowdsale/emission/StagedCrowdsale.sol";

contract TokenCrowdsale is AllowanceCrowdsale, RefundableCrowdsale, IndividuallyCappedCrowdsale, StagedCrowdsale {
    constructor (uint256 rate, address wallet, IERC20 token, uint256 openingTime, uint256 closingTime, address tokenWallet, uint256 goal, uint256 cap, uint256 individualMinCap)
        Crowdsale(rate, wallet, token)
        TimedCrowdsale(openingTime, closingTime)
        AllowanceCrowdsale(tokenWallet)
        RefundableCrowdsale(goal)
        CappedCrowdsale(cap)
        IndividuallyCappedCrowdsale(individualMinCap)
    public {}
}