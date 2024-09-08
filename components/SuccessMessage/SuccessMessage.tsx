import { Success } from "@/svg/success";

const SuccessMessage: React.FC<{
  title: string;
  message: string;
  extraNode?: React.ReactNode;
}> = ({ title, message, extraNode }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="w-[100px] h-[100px]">
        <Success />
      </div>
      <h1 className="text-3xl md:text-4xl text-[#1F1F1F] text-center">
        {title}
      </h1>
      <p className="text-center text-base md:text-lg font-normal text-[#1F1F1F] max-w-[450px]">
        {message}
      </p>
      {extraNode}
    </div>
  );
};

export default SuccessMessage;
