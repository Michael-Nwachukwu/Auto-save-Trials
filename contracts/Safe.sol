// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";

contract Safe {
    struct AutomatedSavingsPlan {
        address token;
        uint256 amount; // Amount to save per interval
        uint256 frequency; // Interval in seconds
        uint256 duration; // Total duration in seconds
        uint256 lastSavingTimestamp; // Last timestamp when savings occurred
        uint256 remainingIntervals; // Remaining intervals to save
    }

    mapping(address => AutomatedSavingsPlan) public automatedSavingsPlans;
    mapping(address => uint256) public balances;

    // Create an automated savings plan
    function createAutomatedSavingsPlan(
        address _token,
        uint256 _amount,
        uint256 _frequency,
        uint256 _duration
    ) external {
        require(_amount > 0, "Invalid amount");
        require(_frequency > 0, "Invalid frequency");
        require(_duration >= _frequency, "Duration must be >= frequency");
        require(_frequency <= 365 days, "Frequency too large");

        uint256 intervals = _duration / _frequency;
        uint256 totalAmount = _amount * intervals;

        // Ensure user has approved the contract to spend the total amount
        uint256 allowance = IERC20(_token).allowance(msg.sender, address(this));
        require(allowance >= totalAmount, "Insufficient token approval");

        // Save the automated savings plan details
        automatedSavingsPlans[msg.sender] = AutomatedSavingsPlan({
            token: _token,
            amount: _amount,
            frequency: _frequency,
            duration: _duration,
            lastSavingTimestamp: block.timestamp,
            remainingIntervals: intervals
        });
    }

    // Execute automated savings for a user
    function executeAutoSave(address _user) external {
        AutomatedSavingsPlan storage plan = automatedSavingsPlans[_user];

        require(plan.remainingIntervals > 0, "No savings intervals remaining");
        require(block.timestamp >= plan.lastSavingTimestamp + plan.frequency, "Interval not reached");

        // Deduct the periodic amount using transferFrom
        IERC20(plan.token).transferFrom(_user, address(this), plan.amount);

        // Update user balance and savings plan
        balances[_user] += plan.amount;
        plan.lastSavingTimestamp = block.timestamp;
        plan.remainingIntervals--;
    }

    // Fetch user's total saved balance
    function fetchUserBalance(address _user) external view returns (uint256) {
        return balances[_user];
    }

    // Get the contract's balance for a specific token
    function getContractTokenBalance(address _token) external view returns (uint256) {
        return IERC20(_token).balanceOf(address(this));
    }

    // Get the number of remaining intervals for a user
    function getRemainingIntervals(address _user) external view returns (uint256) {
        return automatedSavingsPlans[_user].remainingIntervals;
    }
}
