// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;


/**
 * @dev Errors for the `TrustVaultDispute` contract
 */
interface ITrustVaultDispute {
    /**
     * @dev
     * @param dealer Address of dealer proposing dispute
     * @param counterparty Address of counterparty to initiate dispute
     * @param token Address of token required for `counterparty` to initiate a Dispute
     * @param amount Amount of `token` required for `counterparty` to initiate a Dispute
     * @param deadline Deadline till dispute can be settled
     */
    event DisputeProposed(address dealer, address counterparty, address token, uint256 amount, uint256 deadline);

    /**
     * @dev Indicates an error related to an invalid dispute being accessed
     * @param disputeId Identifier of dispute accessed
     */
    error OpenedDealError(uint256 disputeId);

    /**
     * @dev Indicates an error related to an invalid dispute being accessed
     * @param disputeId Identifier of dispute accessed
     */
    error ClosedDealError(uint256 disputeId);

    error InvalidDealToken();

    error UnauthorizedDealOwner();

    error DealInitiatedError();

    error DealInProgressError();


    error NotImplementedError();
}