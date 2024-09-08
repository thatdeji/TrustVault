"use client";
import { useState, Fragment } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Link from "next/link";
import { Progress } from "@/svg/progress";
import { Check } from "@/svg/check";

export default function Settler() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="w-full">
      <h1 className="mt-8 mb-12 text-3xl md:text-4xl font-medium text-[#1F1F1F]">
        Global Disputes
      </h1>

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
                <span>Active Disputes</span>
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
                Participated Disputes
                <div className="w-4 h-4 md:w-7 md:h-7">
                  <Check />
                </div>
              </button>
            )}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-8 md:mt-12 flex flex-col gap-4 md:gap-6">
              <Link
                href={"/settlers/1"}
                className="bg-[#FFF] w-full py-3 md:py-9 px-6 md:px-12"
              >
                <div className="flex gap-5 items-center justify-between mb-6 md:mb-8">
                  {" "}
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 md:w-7 md:h-7 bg-[#D9D9D9] rounded-full" />
                    <p className="text-base md:text-lg font-normal">
                      0x....7822800
                    </p>
                  </div>
                  <p className="h-6 py-1 px-5 flex items-center justify-center bg-[#00965E] rounded-[16px] md:rounded-[20px] text-sm md:text-base text-white">
                    Active
                  </p>
                </div>
                <p className="text-lg md:text-xl text-[#1F1F1F] mb-3 md:mb-4 font-medium">
                  [Organic Beauty Product Box]
                </p>
                <p className=" mb-4 md:mb-6 text-base md:text-lg">
                  Item received does not match product description. Color is
                  navy blue instead of black as advertised. Requesting full
                  refund or replacement with correct item.
                </p>
                <p className="text-sm md:text-base text-[rgba(31,_31,_31,_0.67)]">
                  Ends in 10 hours
                </p>
              </Link>
            </div>
          </TabPanel>
          <TabPanel></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
