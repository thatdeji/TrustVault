"use client";
import { ArrowRight } from "@/svg/arrow-right";
import { Check } from "@/svg/check";
import { Ongoing } from "@/svg/ongoing";
import Link from "next/link";

const Card: React.FC<{
  href: string;
  title: React.ReactNode;
  icon: React.ReactNode;
  number: string;
}> = ({ href, title, icon, number }) => (
  <Link
    href={href}
    className="bg-white min-h-[158px] px-9 card flex-row flex items-center justify-between"
  >
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <h3 className="text-2xl font-normal text-[#1F1F1F]">{title}</h3>
    </div>
    {/* <div className="flex items-center gap-4 justify-between flex-grow"> */}
    <p className="ml-7 text-5xl font-normal text-[#1F1F1F]">{number}</p>
    {/* </div> */}
    <div className="w-[23px] h-[25px]">
      <ArrowRight />
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      <div className="lg:col-span-1 bg-white p-6 card">
        <h2 className="text-3xl text-[#1F1F1F] font-medium mb-4">
          Escrow service <br /> made easy
        </h2>
        <p className="text-lg text-[rgba(31,_31,_31,_0.67)] mb-8">
          You’re a step away from a secure <br /> payment means on Blockchain
          Network
        </p>
        <button className="button w-fit">Create a deal</button>
      </div>

      <div className="grid lg:col-span-1 grid-cols-1 gap-4">
        <Card
          href="/deals"
          icon={<Ongoing />}
          number="02"
          title={
            <>
              Ongoing <br /> deals
            </>
          }
        />
        <Card
          href="/deals"
          icon={<Check />}
          number="04"
          title={
            <>
              Completed <br /> deals
            </>
          }
        />
      </div>
      <div className="lg:col-span-3 px-12  p-6 card">
        <h2 className="text-3xl text-[#1F1F1F] font-medium ">
          Recent Activity
        </h2>
      </div>
    </div>
  );
}
