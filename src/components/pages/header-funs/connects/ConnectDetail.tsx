'use client'
import { detailConversationDataAtom } from '@/components/atoms/atoms'
import Nav from '@/components/nav'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import Text from '@/components/ui/typo'
import useChatScroll from '@/hooks/useChatScroll'
import { useGetConversationById, useMutateSendMessage } from '@/services/connectsServices'
import { cn } from '@/utils/cn'
import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'

const ConnectDetail = () => {
    const router=useRouter()

          const { showMessage } = useSnackbar();

        const [sendMessage,setSendMessage]=useState<any>("");

    const [detailConversationData,setDetailConversationData]=useAtom(detailConversationDataAtom)


    const {id}=useParams()



const {data:messages,mutate,isLoading:isLoadingConversationDetailList}=useGetConversationById(id as string)
const {trigger:sendMessageTrigger}=useMutateSendMessage()
 const handleClick=()=>{

             if(sendMessage===""){
              showMessage({
            message: "Message must be at least one character",
            severity: SEVERITY.INFO,
          });

          return 
        }

                sendMessageTrigger({
        message:sendMessage,
        conversation_id:detailConversationData?.id as string
      },{
        onSuccess:(s)=>{

            // mutate()
             setSendMessage("")
        }
      })
    }
          const scrollRef = useChatScroll(messages?.data as any)



    const _handleKeyDown = (e:any) => {

      

    if (e.key === 'Enter') {

        if(sendMessage===""){
              showMessage({
            message: "Message must be at least one character",
            severity: SEVERITY.INFO,
          });

          return 
        }

      sendMessageTrigger({
        message:sendMessage,
        conversation_id:detailConversationData?.id as string
      },{
        onSuccess:(s)=>{
                                   
            setSendMessage("")




        }
      })
    }
  }
  return (

    
     <Box className='bg-[#EAECF0] h-screen  '>

    
    <Box>


        {
            (messages && detailConversationData) &&     <Box  className=" h-screen bg-[#F9FAFB]">

            


        

            <Box className="relative flex items-center justify-between bg-[#EFF8FF]  px-4 py-2">

                 <Box className="flex">

                        <Image alt="personal info" src="/images/arrow-left-blue.svg" className='lg:hidden mr-4'  width={18} height={18} onClick={()=>{
                router.back()
              }} />

                     <Box className="relative mr-2">
                    <Image src={detailConversationData?.receiver?.image?.path} alt={detailConversationData?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full' />
                    <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-1 right-1"></Box>
                </Box>

                <Box>
                    <Text>{detailConversationData?.receiver?.name}</Text>
                    {/* <Text className="text-xs text-[#475467] mt-2">Active Now</Text> */}
                </Box>
                 </Box>

                <HiOutlineDotsVertical />


            </Box>
            <Box  className=" border flex flex-col h-[85vh] overflow-y-auto p-5" ref={scrollRef}>

                {
                    messages?.data && <>
                    
                    {
                         messages?.data?.map((_:any,key:any)=>(
                        <Box key={key} className={cn(" max-w-[80vw]   mt-4 relative 	",_?.is_sender && "self-end")}>

                            {

                               !_?.is_sender ? <Box className="flex items-center space-x-2">
<Image src={detailConversationData?.receiver?.image?.path} alt={detailConversationData?.receiver?.image?.path} width={0} height={0} className='rounded-full w-10 h-10' />

<Box className="bg-[#175CD3] rounded-lg py-2 px-3">
    <Text className="text-sm text-white ">{_?.message}</Text>

    <Text className="text-right text-xs text-[#D0D5DD]">{_?.sent_at}</Text>
</Box>

                                </Box>:<Box className="bg-[#EFF8FF] rounded-lg py-2 px-3">
    <Text className="text-sm text-[#344054] text-right">
{_?.message}
    </Text>

  <Box className="flex space-x-2 justify-end items-center mt-2">
      <Text className="text-right text-xs text-[#667085]">{_?.sent_at}</Text>
      {
        _?.is_seen?        <IoCheckmarkDone className='text-green-500' />:    <IoCheckmark className="text-[#667085]"/>

 
      }
    
  </Box>

</Box>
                            }
                        </Box>
                    ))
                    }
                    </>
                }

               
                <Box>

                </Box>
                
                
              
            </Box>



            <Box className="bg-[#F2F4F7] flex items-center py-2 px-3 ">

               <Box className="flex w-full bg-white border py-3 px-3 rounded-xl">
                 <input value={sendMessage} type="text" onChange={(e)=>{
                    setSendMessage(e.target.value)
                 }} className="border-none outline-none text-sm w-full" placeholder='Write Your Message' onKeyDown={_handleKeyDown}/>
                <Image  src="/images/sendIcon.svg" alt="Send Icon" width={0} height={0} className='w-5 h-5' onClick={handleClick}/>
               </Box>
            </Box>

        </Box>
        }
    </Box>
    </Box>
    

  )
}

export default ConnectDetail