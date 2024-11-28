import RightArr from '@/components/icons/rightArr'
import Image from 'next/image'
import React from 'react'
import { IoLocation } from 'react-icons/io5'
import { FaTransgenderAlt } from "react-icons/fa";
import { FaCheck, FaRegEye, FaStar } from 'react-icons/fa6';
import { FiUsers } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const JobCardR = ({_t,savedFun}:{
    _t:any,
    savedFun?:any
}) => {
    const router=useRouter()
        const { t, i18n } = useTranslation();
  let currentLocale = i18n.language;
    
  return (
    <div className="w-full bg-white py-8 rounded-md mb-5">
        <div className="flex justify-between px-8 ">
            <div className="flex">
                <Image src={(_t?.business?.image ==="" || _t?.companyLogo)? "/logo.svg":""} alt={(_t?.business?.image ==="" || _t?.companyLogo)? "/logo.svg":_t?.image} width={30} height={0} className="rounded-full aspect-square" />
                <p className="text-sm ">{_t?.business?.name || _t?.company}</p>
<IoLocation className="text-primary ml-3" />
                {
                    (_t?.business?.address?.country?.name_en || _t?.business?.address?.address || _t?.location || _t?.addresss)  && <p className="text-primary ml-2 text-sm">{_t?.business?.address?.country?.name_en || _t?.location} {_t?.addresss }</p>
                }
                 

                 
               

            </div>

            <div className="cursor-pointer" onClick={()=>{
                router.push(`/${currentLocale}/jobs/${_t?.id}`)
            }}>
            <RightArr />


            </div>
        </div>
        <p className="text-xl text-black my-5 px-8">{_t?.name || _t?.title}</p>
        <div className="flex gap-x-3 px-8">

            
            {/* <p className='inline-block bg-[#EFF8FF] text-primary px-2 py-1 rounded-xl text-sm'>On site</p> */}
            <p className="inline-block bg-[#EFF8FF] text-primary px-2 py-1 rounded-xl text-sm">{_t?.job_type || _t?.workEnvironment}</p>
        </div>
        <p className="text-primary text-xl my-5 px-8">¥ {(+_t?.salary_range_start || _t?.salary?.start).toLocaleString()}~{(+_t?.salary_range_end || _t?.salary?.end).toLocaleString()} / mo</p>
        <div className="flex justify-between items-center px-8 pb-5 border-b border-dashed">
            <p className="text-[#667085] text-sm">Posted - { moment(_t?.job_posted_date).fromNow() || " 3 mins ago"}</p>
            <div className="flex items-center">

                {
                    _t?.gender ===""? "":<>
                     <FaTransgenderAlt className="text-primary"/>
                <p className="text-[#344054] text-sm px-3 border-r border-[#eff4fc] mr-3 capitalize">{_t?.gender}</p>
                    </>
                }

               
                <p className="text-[#197CC0] text-sm">Applied on {_t?.applied_date || _t?.lastApplyDate}</p>

            </div>
        </div>
        <div className="flex items-center justify-between px-8 mt-5">
          <div className="flex items-center">
              <div className="flex items-center">
                <FaStar className="text-yellow-500 mr-1"/>

                <p>{_t?.rating}</p>
            </div>
            <div className="flex items-center gap-x-2 px-3 border-x-border-[#D0D5DD]">
                <FaRegEye/>
                <p>{_t?.views}</p>
            </div>
              <div className="flex items-center">
             <div className='flex items-center'>
                <FiUsers />

                <p className="text-sm mx-2">{_t?.total_applied}</p>
                <p className="text-sm">Applicants</p>
            </div>
            

           </div>
          </div>

          <div className="flex items-center gap-x-4">

            {
                savedFun &&  <div className="border text-primary flex items-center rounded-lg px-3 space-x-2 py-2" onClick={()=>savedFun(_t?.id as string)}>
                <Image src='/images/bookmark-check.webp' alt='/images/bookmark-check.webp' width={20} height={20}  />

                <p className="ml-2">{_t?.is_saved?"Saved" : "Save"}</p>
            </div>
            }


            
 <div className="bg-primary text-white flex items-center rounded-lg px-3 space-x-2 py-2">
                <FaCheck className="text-white" />

                <p className="ml-2">{_t?.is_applied?"Applied":"Apply" }</p>
            </div>

          </div>
         
          
        </div>
    </div>
  )
}

export default JobCardR