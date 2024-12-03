'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import fetcher from '@/lib/fetcher';
//import useSWR from 'swr';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import Image from 'next/image';
import Card from './Card';
import Input from '@/components/ui/inputs/Input';
import {
  useGetJobList,
  useGetJobTypeList,
  useGetPopularJobTitle,
  useGetSalaryRange,
} from '@/services/jobService';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import FirstLogo from '@/components/icons/firstLogo';
import RightArr from '@/components/icons/rightArr';
import LocationIcon from '@/components/icons/location';
import Lotting from '@/components/icons/lotting';
import Star from '@/components/icons/star';
import EyeOutline from '@/components/icons/eye-outline';
import ManyUser from '@/components/icons/Manyuser';
import { SaveIcon } from 'lucide-react';
import Saveicon from '@/components/icons/Saveicon';
import JobIcon from '@/components/icons/job';
import SecondLogo from '@/components/icons/second';
import Bar from '@/components/icons/bar';
import Eye from '@/components/icons/eye';
import { useRouter } from 'next/navigation';
import CTA from '../cta';
const Jobs = () => {
  const { t, i18n } = useTranslation();
  let currentLocale = i18n.language;

  const [jobSearchTitle, setJobSearchTitle] = useState<string>('');
  const [jobSearchType, setJobSearchType] = useState<string[]>([]);

  const { data: jobTyeList } = useGetJobTypeList();
  const { data: popularJobTitle } = useGetPopularJobTitle();
  console.log('popularJobTitle', popularJobTitle);

  const jobTyeListOption = jobTyeList?.data?.map((_: any) => ({
    label: _?.name,
    value: _?.id,
  }));

  const { data: jobLists } = useGetJobList(
    { pageIndex: 0, pageSize: 4 },
    jobSearchTitle,
    jobSearchType
  );

  const [jobTitle, setJobTitle] = useState<string>('');
  const [jobType, setJobType] = useState<any>([]);

  const router = useRouter();

  const handleRoute = (id: string) => {
    router.push(`/jobs/${1}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const idArray = jobType?.map((_: any) => _?.value);
    setJobType(idArray);

    setJobSearchTitle(jobTitle);
    setJobSearchType(idArray);
  };
  return (
    <section id="Job Lists" className="pt-10 pb-10 lg:mt-auto bg-[#E0F2FE]  lg:pt-20 lg:pb-auto">
      <div className="container px-8 mx-auto">
        <div className="flex flex-col w-full gap-8 p-10 bg-white rounded-md drop-shadow">
          <h1 className="text-2xl lg:text-3xl font-semibold text-[#197CC0] text-center">
            {t('open_a_new_chapter_in_your_life_with_jplus_lbl')}
          </h1>

          {/* job searching input */}
          <form
            className="flex flex-col gap-3 lg:gap-4 md:flex-row lg:w-[906px] lg:mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:grow">
              <input
                type="text"
                placeholder={t('job_title_lbl')}
                value={jobTitle}
                onChange={(e: any) => setJobTitle(e.target.value)}
                className="w-full px-4 py-[10px] text-sm border rounded-md outline-none"
              />

              {jobTyeListOption && (
                <Select
                  className="text-sm"
                  isMulti
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  options={jobTyeListOption}
                  placeholder={t('job_type_lbl')}
                  onChange={(e: any) => {
                    setJobType(e);
                  }}
                  styles={{
                    control: (base: any) => ({
                      ...base,
                      border: '1.5px solid #D0D5DD',
                      boxShadow: 'none !important',
                      '*': {
                        boxShadow: 'none !important',
                      },
                      '&:hover': {
                        border: '1.5px solid #D0D5DD !important',
                      },
                      height: 43,
                      minHeight: 43,
                    }),

                    menu: (provided) => ({
                      ...provided,
                      zIndex: 100000000000,
                    }),
                  }}
                />
              )}
            </div>
            <PrimaryButton
              className={`text-sm  font-semibold px-4 py-2 lg:py-1 gap-2 min-w-fit`}
              type="submit"
            >
              <Image src="/icons/search.svg" alt="" width={18} height={18} />
              {t('search_job_lbl')}
            </PrimaryButton>
            {/* <button

              className={`text-sm flex items-center  p-3 border-[1px] border-[#197CC0] rounded-lg bg-white !text-[#197CC0] lg:text-sm font-semibold px-4 py-2 lg:py-1 gap-2 min-w-fit`}
              
            >
              <Bar/>
              Filter
            </button> */}
          </form>

          <p className="text-sm  gap-3 text-[#1D2939] flex items-center justify-center flex-wrap">
            {<span className="text-[#475467]"> {t('popular_job_lbl')}</span>} :{' '}
            {popularJobTitle?.data?.map((_y: any) => (
              <span
                className="px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]"
                key={_y?.name}
              >
                {_y?.name}
              </span>
            ))}
          </p>
        </div>

        <div className="z-[1] relative grid grid-cols-1 gap-5 mt-10 md:gap-8 lg:gap-10 md:mt-16 lg:grid-cols-2 drop-shadow ">
          {jobLists?.data?.length > 0 ? (
            jobLists?.data?.map((job: any) => <Card jobData={job} key={job.id} />)
          ) : (
            <p className="">{''}</p>
          )}

          {/* <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
            <div className='flex flex-col gap-4 '>
              <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                <div className='flex items-center  gap-2'>
                  <SecondLogo />
                  <p className='text-sm'>Nintendo</p>
                  <p>Japan, Akita, Daisen</p>
                  <LocationIcon />
                  <p className='text-[#197CC0]'>Japan, Nagasaki, Isahaya</p>
                </div>
                <div>
                  <RightArr />
                </div>
              </div>
              <div className='px-4'>
                <p className='text-sm font-semibold text-wrap mt-2'>Video Game Developer</p>
              </div>
              <div className=' px-4 flex gap-2'>
                <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
              </div>
              <div className='px-4'>
                <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 70,000~300,000 <span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
              </div>
              <div className='flex px-4 flex-wrap justify-between items-center'>
                <p className='text-[#667085]'>Posted 3 mins ago</p>
                <div className='flex items-center gap-2'>
                  <Lotting />
                  <p>Male</p>
                  <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                  <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                </div>
              </div>
              <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
              <div className="px-4">
                <div className='flex items-center flex-wrap justify-between'>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Star />
                    <p className='text-[#344054]'>4.9</p>
                    <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                    <EyeOutline />
                    <span className="inline-block text-[#667085]">5.3K</span>
                    <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                    <ManyUser />
                    <span className="inline-block text-[#667085]">3.4K Applicants</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                    <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white rounded-md text-xs 2xl:text-sm py-4  '>
            <div className='flex flex-col gap-4 '>
              <div className='flex px-4 items-center justify-between capitalize flex-wrap'>
                <div className='flex items-center  gap-2'>
                  <SecondLogo />
                  <p className='text-sm'>Nintendo</p>
                  <p>Japan, Akita, Daisen</p>
                  <LocationIcon />
                  <p className='text-[#197CC0]'>Japan, Nagasaki, Isahaya</p>
                </div>
                <div>
                  <RightArr />
                </div>
              </div>
              <div className='px-4'>
                <p className='text-sm font-semibold text-wrap mt-2'>Video Game Developer</p>
              </div>
              <div className=' px-4 flex gap-2'>
                <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On site</p>
                <p className='px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]'>Full time</p>
              </div>
              <div className='px-4'>
                <p className='text-[#197CC0] text-2xl mb-2 font-semibold'>¥ 70,000~300,000 <span className='text-sm text-[#197CC0] lowercase font-normal'>/ mo</span></p>
              </div>
              <div className='flex px-4 flex-wrap justify-between items-center'>
                <p className='text-[#667085]'>Posted 3 mins ago</p>
                <div className='flex items-center gap-2'>
                  <Lotting />
                  <p>Male</p>
                  <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]'></span>
                  <p className='text-[#197CC0]'>Last apply date : 12.12.2012</p>
                </div>
              </div>
              <div className='w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed' />
              <div className="px-4">
                <div className='flex items-center flex-wrap gap-3 justify-between'>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Star />
                    <p className='text-[#344054]'>4.9</p>
                    <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                    <EyeOutline />
                    <span className="inline-block text-[#667085]">5.3K</span>
                    <span className='inline-block w-[1px] bg-[#D0D5DD] h-[15px]' />
                    <ManyUser />
                    <span className="inline-block text-[#667085]">3.4K Applicants</span>
                  </div>
                  <div className="flex items-center flex-wrap gap-3">
                    <button className="p-3 flex items-center gap-3  border rounded-lg"><Saveicon /> <span>Save</span></button>
                    <button className="p-3 flex items-center gap-3 bg-[#197CC0] text-white rounded-lg"><JobIcon /> <span>Apply Job</span></button>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
        </div>
        {/* {jobLists?.data?.length > 0 && (
          <Link href={`/${currentLocale}/jobs`}>
            <div className="flex items-center justify-center gap-2 mt-6 lg:mt-10">
              <Image width={20} height={20} alt="ey-blue" src="/icons/eye-blue.svg" />
              <p className="text-sm text-[#197CC0] font-semibold text-center">{t("view_all_jobs_lbl")}</p>
            </div>
          </Link>
        )} */}
        <Link href={'/jobs'}>
          <div className="rounded-md flex items-center cursor-pointer mt-7 justify-center gap-3 text-sm font-semibold bg-white shadow w-[350px] mx-auto p-3">
            <p className="text-[#197CC0]">{t('view_all_jobs_lbl')}</p>
            <p>
              <Eye />
            </p>
          </div>
        </Link>
      </div>
      <CTA />
    </section>
  );
};

export default Jobs;
