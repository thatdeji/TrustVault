export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="md:col-span-2 bg-white p-6 card">
        <h2 className="text-3xl text-[#1F1F1F] font-medium mb-4">
          Escrow service <br /> made easy
        </h2>
        <p className="text-lg text-[rgba(31,_31,_31,_0.67)] mb-8">
          You’re a step away from a secure payment means on Blockchain Network
        </p>
        <button className="button w-fit">Create a deal</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white min-h-[158px] px-6 card flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500">Ongoing deals</h3>
            <span className="text-4xl font-bold">02</span>
          </div>
          <div className="text-xl"> ➔</div>
        </div>

        <div className="bg-white min-h-[158px] px-6 card flex items-center justify-between">
          <div>
            <h3 className="text-sm text-gray-500">Completed deals</h3>
            <span className="text-4xl font-bold">04</span>
          </div>
          <div className="text-xl">{/* Add icon for next/arrow here */} ➔</div>
        </div>
      </div>
      {/* <div className="md:col-span-3 bg-white p-6 card">
        <h2 className="text-xl font-bold">Recent Activity</h2>
      </div> */}
    </div>
  );
}
