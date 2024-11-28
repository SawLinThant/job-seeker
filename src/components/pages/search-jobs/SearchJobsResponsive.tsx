'use client';
import { useState } from 'react';
import Link from 'next/link';

import FilterResponsive from './FilterResponsive';
import Image from 'next/image';
import Input from '@/components/ui/inputs/Input';
import Card from '@/components/home/jobs/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/ui/loading/Loading';

const SearchJobsResponsive: React.FC<any> = ({
  JobLists,
  filterData,
  selectedData,
  setSelectedData,
  isDataUpdated,
  jobPreferences,
  setSize,
  size,
  paginatedData,
  mutate,
  isReachedEnd,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchedJobTitle, setSearchedJobTitle] = useState('');
  return (
    <div className="px-4 py-6 md:hidden">
      <div className="flex flex-col items-center gap-6 px-4 py-6 text-center bg-white">
        <h1 className="capitalize text-3xl font-medium text-[#1D2939]">
          Start your dream via jplus
        </h1>
        <p className="text-sm text-[#1D2939]">Popular Job : Engineering, Game Developer, Nursing</p>
      </div>
      <div className="flex w-full gap-2 my-6">
        <div className="relative grow">
          <Input
            value={searchedJobTitle}
            onChange={(e: any) => setSearchedJobTitle(e.target.value)}
            className="pl-10 pe-[14px] py-2 w-full border focus-visible:ring-0 placeholder:text-[#667085]"
            placeholder="Job Title"
          />
          <Image
            alt="black"
            width={18}
            height={18}
            src="/icons/searchBlack.svg"
            className="absolute top-2.5 left-3"
          />
        </div>

        <div onClick={() => setIsFilterOpen(true)} className="px-[14px] py-2 bg-white rounded-lg">
          <Image src="/icons/filter.svg" alt="filter" width={20} height={20} />
        </div>

        <FilterResponsive
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          filterData={filterData}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isDataUpdated={isDataUpdated}
          jobPreferences={jobPreferences}
        />
      </div>

      <InfiniteScroll
        next={() => {
          setSize(size + 1);
        }}
        hasMore={!isReachedEnd}
        loader={
          <div className="flex w-full justify-center overflow-hidden pt-5">
            <Loading color="#197CC0" />
          </div>
        }
        endMessage={<p></p>}
        dataLength={paginatedData?.length ?? 0}
        scrollableTarget="scrollableDiv"
      >
        {paginatedData?.map((job: any) => {
          return <Card jobData={job} key={job?.id} mutateInfinite={mutate} />;
        })}
      </InfiniteScroll>
    </div>
  );
};

export default SearchJobsResponsive;
