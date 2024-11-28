"use client";
import { useState } from "react";

import SuccessOffcanvas from "./SuccessOffcanvas";
import Image from "next/image";
import SecondaryButton from "@/components/ui/button/SecondaryButton";
import PrimaryButton from "@/components/ui/button/PrimaryButton";

const ApplyJobOffcanvas:React.FC<any> = ({
  currentJob,
  isOffcanvasOpen,
  setIsOffcanvasOpen,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null);
  const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);

  return (
    <div className="md:hidden">
      {currentJob?.timeSlot === null ? (
        <SuccessOffcanvas
          isOffcanvasOpen={isOffcanvasOpen}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
        />
      ) : isTimeSlotSelected ? (
        <SuccessOffcanvas
          isOffcanvasOpen={isOffcanvasOpen}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
        />
      ) : (
        <div className={`${isTimeSlotSelected ? "hidden" : ""}`}>
          <div
            onClick={() => setIsOffcanvasOpen(false)}
            className={`bg-[#475467] opacity-80 fixed w-full h-full top-0 left-0 backdrop-blur-xl z-40 ${
              isOffcanvasOpen ? "" : "hidden"
            }`}
          >
            <></>
          </div>
          <div
            className={`bg-white w-full transition-all duration-500 fixed bottom-0 left-0 rounded-t-3xl z-50 ${
              isOffcanvasOpen ? "h-[606px]" : "h-0 "
            }`}
          >
            <div className="flex flex-col items-center p-6">
              <div className="flex justify-end w-full mb-5">
                <Image alt="gsgds" width={20} height={20}
                  src="/icons/x-close-blue.svg"
                  onClick={() => setIsOffcanvasOpen(false)}
                />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <Image alt="gsgds" width={20} height={20} src="/icons/check-circle-blue.svg" />
                <h1 className="text-base font-bold text-[#1D2939] text-center">
                  Select a Time Slot
                </h1>
              </div>
              <p className="text-sm text-[#475467] text-center mb-8">
                Please pick a possible time slot for the interview with your job
                owner soon.
              </p>
              <div className="flex flex-col gap-6 mb-8">
                {currentJob?.timeSlot?.map((data:any, index:any) => (
                  <div
                    onClick={() => setSelectedTimeSlot(data)}
                    key={index}
                    className={`w-full ${
                      selectedTimeSlot?.id == data.id
                        ? "bg-[#197CC0] text-white"
                        : "bg-[#F3F4F6] text-[#1D2939]"
                    } hover:bg-[#197CC0] hover:text-white rounded-md w-[180px] text-center py-5`}
                  >
                    <p className="text-sm">{data.date}</p>
                    <p className="text-lg font-semibold">{data.time}</p>
                  </div>
                ))}
              </div>
              <div className="flex w-full gap-8">
                <SecondaryButton
                  onClick={() => setIsOffcanvasOpen(false)}
                  className="py-2.5 w-full text-sm font-semibold"
                >
                  Cancel
                </SecondaryButton>
                <PrimaryButton
                  onClick={() => setIsTimeSlotSelected(true)}
                  className="py-2.5 w-full text-sm font-semibold"
                >
                  Done
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJobOffcanvas;
