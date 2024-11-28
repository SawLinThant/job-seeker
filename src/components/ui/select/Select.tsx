'use client';
import { useState } from 'react';

const Select: React.FC<any> = ({
  options,
  placeholder,
  className,
  overrideClasses,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={
          overrideClasses
            ? overrideClasses
            : `${className} flex gap-2 justify-between items-center rounded-md shadow-sm border-gray-300 focus:border-gray-500 focus:ring-4 focus:ring-gray-300 focus:outline-none px-3 py-2 lg:px-4 lg:py-3`
        }
      >
        <h1 className={`${selectedOption ? 'text-[#1D2939]' : 'text-[#667085]'}`}>
          {selectedOption ? selectedOption.name : placeholder}
        </h1>
        <div className={`${isOpen && 'rotate-180'}`}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="black"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="relative z-[5000]">
          <div className="absolute z-[5000] w-full overflow-y-auto h-[140px] p-2 bg-white border border-gray-300 rounded-md shadow-sm top-2 ">
            {options?.map((option: any, index: number) => (
              <div
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                key={option.id}
                className={`px-3 py-2 my-1 hover:bg-[#EFF4FF] rounded-md text-sm cursor-pointer `}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
