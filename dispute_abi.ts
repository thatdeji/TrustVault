export const disputeAbi = [
  {
    type: "function",
    name: "didReceiveAttestation",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "didReceiveAttestation",
    inputs: [
      {
        name: "attester",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "resolverFeeERC20Token",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "resolverFeeERC20Amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "didReceiveRevocation",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "didReceiveRevocation",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "disputeAttesterVotes",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "attester",
        type: "address",
        internalType: "address",
      },
      {
        name: "forDealer",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "disputeCount",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "disputeVotes",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "forDealer",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "disputes",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "dealer",
        type: "address",
        internalType: "address",
      },
      {
        name: "dealerMessage",
        type: "string",
        internalType: "string",
      },
      {
        name: "counterparty",
        type: "address",
        internalType: "address",
      },
      {
        name: "counterpartyMessage",
        type: "string",
        internalType: "string",
      },
      {
        name: "token",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "open",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "sellerAccepted",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "endDispute",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initiateDispute",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "message",
        type: "string",
        internalType: "string",
      },
      {
        name: "images",
        type: "string[]",
        internalType: "string[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "proposeDispute",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "message",
        type: "string",
        internalType: "string",
      },
      {
        name: "images",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "counterparty",
        type: "address",
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct TrustVaultDispute.Dispute",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "dealer",
            type: "address",
            internalType: "address",
          },
          {
            name: "dealerMessage",
            type: "string",
            internalType: "string",
          },
          {
            name: "dealerImages",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "counterparty",
            type: "address",
            internalType: "address",
          },
          {
            name: "counterpartyMessage",
            type: "string",
            internalType: "string",
          },
          {
            name: "counterpartyImages",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "token",
            type: "address",
            internalType: "contract IERC20",
          },
          {
            name: "amount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "open",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "sellerAccepted",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "deadline",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdrawProposedDispute",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "DisputeProposed",
    inputs: [
      {
        name: "dealer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "counterparty",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "ClosedDealError",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "DealInProgressError",
    inputs: [],
  },
  {
    type: "error",
    name: "DealInitiatedError",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidDealToken",
    inputs: [],
  },
  {
    type: "error",
    name: "NotImplementedError",
    inputs: [],
  },
  {
    type: "error",
    name: "OpenedDealError",
    inputs: [
      {
        name: "disputeId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "UnauthorizedDealOwner",
    inputs: [],
  },
] as const;
