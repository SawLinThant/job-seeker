import Text from '@/components/ui/typo'
import { cn } from '@/utils/cn'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdBlock } from 'react-icons/md'
import moment from "moment"

const Interview:React.FC<
{
    myJobsInterview?:{
    saved_jobs_count: number;
    applied_jobs_count: number;
    interview_jobs_count: number;
    data: {
      id: string;
      job_title: string;
      applied_date?:string;
      business: {
        name?: string;
        image: string;
      };
      
      processes: {
        id: string;
        process_name: string;
        step: number;
        status: string;
         interviews?: {
  id?: string;
  date?: string;
  time?: string;
  duration: any;
  phone: any;
  location: any;
  room_name?: string;
  user_name: string
}
      }[];
    }[];
  }
}> = ({myJobsInterview}) => {
 
    const router =useRouter()
    const { t, i18n } = useTranslation();
  let currentLocale = i18n.language;

  console.log("myJobsInterview?.data",myJobsInterview?.data)
  return (
   <Box>

   {
    myJobsInterview?.data?.map((_,i)=>(
          <Box className="bg-white  rounded-md mt-5 pt-5 " key={i}>

       <Box className="px-5">

         <Text>{_.job_title}</Text>

        <Box className="flex  items-center mt-2 mb-3">
            <Image src={_.business.image} alt={_.business.image} width={0} height={0} className='w-6 h-6 aspect-square rounded-full'/>
            <Text className='text-xs ml-2'>{_.business.name}</Text>
        </Box>
        {
            _?.applied_date && <Text className='text-xs text-black '>Apply Date : {moment(_?.applied_date || new Date()).format("DD MMM YYYY")}</Text>
        }
         
       </Box>


          <Box className="bg-[#F5F8FF] px-5 pb-5 pt-1 mt-2">
  <Text className='text-primary mt-5 mb-3'>Interview Process</Text>
  <Box className="space-y-2">


    {
        _?.processes.map((_d,i)=>(
  <Box className=" w-full flex items-start space-x-2" key={i}>

            <Box className="w-5 flex flex-col justify-center items-center">
                <Box className={cn("bg-primary w-5 h-5 rounded-full flex justify-center items-center",_d.status ==="Completed"&&"bg-white",_d.status ==="Declined" && "bg-[#B42318]",_d.status ==="Completed" && i===3 && "bg-primary")}>



                {
_d.status ==="Pending" &&                 <Box className="bg-white w-2 h-2 rounded-full flex justify-center items-center"></Box>

                }
                {
_d.status ==="Completed" && i!==3 && (                    <Image src="/images/tick.svg" alt="tick" width={0} height={0} className="w-3 h-3" />
)
                }

                {
                    _d.status ==="Declined" &&  <MdBlock className='text-white text-xs'/>
                }
                {
                    i===3 && _d.status ==="Completed" && <Image src="/images/tick-white.svg" alt="tick" width={0} height={0} className="w-3 h-3" />
                }
                </Box>

                <Box className={cn("w-[1.5px] h-16 bg-primary mt-1 ",(i===3 || _d.status ==="Declined") && "bg-transparent")}></Box>
            </Box>

            <Box className="">
                <Box>
                    <Box className="w-full flex items-center justify-between gap-x-2">
                    <Text className="text-sm  text-black">{
                        _d.step===1 && _d?.status !=="Declined" ?`First Interview ` :  _d.step===2 && _d?.status !=="Declined" ? "Review First Interview": _d.step===3 && _d?.status !=="Declined" ?"Second Interview" : _d.step===4 && _d?.status ==="Completed" ?"Interview" :_d.step===4 && _d?.status !=="Completed" ?"Review Second Interview" :_d?.status ==="Declined"?"Interview Unsuccessful" :""
                        }</Text>

                        {
                             ["First Interview","Second Interview"].includes(_d?.process_name) && _d?.status==="Pending" && <Text onClick={()=>{
                                router.push(`/${currentLocale}/room/${_d?.interviews?.room_name}?username=${_d?.interviews?.user_name}`)
                            }} className="text-sm px-2 py-1 bg-primary text-white rounded-2xl cursor-pointer">Interview Meeting</Text>
                        }
                    
                </Box>
                {/* <Text>Join Interview</Text> */}
                </Box>
                <Text className='text-[#475467] text-xs mt-1'>{
                        _d.step===1 && _d?.status !=="Declined" ?`The process of reviewing your application has been ${_d?.status==="Pending"? "reviewing": "finished"}.` :  _d.step===2 && _d?.status !=="Declined" ? "Reviewing Your Application Following First Interview.": _d.step===3 && _d?.status !=="Declined" ?`The process of reviewing your application has been ${_d?.status==="Pending"? "reviewing": "finished"}.` : _d.step===4 && _d?.status ==="Completed" ?"Pass the interview." : _d.step===4 && _d?.status !=="Completed" ?"Reviewing Your Application Following Second Interview." :_d.step===4 && _d?.status ==="Declined" ?"Reviewing Your Application Following Second Interview." :_d?.status ==="Declined"?"We regret to inform you that the interview outcome was not successful. Despite this, we appreciate your effort and encourage you to keep striving towards your goals." :""
                        } </Text>
            </Box>



          </Box>
        ))
    }

    
  </Box>


        
        

          </Box>
        


        
    </Box>
    ))
   }
   </Box>
  )
}

export default Interview