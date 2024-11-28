"use client";

import Image from "next/image";
import { useState } from "react";

const RDropdown:React.FC<any> = ({
  icon,
  options,
  selectedData,
  setSelectedData,
  title,
  isSelectDropdown,
}) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="mb-6">
      <div
        className={`flex items-center px-2.5 py-2 lg:px-[14px] lg:py-2.5 justify-between w-full rounded-md my-2 text-sm lg:text-base font-medium ${
          isOpen ? "bg-white text-[#101828]" : "bg-[#197CC0] text-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-1 lg:gap-2">
          <Image alt="ggsgd" width={20} height={20} src={`/icons/${isOpen ? icon + "Blue" : icon + "White"}.svg`} />
          <h1 className="capitalize">{title}</h1>
        </div>
        <div className={`${isOpen && "rotate-180"}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke={isOpen ? "blue" : "white"}
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {isOpen &&
        (isSelectDropdown ? (
          <div className="bg-white shadow-md shadow-gray-300 p-[14px] rounded-md">
            {options?.map((option:any, index:number) => (
              <div
                key={index}
                onClick={() =>{
  //  setSelectedData({
  //                   ...selectedData,
  //                   [title]: option,
  //                 })
                }
               
                }
                className="flex items-center gap-2 py-3"
              >
                <div>
                  {selectedData[title]?.id == option.id ? (
                    <Image alt="fill" width={18} height={18} src="/images/selectboxfill.svg" />
                  ) : (
                    <Image alt="fill" width={18} height={18} src="/images/selectbox.svg" />
                  )}
                </div>
                <p className="text-sm">{option?.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md shadow-gray-300 p-[14px] rounded-md">
            {options?.map((option:any, index:number) => (
              <div className="relative py-3" key={index}>
                <div className="flex items-center gap-2">
                  {selectedData[title]?.some((item:any) => item?.id === option?.id) ? (
                    <Image alt="check_base" width={18} height={18} src="/images/_Checkbox base.svg" />
                  ) : (
                    <Image alt="check_base" width={18} height={18} src="/images/_Checkbox base (1).svg" />
                  )}
                  <label className="text-sm ms-5">{option?.title}</label>
                </div>

                <div
                  className="absolute opacity-0 top-2 left-1"
                  onClick={() => {
                    if (
                      selectedData[title]?.some((item:any) => item?.id == option?.id)
                    ) {
                      // setSelectedData({
                      //   ...selectedData,
                      //   [title]: selectedData[title]?.filter(
                      //     (item:any) => item?.id !== option?.id
                      //   ),
                      // });
                    } else {
                      // setSelectedData({
                      //   ...selectedData,
                      //   [title]: [...selectedData[title], option],
                      // });
                    }
                  }}
                >
                  <input type="checkbox" />
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default RDropdown;
