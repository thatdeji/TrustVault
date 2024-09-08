"use client";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import Modal from "@/components/Modal/Modal";
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import { useWeb3 } from "@/context/useWeb3";
import {
  bigintToIndexes,
  convertBigIntToHours,
} from "@/utils/helper-functions";
import { IDispute } from "@/utils/helper-types";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
// import toast from "react-hot-toast";

const initialFormState = {
  dealName: "",
  disputeFee: "",
  address: "",
  deadline: "0",
  message: "",
};

export default function DisputedTab() {
  const [isOpenDisputeModal, setIsOpenDisputeModal] = useState(false);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [disputes, setDisputes] = useState<
    (IDispute & {
      amount: number;
    })[]
  >([]);
  const [disputeId, setDisputeId] = useState<number | null>(null);

  const { address, initiateDispute, getDisputeCount, getDisputes } = useWeb3();

  const searchParams = useSearchParams();
  // const disputes = [
  //   {
  //     name: "Organic Beauty Product Box",
  //     initiationTime: "1hr 35mins ago",
  //     status: "Awaiting Sign",
  //     statusColor: "bg-[#E6E6E6] text-[#202223]",
  //     createdBy: "(0x3FfB...4a25e)",
  //     disputeFee: "$10",
  //   },
  //   {
  //     name: "Website Redesign/retouch",
  //     initiationTime: "10mins ago",
  //     status: "Party Signed",
  //     statusColor:
  //       "bg-[rgba(204,_255,_236,_0.67)] text-[rgba(0,_150,_94,_0.67)]",
  //     createdBy: "(0x23fG...9c7f)",
  //     disputeFee: "$50",
  //   },
  // ];

  useEffect(() => {
    const fetchDisputes = async () => {
      const count = await getDisputeCount();
      console.log(bigintToIndexes(count));
      const indexes = bigintToIndexes(count);
      const disputes = await Promise.all(
        indexes.map((index) => getDisputes(index))
      );
      const mappedAndFilteredDisputes = disputes
        .map((dispute) => ({
          name: dispute[0],
          dealerAddress: dispute[1],
          dealerMessage: dispute[2],
          counterpartyAddress: dispute[3],
          counterpartyMessage: dispute[4],
          status: dispute[7],
          deadline: convertBigIntToHours(dispute[9]),
          amount: Number(dispute[6]),
        }))
        .filter(
          (dispute) =>
            dispute.dealerAddress === address ||
            dispute.counterpartyAddress === address
        );
      setDisputes(mappedAndFilteredDisputes);
    };
    if (address) {
      fetchDisputes();
    }
  }, [address]);

  useEffect(() => {
    const disputeId = searchParams.get("disputeId");
    if (disputeId && disputes.length) {
      setIsOpenDisputeModal(true);
      const dispute = disputes.find(
        (dispute, index) => index === parseInt(disputeId)
      );
      if (dispute) {
        setFormState({
          dealName: dispute.name,
          disputeFee: `${dispute.amount}`,
          address: dispute.counterpartyAddress,
          deadline: `${dispute.deadline}`,
          message: "",
        });
        open();
        setDisputeId(Number(disputeId));
      }
    }
  }, [disputes]);

  function open() {
    setIsOpenDisputeModal(true);
  }

  function close() {
    setIsOpenDisputeModal(false);
    setIsSuccess(false);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (disputeId) {
      setIsLoading(true);
      await initiateDispute(disputeId, formState.message, url);
      setIsSuccess(true);
      setIsLoading(false);
      setFormState(initialFormState);
    }
  };

  return (
    <div className="my-8 p-4 md:p-6 bg-[#FFF] w-full ">
      <Modal isOpen={isOpenDisputeModal} close={close}>
        {!isSuccess ? (
          <>
            <h1 className="mt-8 mb-12 text-center text-3xl md:text-4xl font-medium text-[#1F1F1F]">
              Dispute To Sign
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-6"
            >
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col flex-1 gap-4">
                  <label className="label" htmlFor="dealName">
                    Deal Name*
                  </label>
                  <input
                    required
                    disabled
                    className="input"
                    type="text"
                    id="dealName"
                    name="dealName"
                    onChange={(e) => {
                      setFormState({ ...formState, dealName: e.target.value });
                    }}
                    value={formState.dealName}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label className="label" htmlFor="disputeFee">
                    Dispute Fee*
                  </label>
                  <input
                    required
                    disabled
                    className="input"
                    type="text"
                    id="disputeFee"
                    name="disputeFee"
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        disputeFee: e.target.value,
                      });
                    }}
                    value={formState.disputeFee}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex flex-col flex-1 gap-4">
                  <label className="label" htmlFor="address">
                    Counter Party Address*
                  </label>
                  <input
                    required
                    disabled
                    className="input"
                    type="text"
                    id="address"
                    name="address"
                    onChange={(e) => {
                      setFormState({ ...formState, address: e.target.value });
                    }}
                    value={formState.address}
                  />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                  <label className="label" htmlFor="deadline">
                    Dispute Deadline*
                  </label>
                  <select
                    required
                    disabled
                    onChange={(e) => {
                      setFormState({ ...formState, deadline: e.target.value });
                    }}
                    value={formState.deadline}
                    className="input"
                    id="deadline"
                    name="deadline"
                  >
                    {new Array(23).fill(0).map((_, i) => (
                      <option key={i} value={i}>
                        {i + 1} hrs
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col flex-1 gap-4">
                <label className="label" htmlFor="message">
                  Message*
                </label>
                <textarea
                  required
                  className="textarea"
                  id="message"
                  name="message"
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                  }}
                  value={formState.message}
                ></textarea>
              </div>
              <ImageUpload
                setUrl={(url) => {
                  setUrl(url);
                }}
                url={url}
              />
              <button disabled={isLoading} className="button">
                Sign Dispute
              </button>
            </form>
          </>
        ) : (
          <SuccessMessage
            message="The dispute has been signed and now open for the community to decide"
            title="Successfully Signed!"
          />
        )}
      </Modal>
      {/* Table Header */}
      <div className="w-full">
        <div className="grid grid-cols-5 text-left font-medium text-gray-600 mb-2 w-full">
          <h3 className="text-base md:text-lg font-light text-[rgba(31,_31,_31,_0.87)]">
            Deal Name
          </h3>
          <h3 className="text-base md:text-lg font-light text-[rgba(31,_31,_31,_0.87)]">
            Deadline
          </h3>
          <h3 className="text-base md:text-lg font-light text-[rgba(31,_31,_31,_0.87)]">
            Status
          </h3>
          <h3 className="text-base md:text-lg font-light text-[rgba(31,_31,_31,_0.87)]">
            Created By
          </h3>
          <h3 className="text-base md:text-lg font-light text-[rgba(31,_31,_31,_0.87)]">
            Dispute Fee
          </h3>
        </div>

        {/* Divider */}
        <hr className="my-2 bg-[rgba(31,_31,_31,_0.47)] h-[0.5px] w-full" />

        {/* Table Rows */}
        {disputes.map((dispute, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center pt-6 w-full cursor-pointer"
            onClick={() => {
              dispute.status &&
                setFormState({
                  dealName: dispute.name,
                  disputeFee: dispute.amount.toString(),
                  address: dispute.counterpartyAddress,
                  deadline: dispute.deadline.toString(),
                  message: "",
                });
              setDisputeId(index);
              dispute.status && open();
            }}
          >
            <p className="text-base md:text-lg font-light underline">
              {dispute.name}
            </p>
            <p className="text-base md:text-lg font-light">
              {dispute.deadline} hrs
            </p>

            <p>
              <span
                className={`px-2 py-1 rounded-[20px] font-medium text-sm ${
                  !dispute.status
                    ? "bg-[#E6E6E6] text-[#202223]"
                    : "bg-[rgba(204,_255,_236,_0.67)] text-[rgba(0,_150,_94,_0.67)]"
                }`}
              >
                {dispute.status ? "Party Signed" : "Awaiting Sign"}
              </span>
            </p>

            <p className="text-base md:text-lg font-light">
              {dispute.dealerAddress}
            </p>
            <p className="text-base md:text-lg font-light">{dispute.amount}</p>

            {/* Divider between rows */}
            {index !== disputes.length - 1 && (
              <hr className="col-span-5 my-6 bg-[rgba(31,_31,_31,_0.47)] h-[0.5px] w-[1436px] overflow-x-scroll" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
