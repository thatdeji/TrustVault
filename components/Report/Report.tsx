import Link from "next/link";

const Report: React.FC<{
  party: "buyer" | "seller";
  message: string;
  images: string[];
}> = ({ party, message, images }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 w-full bg-[#FFF] border border-[#D9D9D9] py-5 md:py-8 px-4 md:px-6">
        <p className="text-lg md:text-xl text-[#1F1F1F] font-medium mb-5 md:mb-7">
          {party === "buyer" ? "Buyer’s Report" : "Seller’s Report"}
        </p>
        <p className="text-sm md:text-base text-[#1F1F1F] font-normal">
          {message}
        </p>
      </div>
      <div className="border-dashed border bg-[#FFF]  py-5 md:py-8 px-4 md:px-6 border-[#B3B3B3] flex flex-col gap-10 items-center justify-between">
        <div className="flex flex-col gap-3">
          {images.map((image, index) => (
            <Link
              className="text-sm md:text-base text-[#5F4E3C] underline font-light"
              key={index}
              href={image}
            >
              {`Image 0${index + 1}`}
            </Link>
          ))}
        </div>
        <p className="text-xs md:text-sm text-[rgba(31,_31,_31,_0.67)] font-light">
          Attached Evidence (Click to preview)
        </p>
      </div>
    </div>
  );
};

export default Report;
