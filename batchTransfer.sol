// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract BatchTransfer is Ownable {
    event BatchETHTransfer(
        address indexed sender,
        uint256 totalAmount,
        uint256 successCount
    );
    event BatchERC20Transfer(
        address indexed sender,
        address token,
        uint256 totalAmount,
        uint256 successCount
    );

    /// @notice Constructor to initialize the owner to msg.sender
    constructor() Ownable(msg.sender) {}

    /// @notice Batch transfer of ETH to multiple recipients
    /// @param recipients Array of recipient addresses
    /// @param amounts Array of amounts to send to each recipient
    function batchTransferETH(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external payable onlyOwner {
        require(recipients.length == amounts.length, "Mismatched input arrays");
        uint256 successCount = 0;
        uint256 totalAmount = 0;

        for (uint256 i = 0; i < recipients.length; i++) {
            totalAmount += amounts[i];
            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            if (success) {
                successCount++;
            }
        }
        require(totalAmount <= msg.value, "Insufficient ETH sent");
        emit BatchETHTransfer(msg.sender, totalAmount, successCount);
    }

    /// @notice Batch transfer of ERC20 tokens to multiple recipients
    /// @param token Address of the ERC20 token
    /// @param recipients Array of recipient addresses
    /// @param amounts Array of amounts to send to each recipient
    function batchTransferERC20(
        address token,
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external onlyOwner {
        require(recipients.length == amounts.length, "Mismatched input arrays");
        uint256 successCount = 0;
        uint256 totalAmount = 0;

        for (uint256 i = 0; i < recipients.length; i++) {
            totalAmount += amounts[i];
            bool success = IERC20(token).transfer(recipients[i], amounts[i]);
            if (success) {
                successCount++;
            }
        }
        emit BatchERC20Transfer(msg.sender, token, totalAmount, successCount);
    }

    /// @notice Allow the contract to receive ETH
    receive() external payable {}
}
