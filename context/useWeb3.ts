import { disputeAbi } from "@/dispute_abi";
import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  custom,
  getContract,
  http,
  parseEther,
  stringToHex,
} from "viem";
import { baseSepolia } from "viem/chains";

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const walletClient = createWalletClient({
  transport: custom(window.ethereum),
  chain: baseSepolia,
});

const DISPUTE_CONTRACT_ADDRESS = "0x86B5dc2C64b809c7CA897fE1Bd70FD41201a8bA9";

interface IProposeDispute {
  name: string;
  message: string;
  images: string[];
  counterparty: `0x${string}`;
  token: string;
  amount: number;
  deadline: number;
}

export const useWeb3 = () => {
  const [address, setAddress] = useState<string | null>(null);

  const getUserAddress = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      let walletClient = createWalletClient({
        transport: custom(window.ethereum),
        chain: baseSepolia,
      });

      let [address] = await walletClient.getAddresses();
      setAddress(address);
    }
  };

  const convertDeadlineToBigInt = (hoursFromNow: number): bigint => {
    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
    const deadlineInSeconds = currentTimeInSeconds + hoursFromNow * 3600; // Add the selected hours (converted to seconds)
    return BigInt(deadlineInSeconds); // Convert to bigint
  };

  const contract = getContract({
    abi: disputeAbi,
    address: DISPUTE_CONTRACT_ADDRESS,
    client: {
      public: publicClient,
      wallet: walletClient,
    },
  });

  const getDisputes = async (disputeId: number) => {
    //don't know what the actual argument is
    const disputes = await contract.read.disputes([BigInt(disputeId)]);

    return disputes;
  };

  const getDisputeVotes = async (disputeId: number, forDealer: boolean) => {
    //don't know what the actual argument is
    const disputeVotes = await contract.read.disputeVotes([
      BigInt(disputeId),
      forDealer,
    ]);

    return disputeVotes;
  };

  const getDisputeCount = async () => {
    //don't know what the actual argument is
    const disputeCount = await contract.read.disputeCount();

    return disputeCount;
  };

  const getDisputeAttesterVotes = async (
    disputeId: number,
    attester: `0x${string}`,
    forDealer: boolean
  ) => {
    //don't know what the actual argument is
    const disputeAttesterVotes = await contract.read.disputeAttesterVotes([
      BigInt(disputeId),
      attester,
      forDealer,
    ]);

    return disputeAttesterVotes;
  };

  const initiateDispute = async (
    disputeId: number,
    message: string,
    image: string
  ) => {
    let [address] = await walletClient.getAddresses();
    const initiateDispute = await contract.write.initiateDispute(
      [BigInt(disputeId), message, [image]],
      {
        account: address,
      }
    );
  };

  const proposeDispute = async ({
    name,
    message,
    images,
    counterparty,
    token,
    amount,
    deadline,
  }: IProposeDispute) => {
    let [address] = await walletClient.getAddresses();

    const amountInWei = parseEther(amount.toString());

    const proposeDispute = await contract.write.proposeDispute(
      [
        name,
        message,
        images,
        counterparty,
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        amountInWei,
        convertDeadlineToBigInt(deadline),
      ],
      {
        account: address,
      }
    );
  };

  const endDispute = async (disputeId: number) => {
    let [address] = await walletClient.getAddresses();
    const endDispute = await contract.write.endDispute([BigInt(disputeId)], {
      account: address,
    });
  };

  const withdrawProposedDispute = async (disputeId: number) => {
    let [address] = await walletClient.getAddresses();
    const withdrawProposedDispute =
      await contract.write.withdrawProposedDispute([BigInt(disputeId)], {
        account: address,
      });
  };

  //   const getDispute = async (disputeId: number) => {
  //     const dispute = await contract.read({
  //       functionName: "getDispute",
  //       args: [disputeId],
  //     });

  //     return dispute
  //   };

  //   const proposeDispute = async ({
  //     name,
  //     message,
  //     images,
  //     counterparty,
  //     token,
  //     amount,
  //     deadline,
  //   }: IProposeDispute) => {
  //     let walletClient = createWalletClient({
  //       transport: custom(window.ethereum),
  //       chain: baseSepolia,
  //     });

  //     let [address] = await walletClient.getAddresses();
  //     console.log(name, message, images, counterparty, token, amount, deadline);

  //     const amountInWei = parseEther(amount.toString());

  //     console.log(amountInWei);

  //     const tx = await walletClient.writeContract({
  //       address: DISPUTE_CONTRACT_ADDRESS,
  //       abi: disputeAbi,
  //       functionName: "proposeDispute",
  //       account: address,
  //       args: [
  //         name,
  //         message,
  //         images,
  //         counterparty,
  //         "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  //         amountInWei,
  //         convertDeadlineToBigInt(deadline),
  //       ],
  //     });

  //     const receipt = await publicClient.waitForTransactionReceipt({
  //       hash: tx,
  //     });

  //     return receipt;
  //   };

  return {
    address,
    getUserAddress,
    proposeDispute,
    getDisputes,
    initiateDispute,
    endDispute,
    withdrawProposedDispute,
    getDisputeVotes,
    getDisputeCount,
    getDisputeAttesterVotes,
  };
};
