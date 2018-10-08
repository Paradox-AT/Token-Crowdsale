pragma solidity ^0.4.24;

import "../validation/CappedCrowdsale.sol";
import "../../ownership/Ownable.sol";

contract StagedCrowdsale is CappedCrowdsale, Ownable {
    uint8 private _stage;

    function getStage() public view returns(uint8) {
        return _stage;
    }

    function changeStage(uint256 newRate, uint256 newCap) public onlyOwner returns(bool) {
        _stage++;
        changeRate(newRate);
        changeCap(newCap);
        return true;
    }
}