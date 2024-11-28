"use client"
import Nav from '@/components/nav'
import { menuInbox } from '@/data'
import { cn } from '@/utils/cn'
import { Box } from '@mui/material'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { IoCheckmark, IoCheckmarkDone } from 'react-icons/io5'
import { HiOutlineDotsVertical } from "react-icons/hi";

import { useGetConversationById, useGetConversationList, useMutateSendMessage } from '@/services/connectsServices'
import useEcho from '@/hooks/useEcho'
import useChatScroll from '@/hooks/useChatScroll'
import BlurDialog from '@/components/ui/dialog/BlurDialog'
import Loading from '@/components/ui/loading/Loading'
import LoadingDialog from '@/components/ui/dialog/LoadingDialog'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { useAtom } from 'jotai'
import { detailConversationDataAtom } from '@/components/atoms/atoms'
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import Text from '@/components/ui/typo'


const Connects = () => {

    const router =useRouter()
       const { t,i18n } = useTranslation();
  let currentLocale = i18n.language;

     const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

      const { showMessage } = useSnackbar();



    const [detailConversationData,setDetailConversationData]=useAtom(detailConversationDataAtom)


const {data:conversationList,isLoading:isLoadingConversationList} =useGetConversationList()


const {data:messages,mutate,isLoading:isLoadingConversationDetailList}=useGetConversationById(detailConversationData?.id as string)
const {trigger:sendMessageTrigger}=useMutateSendMessage()

  const scrollRef = useChatScroll(messages?.data as any)


  const ref = React.useRef<HTMLDivElement>();

  const echo:any =useEcho()



        const scroll = useRef<any|null>(null);

        const [sendMessage,setSendMessage]=useState<any>("");


    const scrollToBottom = () => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
    };

   

    useEffect(() => {
       

        if(echo && detailConversationData?.id){
          

            echo.channel(`chat-room.${detailConversationData?.id}`).listen("GotMessage",(event:any)=>{
                mutate()
            })
        }

          if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
        return () => {

            if(echo){
            echo.leave(`chat-room-${detailConversationData?.id}`);

            }
        }
    }, [detailConversationData?.id,echo,mutate]);

    const handleClick=()=>{

        if(sendMessage===""){
    showMessage({
            message: "Message must be at least one character",
            severity: SEVERITY.INFO,
          });
        }else{
           sendMessageTrigger({
        message:sendMessage,
        conversation_id:detailConversationData?.id as string
      },{
        onSuccess:(s)=>{

            mutate()
             scrollToBottom()
             setSendMessage("")
        }
      })
        }

           

     
    }


    const _handleKeyDown = async (e:any) => {

     

    if (e.key === 'Enter' ) {

        if(sendMessage!==""){
      await sendMessageTrigger({
        message:sendMessage,
        conversation_id:detailConversationData?.id as string
      },{
        onSuccess:(s)=>{
                                   
            setSendMessage("")


                        scrollToBottom()


        }
      })
        }else{
 showMessage({
            message: "Message must be at least one character",
            severity: SEVERITY.INFO,
          });
        }

       

    
    }
  }

        

  return (

        <Box className='bg-[#EAECF0] min-h-screen  '>

      <Nav/>
<Box className="">


      {
        (isLoadingConversationList || 
isLoadingConversationDetailList )? <LoadingDialog isLoading={isLoadingConversationList || 
isLoadingConversationDetailList}/>:    <Box className="md:flex justify-between ">

        <Box className="w-full md:w-[35rem] px-6 bg-white shadow-md border border-gray-200 pt-10">

            <Box className=" flex justify-between items-start">
                <Box>
                    <Text>Connects</Text>
                    <Text className='text-xs text-[#344054]'>0 Message</Text>
                </Box>
                {/* <Box className="bg-primary flex space-x-2 py-2 justify-center items-center px-2 rounded-lg">

                    <Image src="/images/mail-white.svg" alt="/images/mail-white.svg" width={0} height={0} className="w-4 h-4" />
                    <Text className='!text-white text-xs'>Compose</Text>
                    
                </Box> */}
            </Box>

            <Box className="flex items-center border border-gray-200 py-2 px-2 rounded-md mt-4">
                <input type="text" name="" className='w-full text-sm outline-none focus:outline-none' placeholder='Search'/>
                <Search className='w-4 h-4'/>
            </Box>

            {/* <Box className="flex space-x-3 mt-5">

                {
                    menuInbox.map((_:any,i:number)=>(
                        <Box key={_.label} className={cn(`flex items-center px-2 py-1 cursor-pointer`,activeMenu === i&& (`bg-[#EFF8FF] text-primary`))} onClick={()=>{
                            setActiveMenu(i)
                        }}>

                            <Text className='text-sm whitespace-nowrap'>{_.label}</Text>

                            
                            <Text className={cn("ml-2 text-xs whitespace-nowrap rounded-lg",activeMenu !== i&&(`bg-[#F2F4F7] px-1 py-1`))}>{`${12} new`}</Text>
                        </Box>
                    ))
                }
            </Box> */}

<Box className="h-[60vh] overflow-y-auto">


    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
    {
        conversationList?.data?.map((_d:any,key:number)=>(
  <Box key={key} className={cn("flex justify-between border border-gray-200 px-2 py-2 rounded-md mt-5 cursor-pointer",(_d?.id=== detailConversationData?.id as string)  && "bg-gray-200")}>
              <Box className="w-full flex items-center justify-start" onClick={()=>{

                if(isSmallDevice){
                                    setDetailConversationData(_d)

                                        router.push(`/${currentLocale}/connects/${_d?.id}`)

                }else{
                setDetailConversationData(_d)

                }
              }}>
                  <Box className="relative mr-2">
                    <Image src={_d?.receiver?.image?.path} alt={_d?.receiver?.image?.path} width={0} height={0} className='w-10 h-10 aspect-square rounded-full border' />
                    {/* <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-3 right-1"></Box> */}
                </Box>

                  <Box>
                      <Box className="flex items-center space-x-2">
                        <Text className="text-sm">{_d?.receiver?.name}</Text>

                        {
                            _d?.role === "Agent" &&                         <Text className="text-xs bg-[#FFF4ED] px-1 text-red-500">Agent</Text>

                        }
                    </Box>

                    <Text className="text-xs  line-clamp-2  text-[#475467] text-justify mt-2">{`${_d?.last_message_by} : ${_d?.message}`}</Text>
                  </Box>

              </Box>


                    <Box className="flex items-end justify-center ml-10">
                        <Text className="text-xs whitespace-nowrap text-[#475467]">{_d?.sent_at}</Text>
                       {/* <FiCheck className="text-green-500 mb-6 ml-2" /> */}

                    </Box>
            </Box>
        ))
    }
</Box>
          



            



        </Box>

           {
                !detailConversationData ?<Box className="hidden md:block md:w-full h-full">

                <Image src="/images/message.svg" alt="message" width={0} height={0} className='mt-20 w-[30rem] mx-auto h-[30rem]'/>

            </Box>:    <Box  className="hidden md:block md:w-full  bg-[#F9FAFB]">

            


        

            <Box className="relative flex items-center justify-between bg-[#EFF8FF]  px-4 py-2">

                 <Box className="flex">

                     <Box className="relative mr-2">
                    <Image src={detailConversationData?.receiver?.image?.path} alt={detailConversationData?.receiver?.image?.path} width={0} height={0} className='w-12 h-12 aspect-square rounded-full' />
                    <Box className="w-2 h-2 bg-green-400 rounded-full absolute bottom-1 right-1"></Box>
                </Box>

                <Box>
                    <Text>{detailConversationData?.receiver?.name}</Text>
                    {/* <Text className="text-xs text-[#475467] mt-2">Active Now</Text> */}
                </Box>
                 </Box>

                <HiOutlineDotsVertical />


            </Box>
            <Box  className=" border flex flex-col h-[68vh] overflow-y-auto p-5" ref={scrollRef}>

                {
                    messages?.data && <>
                    
                    {
                         messages?.data?.map((_:any,key:any)=>(
                        <Box key={key} className={cn(" max-w-[40vw]   mt-1 relative 	",_?.is_sender && "self-end")}>

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
                                                <span ref={scroll}></span>



            <Box className="bg-[#F2F4F7] flex items-center py-2 px-10 ">

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
      }
  
</Box>



      </Box>
  )
}

export default Connects