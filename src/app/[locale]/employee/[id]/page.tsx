'use client';
import BackIcon from '@/components/icons/back'
import OutlineEmail from '@/components/icons/email-outline';
import EyeOutline from '@/components/icons/eye-outline';
import LocationIcon from '@/components/icons/location'
import OutlinePhone from '@/components/icons/outline-phone';
import OutlineLocation from '@/components/icons/OutlineLocation';
import UserOutline from '@/components/icons/user-outline';
import Nav from '@/components/nav'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import JobPost from '../components/job-post';
import DetailFooter from '../../jobs/[id]/components/detail-footer';
import FirstLogo from '@/components/icons/firstLogo';
import SecondLogo from '@/components/icons/second';
import { useGetEmployeeDetail, useGetJobPopularList } from '@/services/jobService';
import Image from 'next/image';
import PopluarJobCard from '../../jobs/[id]/components/popular-job-card';

const EmployeeDetailPage = () => {
        const {data:popularJobs}=useGetJobPopularList()

  const router = useRouter();
  const handleBack = () => router.back();
  const {id}=useParams();
  const {data}=useGetEmployeeDetail(id as string);
  return (
    <div>
      <Nav />
      <div className="md:max-w-[1150px] flex flex-col gap-3 lg:container px-3 mx-auto pt-7">
        <div className="flex justify-between flex-wrap mt-5 mb-20">
          <button onClick={handleBack} className="flex items-center gap-2 font-semibold">
            <BackIcon /> Go back
          </button>

        </div>
        <div className='flex justify-center mb-3'>
            {
                data?.data?.companyLogo && <Image src={data?.data?.company} alt={data?.data?.company}  width={40} height={40} className="aspect-square" />
            }
            
            {/* <SecondLogo width={120} height={120} /> */}
            
            </div>
        <p className='text-center mb-5 text-2xl font-semibold'>{data?.data?.company}</p>
        <p className='flex justify-center text-primary text-base mb-5  items-center gap-2'><span><LocationIcon width={15} height={15} /></span> <span>{data?.data?.location?.region}</span> </p>
        <p className='flex mb-5 text-[#667085] items-center justify-center gap-2'><span className='flex items-center gap-2 '><span><EyeOutline /></span> <span>{data?.data?.company_size} Employees</span></span> <span className='w-[1px] bg-[#D0D5DD] h-[20px] inline-block' /> <span className='inline-flex items-center gap-2'><span><UserOutline /></span> <span>{data?.data?.recruited} Recruited</span></span> <span className='w-[1px] bg-[#D0D5DD] h-[20px] inline-block' /> <span>{data?.data?.website_url}</span> </p>
        <div className='flex items-center justify-center mb-3 mt-2'>
          <div className=''>
            <p className='text-lg font-semibold my-2'>About company</p>
            <p>{data?.data?.overview}</p>
          </div>
        </div>
        <div className='mb-5'>
          <p className='my-2 text-lg font-semibold'>Contact info</p>
          <div className='border rounded-md'>
            <table className='w-full'>
              <tbody>
                <tr className='h-[60px] border-b'>
                  <td className='border-r w-[50%]'>
                    <p className='flex items-center p-3 text-primary gap-3'><OutlineEmail /> <span>{data?.data?.email}</span></p>
                  </td>
                  <td className='w-[50%]'>
                     <p className='p-3 flex items-center text-primary gap-2'><OutlinePhone/> <span>{data?.data?.phone}</span></p>
                  </td>
                </tr>
                <tr className='min-h-[60px]'>
                   <td>
                   <div className='flex p-3 gap-2'>
                      <span><OutlineLocation/></span>
                       <div>
                          {/* <p>580-0015</p> */}
                          <p className='mb-5'>{data?.data?.address?.address}</p>
                          {/* <p>072-334-0550</p>
                          <p>072-333-12</p> */}
                       </div>
                   </div>
                   </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
       <PopluarJobCard/>
        <DetailFooter/>
    </div>
  )
}

export default EmployeeDetailPage
