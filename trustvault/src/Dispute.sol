// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import "./ITVD.sol";

contract TrustVaultDispute is ITrustVaultDispute, ISPHook {
    uint256 public disputeCount;

    mapping(uint256 => Dispute) public disputes;
    mapping(uint256 disputeId => mapping(address attester => mapping(bool forDealer => uint256 amount)))
        public disputeAttesterVotes;
    mapping(uint256 disputeId => mapping(bool forDealer => uint256 amount))
        public disputeVotes;

    struct Dispute {
        string name;
        address dealer;
        string dealerMessage;
        string[] dealerImages;
        address counterparty;
        string counterpartyMessage;
        string[] counterpartyImages;
        IERC20 token;
        uint256 amount;
        bool open;
        bool sellerAccepted;
        uint256 deadline;
    }

    modifier onlyOpenDispute(uint256 disputeId) {
        require(disputes[disputeId].open, ClosedDealError(disputeId));
        _;
    }

    modifier onlyCloseDispute(uint256 disputeId) {
        require(!disputes[disputeId].open, OpenedDealError(disputeId));
        _;
    }

    modifier onlyDisputeOwner(uint256 disputeId) {
        require(
            disputes[disputeId].dealer == msg.sender,
            UnauthorizedDealOwner()
        );
        _;
    }

    modifier onlyDisputeCounterparty(uint256 disputeId) {
        require(
            disputes[disputeId].counterparty == msg.sender,
            UnauthorizedDealOwner()
        );
        _;
    }

    modifier onlyPendingDispute(uint256 disputeId) {
        require(!disputes[disputeId].sellerAccepted, DealInitiatedError());
        _;
    }

    function proposeDispute(
        string calldata name,
        string calldata message,
        string[] memory images,
        address counterparty,
        IERC20 token,
        uint256 amount,
        uint256 deadline
    ) external returns (Dispute memory) {
        Dispute storage dispute = disputes[disputeCount];
        disputeCount++;
        dispute.name = name;
        dispute.dealer = msg.sender;
        dispute.dealerMessage = message;
        dispute.dealerImages = images;
        dispute.counterparty = counterparty;
        dispute.token = token;
        dispute.amount = amount;
        dispute.deadline = deadline;
        dispute.open = true;
        emit DisputeProposed(
            msg.sender,
            counterparty,
            address(token),
            amount,
            deadline
        );
        token.transferFrom(msg.sender, address(this), amount);
        return dispute;
    }

    function withdrawProposedDispute(
        uint256 disputeId
    )
        external
        onlyOpenDispute(disputeId)
        onlyDisputeOwner(disputeId)
        onlyPendingDispute(disputeId)
    {
        disputes[disputeId].open = false;
        disputes[disputeId].token.transfer(
            msg.sender,
            disputes[disputeId].amount
        );
    }

    function initiateDispute(
        uint256 disputeId,
        string calldata message,
        string[] memory images
    )
        external
        onlyOpenDispute(disputeId)
        onlyDisputeCounterparty(disputeId)
        onlyPendingDispute(disputeId)
    {
        disputes[disputeId].dealerMessage = message;
        disputes[disputeId].dealerImages = images;
        disputes[disputeId].sellerAccepted = true;
        disputes[disputeId].token.transferFrom(
            msg.sender,
            address(this),
            disputes[disputeId].amount
        );
    }

    function endDispute(uint256 disputeId) external {
        require(
            block.timestamp >= disputes[disputeId].deadline,
            DealInProgressError()
        );
        disputes[disputeId].open = false;
        disputes[disputeId].token.transfer(
            msg.sender,
            disputes[disputeId].amount * 2
        );
    }

    function didReceiveAttestation(
        address attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20 resolverFeeERC20Token,
        uint256 resolverFeeERC20Amount,
        bytes calldata extraData
    ) external {
        (uint256 disputeId, bool forDealer) = abi.decode(
            extraData,
            (uint256, bool)
        );
        require(disputes[disputeId].open, ClosedDealError(disputeId));
        require(
            disputes[disputeId].token == resolverFeeERC20Token,
            InvalidDealToken()
        );
        disputeAttesterVotes[disputeId][attester][
            forDealer
        ] += resolverFeeERC20Amount;
        disputeVotes[disputeId][forDealer] += resolverFeeERC20Amount;
    }

    // Unimplemented ISPHook Methods
    function didReceiveAttestation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    ) external payable {
        revert NotImplementedError();
    }

    function didReceiveRevocation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    ) external payable {
        revert NotImplementedError();
    }

    function didReceiveRevocation(
        address, // attester
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert NotImplementedError();
    }
}
