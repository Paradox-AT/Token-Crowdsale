pragma solidity ^0.4.24;

import "../../math/SafeMath.sol";
import "../distribution/PostDeliveryCrowdsale.sol";
import "../../access/roles/CapperRole.sol";


/**
 * @title IndividuallyCappedCrowdsale
 * @dev Crowdsale with per-beneficiary caps.
 */
contract IndividuallyCappedCrowdsale is PostDeliveryCrowdsale {
    using SafeMath for uint256;

    uint256 private _individualMinCap;
    uint256 private _individualMaxCap; 
    
    constructor (uint256 individualMinCap) public {
        _setCap(individualMinCap);
    }
    
    /**
    * @dev Extend parent behavior requiring purchase to respect the beneficiary's funding cap.
    * @param beneficiary Token purchaser
    * @param weiAmount Amount of wei contributed
    */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(_getTokenAmount(msg.value).add(balanceOf(msg.sender)) > _individualMinCap, "Cannot buy tokens lesser than the minimum amount.");
        // require(_getTokenAmount(msg.value).add(balanceOf(msg.sender)) < _individualMaxCap, "Cannot buy tokens greater than the maximum amount.");
    }

    function getIndividualCap() public view returns(uint256,uint256) {
        return(_individualMinCap, _individualMaxCap);
    }

    function _setCap(uint256 minCap) private {
        _individualMinCap = minCap;
    }
}