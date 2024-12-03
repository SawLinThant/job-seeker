'use client';
import Nav from '@/components/nav';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import SecondaryButton from '@/components/ui/button/SecondaryButton';
import Input from '@/components/ui/inputs/Input';
import React, { useEffect, useState } from 'react';
import SearchRegionDropdown from './SearchRegionDropdown';
import SearchJobsResponsive from './SearchJobsResponsive';
import Card from '@/components/home/jobs/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dropdown from './Dropdown';
import Image from 'next/image';
import {
  getJobLists,
  useGetCompanySize,
  useGetJobLevel,
  useGetJobTypeList,
  useGetRegions,
  useGetSalaryRange,
  useGetVisaType,
} from '@/services/jobService';

import moment from 'moment';
import Loading from '@/components/ui/loading/Loading';
import { usePagination } from '@/hooks/usePagination';
import { CalendarIcon, DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import EyeOutline from '@/components/icons/eye-outline';
import JobIcon from '@/components/icons/job';
import LocationIcon from '@/components/icons/location';
import Lotting from '@/components/icons/lotting';
import ManyUser from '@/components/icons/Manyuser';
import RightArr from '@/components/icons/rightArr';
import Saveicon from '@/components/icons/Saveicon';
import SecondLogo from '@/components/icons/second';
import { Star } from 'lucide-react';
import { title } from 'process';

const SearchJobs = () => {
  const [jobs, setJobs] = useState<any>([]);

  const [postedDate, setPostedDate] = useState(dayjs(new Date()));
  const [deadlineDate, setDeadLineDate] = useState(dayjs(new Date()));

  const jobPreferences = {
    'job type': [],
    'salary range': [],
    'job level': [],
    'visa type': [],
    region: [],
    'company size': {},
  };

  const [selectedData, setSelectedData] = useState<any>({
    jobType: [],
    salaryRange: [],
    jobLevel: [],
    visaType: [],
    region: [],
    companySize: [],
  });

  // console.log(selectedData)

  const [searchedJobTitle, setSearchedJobTitle] = useState('');
  const [jobTypes, setJobTypes] = useState([]);
  const [salaryRanges, setSalaryRanges] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [companySizes, setCompanySizes] = useState([]);
  const [regions, setRegions] = useState(null);
  const [jobLevels, setJobLevels] = useState([]);

  const { data: jobsType } = useGetJobTypeList();
  const { data: jobsSalary } = useGetSalaryRange();

  const { data: jobsLevel } = useGetJobLevel();
  const { data: jobsVisaType } = useGetVisaType();
  const { data: jobsRegions } = useGetRegions();
  const { data: jobsCompanySize } = useGetCompanySize();
  // console.log('searchedJobTitle', searchedJobTitle);

  useEffect(() => {
    setJobTypes(jobsType?.data);
    setSalaryRanges(jobsSalary?.data);
    setJobLevels(jobsLevel?.data);
    setVisaTypes(jobsVisaType?.data);
    setRegions(jobsRegions?.data);
    setCompanySizes(jobsCompanySize?.data);
  }, [jobsType, jobsSalary, jobsLevel, jobsVisaType, jobsRegions, jobsCompanySize]);

  const isDataUpdated = JSON.stringify(selectedData) !== JSON.stringify(jobPreferences);
  const [searchP, setSearchP] = useState<any>({
    title: '',
    job_type_ids: '',
    salary_range_start: '',
    salary_range_end: '',
    job_level_ids: [],
    visa_type_ids: [],
    posted_date: '',
    expire_date: '',
    region_ids: [],
  });

  // console.log(searchP)
  const filterData = {
    jobType: jobTypes?.map((level: any) => ({
      id: level?.id,
      title: level?.name,
    })),
    salaryRange: salaryRanges?.map((range: any) => ({
      id: range?.id,
      title: `${range?.start} ~ ${range?.end}`,
    })),
    jobLevel: jobLevels?.map((level: any) => ({
      id: level?.id,
      title: level?.name,
    })),
    visaType: visaTypes?.map((type: any) => ({
      id: type?.id,
      title: type?.name,
    })),
    region: [
      { id: 1, title: 'Tokyo' },
      { id: 2, title: 'Shibuya' },
      { id: 3, title: 'Yamato' },
      { id: 4, title: 'Okinawa' },
      { id: 5, title: 'Chugoku' },
      { id: 6, title: 'Tohoku' },
      { id: 7, title: 'Kansai' },
    ],
    companySize: companySizes?.map((item: any) => ({
      id: item.id,
      title: item.name,
    })),
  };

  const handleApply = async () => {
    const params = {
      title: searchedJobTitle,
      job_type_ids: selectedData?.jobType?.map((_: any) => _?.id),
      salary_range_start: selectedData?.salaryRange?.[0]?.value?.[0] || '',
      salary_range_end: selectedData?.salaryRange?.[0]?.value?.[1] || '',
      job_level_ids: selectedData?.jobLevel?.map((_: any) => _?.id),
      visa_type_ids: selectedData?.visaType?.map((_: any) => _?.id),
      region_ids: selectedData?.region?.map((_: any) => _?.id),
      limit: 10,
      // page: page,
    };

    setSearchP(params);

    //  try {
    //     const res = await getJobLists(params);

    //     res.data && setJobs(res?.data);
    //   } catch (e) {
    //     setError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
  };

  useEffect(() => {
    console.log('searchP:', searchP);
  }, [searchP]);

  const {
    paginatedData,
    isReachedEnd,
    loadingMOre,
    size,
    setSize,
    error: paginateError,
    mutate,
  } = usePagination(`/student/job-feed`, searchP);

  return (
    <div>
      <Nav />

      <main className="bg-[#E0F2FE]">
        <SearchJobsResponsive
          JobLists={jobs}
          filterData={filterData}
          selectedData={selectedData}
          setSelectedData={setSelectedData}
          isDataUpdated={isDataUpdated}
          jobPreferences={jobPreferences}
          jobTypes={jobTypes}
          setSize={setSize}
          size={size}
          paginatedData={paginatedData}
          mutate={mutate}
          isReachedEnd={isReachedEnd}
        />
        <div className=" px-8 py-10 max-md:hidden">
          <div className="relative flex w-full  gap-2 lg:gap-5">
            <div className="sticky overflow-y-auto top-0 h-fit max-h-screen bg-[#F5F8FF] w-[40%] no-scrollbar rounded-t-md">
              <div className="bg-[#B9E6FE] px-8 py-6 rounded-t-md">
                <h1 className="text-center text-xl lg:text-2xl text-[#197CC0] font-medium">
                  Job Searching
                </h1>
              </div>
              <div className="px-4 py-10 lg:px-8">
                <div className="relative flex w-full mb-6">
                  <Input
                    placeholder="job title"
                    className="w-full border focus-visible:ring-0 placeholder:text-[#667085]"
                    value={searchedJobTitle}
                    onChange={(e: any) => {
                      setSearchedJobTitle(e.target.value);
                    }}
                  />
                  <div className="bg-[#197CC0] px-4 h-full flex justify-center items-center rounded-r-md absolute top-0 right-0">
                    <button>
                      <Image alt="search" width={20} height={20} src="/icons/search.svg" />
                    </button>
                  </div>
                </div>

                <Dropdown
                  options={jobTypes?.map((level: any) => ({
                    id: level?.id,
                    title: level?.name,
                  }))}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  title="job type"
                  placeholder="Job Type"
                  icon="briefcase"
                  name="jobType"
                />

                <Dropdown
                  options={salaryRanges?.map((range: any) => ({
                    id: range?.id,
                    title: `${range?.start} ~ ${range?.end}`,
                    value: [range?.start, range?.end],
                  }))}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  title="salary range"
                  placeholder="Salary Range"
                  icon="yen"
                  name="salaryRange"
                />

                <Dropdown
                  options={jobLevels?.map((level: any) => ({
                    id: level?.id,
                    title: level?.name,
                  }))}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  title="job level"
                  placeholder="Job Level"
                  icon="barchart"
                  name="jobLevel"
                />

                <Dropdown
                  options={visaTypes?.map((type: any) => ({
                    id: type?.id,
                    title: type?.name,
                  }))}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                  title="visa type"
                  placeholder="Visa Type"
                  icon="passport"
                  name="visaType"
                />

                <div className="my-4">
                  {/* <label className="mb-1 text-sm text-[#344054] font-medium block">
                  Posted Date
                </label> */}
                  {/* <Input value={postedDate} onChange={(e:any)=>{
                  setPostedDate(e.target.value)
                }} type="date" className="w-full border focus-visible:ring-0 placeholder:text-[#667085]" /> */}

                  {/* <DesktopDatePicker

                    value={postedDate}

                    onChange={(e: any) => (
                      setPostedDate(e)
                    )}



                    label="Posted Date"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        fullWidth: true


                      },
                      field: {
                        readOnly: true
                      }
                    }}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    format="DD/MM/YYYY"
                  /> */}
                </div>

                <div className="my-4">
                  {/* <label className="mb-1 text-sm text-[#344054] font-medium">
                  Deadline Date
                </label> */}
                  {/* <Input value={deadlineDate} onChange={(e:any)=>{
                  setDeadLineDate(e.target.value)
                }} type="date" className="w-full border focus-visible:ring-0 placeholder:text-[#667085]" /> */}

                  {/* <DesktopDatePicker

                    value={deadlineDate}

                    onChange={(e: any) => (
                      setDeadLineDate(e)
                    )}



                    label="Deadline Date"
                    slotProps={{
                      textField: {
                        size: "small",
                        variant: "outlined",
                        fullWidth: true


                      },
                      field: {
                        readOnly: true
                      }
                    }}
                    slots={{
                      openPickerIcon: CalendarIcon,
                    }}
                    format="DD/MM/YYYY"
                  /> */}
                </div>

                {/* <div className="my-4">
                <label className="mb-1 text-sm text-[#344054] font-medium">
                  Region
                </label>
                <SearchRegionDropdown
                  filterData={regions}
                  selectedData={selectedData}
                  setSelectedData={setSelectedData}
                />
              </div> */}

                {/* <Dropdown
                options={companySizes?.map((item:any) => ({
                  id: item?.id,
                  title: item?.name,
                }))}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                title="company size"
                placeholder="Company Size"
                icon="building"
                isSelectDropdown={true}
                name="companySize"
              /> */}

                {isDataUpdated && (
                  <div className="flex items-center gap-2 my-4">
                    <SecondaryButton
                      onClick={() => {
                        setPostedDate(dayjs(new Date()));

                        setSearchP({
                          title: '',
                          job_type_ids: '',
                          salary_range_start: '',
                          salary_range_end: '',
                          job_level_ids: [],
                          visa_type_ids: [],
                          posted_date: null,
                          expire_date: '',
                          region_ids: [],
                        });
                      }}
                      className={`text-[#344054] border border-[#D0D5DD] font-semibold px-4 py-2.5 gap-2 w-full text-sm lg:text-base`}
                    >
                      Cancel
                    </SecondaryButton>

                    <PrimaryButton
                      className={`bg-[#197CC0] text-white text-sm font-semibold px-4 py-2.5 w-full`}
                      onClick={handleApply}
                    >
                      Apply
                    </PrimaryButton>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="flex flex-col justify-center  w-full gap-5">
                {/* <div>
                <InfiniteScroll
                  dataLength={jobs.length}
                  next={getJobsFn as any }
                  hasMore={true} // Replace with a condition based on your data source
                  loader={<p>Loading...</p>}
                  endMessage={<p>No more data to load.</p>}
                >
                  <div className='mx-auto w-full'>
                    {jobs?.length > 0 ? (
                      jobs?.map((job:any) => <Card jobData={job} key={job?.id} />)
                    ) : !isLoading && jobs?.length === 0 ? (
                      <p className="text-center lg:text-xl lg:ml-[260px] w-full">
                        No Jobs to find!
                      </p>
                    ) : (
                      <div className="flex justify-center items-center h-[90vh]">
                        <p>Loading...</p>
                      </div>
                    )}
                  </div>
                </InfiniteScroll>
                {error?.message && <p>Error: {error?.message}</p>}
              </div> */}
                {/* <InfiniteScroll
          swr={swr}
          loadingIndicator="Loading..."
          endingIndicator="No more issues! 🎉"
          isReachingEnd={(swr:any) =>
            swr.data?.[0]?.length === 0 || swr.data?.[swr.data?.length - 1]?.length < 10
          }
        >
          {(response:unknown) =>
            response?.map((issue) => (
              <div
                key={issue.id}
                style={{
                  padding: '20px',
                  borderRadius: '8px',
                  border: 'solid #ccc 1px',
                  margin: '20px auto',
                }}
              >
                <div style={{ fontWeight: 700 }}>{issue.title}</div>
                <div style={{ color: '#aaa', marginTop: '8px' }}>
                  {issue.user.login} • {new Date(issue.created_at).toDateString()}
                </div>
              </div>
            ))
          }
        </InfiniteScroll> */}

                <div className="mx-auto w-full">
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
                    endMessage={<p className='w-full text-center'>End of Job List</p>}
                    dataLength={paginatedData?.length ?? 0}
                    scrollableTarget="scrollableDiv"
                  >
                    {paginatedData?.map((job: any) => {
                      return <Card jobData={job} key={job?.id} mutateInfinite={mutate} />;
                    })
                    //   <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
                    //   <div className='flex flex-col gap-4 '>
                    //     <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                    //       <div className='flex items-center  gap-2'>
                    //         <SecondLogo />
                    //         <p className='text-sm'>Nintendo</p>
                    //         <p>Japan, Akita, Daisen</p>
                    //         <LocationIcon />
                    //         <p className='text-[#197CC0]'>Japan, Nagasaki, Isahaya</p>
                    //       </div>
                    //       <div>
                    //         <RightArr />
                    //       </div>
                    //     </div>
                    //     <div className='px-4'>
                    //       <p className='text-sm font-semibold text-wrap mt-2'>Video Game Developer</p>
                    //     </div>
                    //     <div className=' px-4 flex gap-2'>
                    //       <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                    //       <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
                    //     </div>
                    //     <div className='px-4'>
                    //       <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 70,000~300,000 <span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
                    //     </div>
                    //     <div className='flex px-4 flex-wrap justify-between items-center'>
                    //       <p className='text-[#667085]'>Posted 3 mins ago</p>
                    //       <div className='flex items-center gap-2'>
                    //         <Lotting />
                    //         <p>Male</p>
                    //         <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                    //         <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                    //       </div>
                    //     </div>
                    //     <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
                    //     <div className="px-4">
                    //       <div className='flex items-center flex-wrap gap-3 justify-between'>
                    //         <div className="flex items-center gap-2 flex-wrap">
                    //           <Star />
                    //           <p className='text-[#344054]'>4.9</p>
                    //           <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                    //           <EyeOutline />
                    //           <span className="inline-block text-[#667085]">5.3K</span>
                    //           <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                    //           <ManyUser />
                    //           <span className="inline-block text-[#667085]">3.4K Applicants</span>
                    //         </div>
                    //         <div className="flex items-center flex-wrap gap-3">
                    //           <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                    //           <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                    //         </div>
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    }
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchJobs;
