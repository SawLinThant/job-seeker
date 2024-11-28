'use client'
import Nav from '@/components/nav'
import LoadingDialog from '@/components/ui/dialog/LoadingDialog'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { useGetMyJobApplied, useGetMyJobInterview, useGetMyJobSaved, useMutateSavedUnSaveJob } from '@/services/jobService'
import { cn } from '@/utils/cn'
import Image from 'next/image'
import React, { act, useState } from 'react'
import Interview from './interview/Interview'
import JobCardR from '@/components/ui/job-card/JobCard'

const MyJobs = () => {

    const { showMessage } = useSnackbar();

  const {data:myJobsSaved,mutate,isLoading:savedLoading} =useGetMyJobSaved()
  const {data:myJobsApplied,isLoading:myJobsAppliedLoading} =useGetMyJobApplied()
  const {data:myJobsInterview,isLoading:myJobsInterviewLoading} =useGetMyJobInterview()



     const {trigger:saveUnSaveTrigger ,isMutating:saveUnSaveIsMutating}=useMutateSavedUnSaveJob()



  const [activeTab,setActiveTab]=useState(0)

  const countA =activeTab===2?myJobsSaved:activeTab ===0? myJobsApplied:activeTab ===1? myJobsInterview:"";


  const savedFun=async(id:string)=>{
              await saveUnSaveTrigger({
              id:id,
              status:false
            },{
               onSuccess:(res)=>{
             showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          mutate()
      },
      onError:(error)=>{
           showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
      }
            })
        }
  return (
    <div className='bg-[#EAECF0] min-h-screen'>

      <Nav/>

      {
       ( savedLoading && 
myJobsAppliedLoading) ? <LoadingDialog isLoading={ savedLoading ||
myJobsAppliedLoading}/> :  <div className='w-[90%] md:w-[70%] mx-auto mt-10'>

        <p className='text-md'>My Jobs</p>


        <div className='flex border-b mt-5 border-[#D0D5DD] gap-x-10'>

{
  ["Applied","Interview","Saved"].map((_,i)=>(
    <div className={cn('flex gap-x-3  py-3 px-4 cursor-pointer',activeTab ===i && "border-b-2 border-primary bg-[#E0F2FE] rounded-t-md")} key={i} onClick={()=>{
      setActiveTab(i)
    }}>


      <p className={cn("text-gray-700 text-sm",activeTab ===i && "text-primary")}>{_}</p>

      <div className='w-5 h-5 grid place-items-center rounded-full bg-[#F2F4F7] text-[#344054]'>

        <p className={cn("rounded-full  w-6 h-6 flex justify-center items-center bg-[#667085] text-white text-xs",activeTab ===i && "text-white bg-primary rounded-full w-6 h-6 flex justify-center items-center")}>{i===2? countA?.saved_jobs_count :i===0? countA?.applied_jobs_count:i===1? countA?.interview_jobs_count:""}</p>
      </div>

    </div>
  ))
}

        </div>


        {
          activeTab === 2 && (
            <div className='mt-5'>
{
  myJobsSaved?.data?.map((_t:any,i:number)=>(
    <JobCardR key={i} _t={_t} savedFun={savedFun}/>

//     <div className='bg-white mb-4 rounded-lg p-5' key={i}>

//       <div className='flex justify-between items-start'>

//         <p className='text-md text-gray-700 font-bold whitespace-nowrap'>{_t?.title}</p>


//         <Image className='cursor-pointer' src="/images/saved_job.svg" alt="saved_job.svg" width={30} height={30} onClick={async()=>{
//               await saveUnSaveTrigger({
//               id:_t?.id,
//               status:false
//             },{
//                onSuccess:(res)=>{
//              showMessage({
//             message: res?.data?.data?.message,
//             severity: SEVERITY.SUCCESS,
//           });
//           mutate()
//       },
//       onError:(error)=>{
//            showMessage({
//             message:error.response.data.message,
//             severity: SEVERITY.ERROR,
//           });
//       }
//             })
//         }}/>
//       </div>

//       <div className='flex gap-x-2 items-center'>

//         <Image src="/images/demoJob.svg" alt="demoJob.svg" width={30} height={30}/>
//         <p className='text-sm'>んのしょうときのり</p>
//       </div>

//             <div className='flex gap-x-10 items-center'>

//               <p className='text-sm text-primary'>{`${_t?.salary?.start}~${_t?.salary?.end}/m`}</p>


//               <span className="text-[#175CD3] bg-blue-50 px-2 py-[2px] md:p-2 rounded-full text-sm my-2">
//               {_t?.workEnvironment}
//             </span>

//               <div>

//               </div>
// </div>

// <p className={`${_t.lastApplyDate == 'Today' ? 'text-[#B42318]' : 'text-[#475467]'} text-sm`}>
//           Last Apply : {_t.date}
//         </p>


//     </div>


  ))

}


            </div>
          )
        }
        {
          activeTab === 0 && (
            <div className='mt-5'>
{
  myJobsApplied?.data?.map((_t:any,i:number)=>(
    <JobCardR key={i} _t={_t}/>

//     <div className='bg-white mb-4 rounded-lg p-3' key={i}>

//       <div className='flex justify-between items-start'>

//         <p className='text-md text-gray-700 font-bold whitespace-nowrap'>{_t?.name}</p>


      
//       </div>

//       <div className='flex gap-x-2 items-center'>

//         <Image src="/images/demoJob.svg" alt="demoJob.svg" width={30} height={30}/>
//         <p className='text-sm'>んのしょうときのり</p>
//       </div>

//         <div className='w-full flex justify-between items-center'>

//     <div className='flex gap-x-10 items-center'>

//               <p className='text-sm text-primary'>{`${_t?.salary_range_start}~${_t?.salary_range_end}/m`}</p>


//               <span className="text-[#175CD3] bg-blue-50 px-2 py-[2px] md:p-2 rounded-full text-sm my-2">
//               {_t?.job_type}
//             </span>

//               <div>

//               </div>
// </div>
// <p className={`${_t.applied_date == 'Today' ? 'text-[#B42318]' : 'text-[#475467]'} text-sm`}>
//           Last Apply : {_t.applied_date}
//         </p>

//         </div>



//     </div>


  ))

}


            </div>
          )
        }

        {
            activeTab ===1 &&(
                <Interview myJobsInterview={myJobsInterview}/>
            )
        }



      </div>
      }

    
    </div>
  )
}

export default MyJobs