"use client";
import Input from "@/components/ui/inputs/Input";
import Image from "next/image";
import { useState } from "react";

const SearchRegionDropdown:React.FC<any> = ({
  filterData,
  selectedData,
  setSelectedData,
}) => {
  const [regionSearchValue, setRegionSearchValue] = useState<any>("");
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState<any>(false);

  // Ensure filterData and filterData.data are defined before sorting
  const sortedRegion = filterData?.data?.length
    ? filterData.data.sort((a:any, b:any) => {
        const aTitleLower = a.name_en.toLowerCase();
        const bTitleLower = b.name_en.toLowerCase();

        // Check if the element starts with the search letter
        const aStartsWithC = aTitleLower.startsWith(
          regionSearchValue.toLowerCase()
        );
        const bStartsWithC = bTitleLower.startsWith(
          regionSearchValue.toLowerCase()
        );

        // Prioritize elements starting with the search letter
        if (aStartsWithC && !bStartsWithC) {
          return -1;
        } else if (!aStartsWithC && bStartsWithC) {
          return 1;
        }
        // Maintain the original order for other elements
        return 0;
      })
    : [];


  return (
    <div>
      <div
        className={`flex flex-wrap gap-2 px-2.5 py-2 lg:px-4 lg:py-3 my-2 bg-white rounded-md ${
          isSearchDropdownOpen
            ? "border-gray-500 ring-1 ring-gray-300"
            : "border-gray-300"
        }`}
      >
        <Image alt="search-black" width={16} height={16} src="/icons/searchBlack.svg" />

        {selectedData.region.length > 0 &&
          selectedData.region.map((data:any) => (
            <div
              key={data.id}
              className="flex items-center gap-1 px-1 py-[2px] border rounded-md"
            >
              <p className="text-sm lg:text-base">{data.name_en}</p>
              <Image 

              width={50}
              height={50}
                src="/icons/x-close.svg"
                onClick={() =>
                  setSelectedData({
                    ...selectedData,
                    region: selectedData.region.filter(
                      (item:any) => item?.id !== data?.id
                    ),
                  })
                }
                alt="close"
              />
            </div>
          ))}
        <Input
          value={regionSearchValue}
          onFocus={() => setIsSearchDropdownOpen(true)}
          onChange={(e:any) => setRegionSearchValue(e.target.value)}
          placeholder="Search"
          overrideClasses="bg-transparent focus:border-0 focus:ring-0 focus:outline-none w-[80px] text-sm lg:text-base outline-none"
        />
      </div>
      {isSearchDropdownOpen && sortedRegion.length > 0 && (
        <div className="bg-white shadow-md shadow-gray-300 py-[14px] px-2 rounded-md max-h-[300px] overflow-y-scroll no-scrollbar">
          {sortedRegion.map((data:any, index:any) => (
            <div
              key={index}
              className={`${
                selectedData.region.some((item:any) => item.id == data.id) &&
                "bg-[#EFF4FF]"
              } my-2 py-2 px-[6px] flex items-center justify-between`}
              onClick={() =>
                setSelectedData({
                  ...selectedData,
                  region: selectedData.region.some((item:any) => item.id == data.id)
                    ? selectedData.region
                    : [...selectedData.region, data],
                })
              }
            >
              <p className="text-sm lg:text-base">{data.name_en}</p>
              {selectedData.region.some((item:any) => item?.id == data?.id) && (
                <Image alt="check" width={16} height={16} src="/icons/check.svg" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchRegionDropdown;
