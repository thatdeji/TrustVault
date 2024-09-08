"use client";
import Report from "@/components/Report/Report";
import { ArrowRight } from "@/svg/arrow-right";
import { Check } from "@/svg/check";
import Link from "next/link";
import { useState } from "react";

export default function SingleDispute() {
  const [vote, setVote] = useState<"buyer" | "seller" | null>(null);
  return (
    <div className="w-full mt-7 md:mt-12">
      <div className="flex items-center gap-3 mb-5 md:mb-10">
        <Link
          href={"/settlers"}
          className="text-[rgba(31,_31,_31,_0.87)] text-sm md:text-base font-medium hover:underline"
        >
          Disputes
        </Link>
        <div className="w-5 h-[19px]">
          <ArrowRight />
        </div>
        <p className="rgba(31,_31,_31,_0.47) text-sm md:text-base font-medium">
          [Organic Beauty Product Box]
        </p>
      </div>
      <div className="flex gap-4 flex-wrap justify-between items-center mb-3 md:mb-4">
        <div className="flex items-center gap-8">
          <p className="text-xl text-[#1F1F1F] font-medium">
            [Organic Beauty Product Box]
          </p>
          <p className="h-6 py-1 px-5 flex items-center justify-center bg-[#00965E] rounded-[16px] md:rounded-[20px] text-sm md:text-base text-white">
            Active
          </p>
        </div>
        <p className="text-lg text-[rgba(31,_31,_31,_0.67)] font-normal">
          Ends in 10 hours
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-5 md:mb-6 gap-6">
        <div>
          <Report
            images={[]}
            message={`I thought I'd found the perfect anniversary gift for my partner—a sleek watch that looked amazing online. Weeks passed with no delivery and no response from the seller. Our anniversary came and went. When the package finally arrived days late, I tore it open eagerly. My heart sank. Inside was a cheap plastic knockoff, nothing like the elegant timepiece advertised. Everything about it was inferior—from the scratched face to the flimsy strap. Defeated, I slumped onto the couch. I'd have to start my gift search all over again, this time avoiding those deceptive product photos. Sometimes, the old-fashioned way of shopping is worth the effort.`}
            party="buyer"
          />
        </div>
        <div>
          <Report
            images={[]}
            message={`I thought I'd found the perfect anniversary gift for my partner—a sleek watch that looked amazing online. Weeks passed with no delivery and no response from the seller. Our anniversary came and went. When the package finally arrived days late, I tore it open eagerly. My heart sank. Inside was a cheap plastic knockoff, nothing like the elegant timepiece advertised. Everything about it was inferior—from the scratched face to the flimsy strap. Defeated, I slumped onto the couch. I'd have to start my gift search all over again, this time avoiding those deceptive product photos. Sometimes, the old-fashioned way of shopping is worth the effort.`}
            party="seller"
          />
        </div>
      </div>
      <div className="bg-[#FFF] w-full border border-[#D9D9D9] min-h-[250px] py-5 px-6 md:px-8 flex flex-col md:flex-row justify-center gap-4 md:gap-12 items-center">
        <p className="text-xl md:text-2xl font-bold text-[rgba(31,_31,_31,_0.87)] ">
          Cast <br className="hidden lg:block" /> your vote
        </p>
        <div className="flex flex-col gap-4 w-full flex-grow max-w-[492px]">
          <div className="w-full flex gap-3">
            <button
              className={`button flex-1 flex items-center justify-center gap-4 bg-white ${
                vote === "buyer" ? " " : "opacity-40"
              }`}
              onClick={() => {
                setVote("buyer");
              }}
            >
              <span>Buyer</span>
              {vote === "buyer" ? (
                <div className="w-4 h-4">
                  <Check />
                </div>
              ) : null}
            </button>
            <button
              className={`button flex-1 flex items-center justify-center gap-4 bg-white ${
                vote === "seller" ? " " : "opacity-40"
              }`}
              onClick={() => {
                setVote("seller");
              }}
            >
              <span>Seller</span>
              {vote === "seller" ? (
                <div className="w-4 h-4">
                  <Check />
                </div>
              ) : null}
            </button>
          </div>
          <button disabled={vote === null} className="button w-full">
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}
