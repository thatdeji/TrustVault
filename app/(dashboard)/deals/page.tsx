"use client";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import Modal from "@/components/Modal/Modal";
import SuccessMessage from "@/components/SuccessMessage/SuccessMessage";
import { Copy } from "@/svg/copy";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import DisputedTab from "@/components/DisputedTab/DisputedTab";
import { useSearchParams } from "next/navigation";
import { useWeb3 } from "@/context/useWeb3";
import { Progress } from "@/svg/progress";
import { Check } from "@/svg/check";
import { Disputed } from "@/svg/disputed";

const initialFormState = {
  dealName: "",
  disputeFee: "",
  address: "",
  deadline: "0",
  message: "",
};

export default function Deals() {
  const [isOpenDisputeModal, setIsOpenDisputeModal] = useState(false);
  const [url, setUrl] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formState, setFormState] = useState(initialFormState);
  const [selectedTab, setSelectedTab] = useState(0);

  const searchParams = useSearchParams();

  const { address, getUserAddress, proposeDispute, getDisputeCount } =
    useWeb3();

  function open() {
    setIsOpenDisputeModal(true);
  }

  function close() {
    setIsOpenDisputeModal(false);
    setIsSuccess(false);
  }

  useEffect(() => {
    async () => {
      const disputeCount = await getDisputeCount();
      console.log(disputeCount);
    };
    const disputeId = searchParams.get("disputeId");
    if (disputeId) {
      setSelectedTab(2);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setFormState(initialFormState);
    // setIsSuccess(true);
    proposeDispute({
      name: formState.dealName,
      message: formState.message,
      images: [url],
      counterparty: formState.address as `0x${string}`,
      token: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
      amount: parseFloat(formState.disputeFee),
      deadline: parseInt(formState.deadline) * 3600,
    });
  };

  return (
    <div className="w-full">
      <Modal isOpen={isOpenDisputeModal} close={close}>
        {!isSuccess ? (
          <>
            <h1 className="mt-8 mb-12 text-center text-3xl md:text-4xl font-medium text-[#1F1F1F]">
              Create dispute
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
              <button className="button">Create dispute</button>
            </form>
          </>
        ) : (
          <SuccessMessage
            message="Your dispute has been created! Please copy the link and share to the counter party to sign"
            title="Successfully created!"
            extraNode={
              <div className="mt-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://trustvault/deals?disputeId=23"
                    );
                    toast.success("Link copied to clipboard");
                  }}
                  className="button bg-white flex items-center gap-2"
                >
                  https://trustvault/dispute/0001
                  <div className="w-5 h-[19px]">
                    <Copy />
                  </div>
                </button>
              </div>
            }
          />
        )}
      </Modal>
      <article className="w-full">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center mb-10">
          {" "}
          <h1 className="text-2xl md:text-3xl font-medium">My Deal(s)</h1>
          <button onClick={open} className="button">
            Create a dispute
          </button>
        </div>
        <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
          <TabList className="w-full px-5 border-b border-[rgba(31,_31,_31,_0.47)] flex gap-9 overflow-x-auto">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    !selected
                      ? "text-[rgba(31,_31,_31,_0.47)] "
                      : "text-[rgba(31,_31,_31,_0.87)] border-b-2 border-b-[#5F4E3C]"
                  }
                 text-base md:text-lg flex items-center gap-3 py-2 px-4 md:py-3 md:px-7 font-semibold focus-within:outline-none`}
                >
                  Ongoing deal(s)
                  <div className="w-4 h-4 md:w-7 md:h-7">
                    <Progress />
                  </div>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    !selected
                      ? "text-[rgba(31,_31,_31,_0.47)] "
                      : "text-[rgba(31,_31,_31,_0.87)] border-b-2 border-b-[#5F4E3C]"
                  }
                 text-base md:text-lg flex items-center gap-3 py-2 px-4 md:py-3 md:px-7 font-semibold focus-within:outline-none`}
                >
                  {" "}
                  Completed deal(s)
                  <div className="w-4 h-4 md:w-7 md:h-7">
                    <Check />
                  </div>
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    !selected
                      ? "text-[rgba(31,_31,_31,_0.47)] "
                      : "text-[rgba(31,_31,_31,_0.87)] border-b-2 border-b-[#5F4E3C]"
                  }
                 text-base md:text-lg flex items-center gap-3 py-2 px-4 md:py-3 md:px-7 font-semibold focus-within:outline-none`}
                >
                  {" "}
                  Disputed
                  <div className="w-4 h-4 md:w-7 md:h-7">
                    <Disputed />
                  </div>
                </button>
              )}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel></TabPanel>
            <TabPanel>Content 2</TabPanel>
            <TabPanel>
              <DisputedTab />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </article>
    </div>
  );
}
