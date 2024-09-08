"use client";
import { Close } from "@/svg/close";
import { Dialog, DialogPanel } from "@headlessui/react";

const Modal: React.FC<{
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}> = ({ isOpen, close, children }) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[9998] focus:outline-none"
      onClose={close}
    >
      <div className="fixed top-0 left-0  z-[9998]  w-screen h-screen overflow-y-auto">
        <div className="relative flex min-h-full items-center justify-center p-4">
          <div className="bg-[rgba(31,_31,_31,_0.67)] backdrop-blur-[2px] absolute top-0 left-0 w-full min-h-full" />
          <DialogPanel
            transition
            className="w-full relative max-w-[757px] bg-[#FAFAFA] p-3 md:p-12 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div>
              <button
                className="absolute top-4 right-4 md:top-[30px] md:right-[30px] w-4 h-4 md:w-6 md:h-6"
                onClick={close}
              >
                <Close />
              </button>
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
