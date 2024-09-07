"use client";

const DashboardHeader: React.FC = () => {
  //connect wallet code goes here

  return (
    <header className="py-7 px-16 flex items-center justify-end shadow-header bg-[#F6F6F7]">
      <button className="button">Connect Wallet</button>
    </header>
  );
};

export default DashboardHeader;
