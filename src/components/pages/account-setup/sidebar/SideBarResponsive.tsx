'use client'
import { useRef, useState, useTransition } from 'react'
import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FiCheck, FiX } from 'react-icons/fi'
import { SEVERITY } from '@/components/ui/snackbar/SnackbarContext'
import { Box } from '@mui/material'
import { cn } from '@/utils/cn'
import { useAtom } from 'jotai'
import { showSidebarAtom } from '@/components/atoms/atoms'

const SideBarResponsive:React.FC<any> = ({imageFileUrl,imageFile,profileUploadTrigger,showMessage,mutate,getRootProps,setImageFile,
setImageFileUrl,handleClick,pathname,
currentLocale,sideBarItem,personInformation,setUpProcessPercent}) => {

   const [isPending, startTransition] = useTransition();


  const [showSideBar,setShowSideBar]=useAtom(showSidebarAtom)
    const segment = useSelectedLayoutSegment()
   

    const [hover, setHover] = useState<any | null>(null)
    const router = useRouter()
    const [activeItemId, setActiveItemId] = useState<any| null>(null)
    const toggleHover = (id:number |  null) => {
        setHover((prev:any) => (prev === id ? null : id))
    }
    const handleItemClick = (id:number) => {
        setActiveItemId(id)
        // router.push(id)
        setHover(null)
    }
 
  
    return (
        <>

        {
          showSideBar &&  <main className="fixed overflow-auto bg-white h-screen  w-screen top-0 left-0 z-[100000]  ">
                <div className=" px-3">
                    <div className="flex items-center justify-between py-4 mb-2 ">
                        <div className='flex gap-x-4'>

                            <Image alt="personal info" src="/images/arrow-left-blue.svg" className='lg:hidden'  width={18} height={18} onClick={()=>{


startTransition(()=>{
  router.push(`/${currentLocale}`)

  if(!isPending){
                setShowSideBar(!showSideBar)

  }
})
              }} />
                            <h1 className="text-[#101828] text-lg font-medium "> 
                                View Profile
                            </h1>
                        </div>
                        <div>
                               <FiX className='w-6 h-6' onClick={()=>{
                                setShowSideBar(!showSideBar)
                               }}/>
                        </div>
                    </div>
                    <div className=" bg-[#197CC0] py-5 px-5 rounded-2xl container">
                        <div className="flex items-center gap-5">
                               <div className="relative">
                             {imageFileUrl ? (
              <div className="relative mx-auto  w-[100px] h-[100px]">
                <FiCheck
                  className="absolute -bottom-2 right-5 text-green-600"
                  onClick={async(e) => {
                    e?.stopPropagation();
                    // setImageFile(null);
                    // setImageFileUrl(null);

                    const formData =new FormData()
                    formData.append("profile",imageFile?.[0] ?? '')
                  await  profileUploadTrigger({
                        data:formData
                    },{
                        onSuccess:(res:any)=>{

           showMessage({
            message: "Uploaded Profile Successfully",
            severity: SEVERITY.SUCCESS,
          });
        //    setImageFile(null);
        //             setImageFileUrl(null);
                                                mutate()

                        },
                        onError:(error:any)=>{
                            showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
                        }
                    })
                  }}
                />
                <FiX
                  className="absolute -bottom-2 right-0 text-red-500"
                  onClick={(e) => {
                    e?.stopPropagation();
                    setImageFile(null);
                    setImageFileUrl(null);
                  }}
                />

                <Image
                  src={imageFileUrl}
                  width={50}
                  height={50}
                  alt=""
                  className="mx-auto rounded-full w-[100px] h-[100px]"
                />
              </div>
            ) : (
              <div {...getRootProps()}>
                {imageFileUrl ? (
                  <div className="relative mx-auto  w-[100px] h-[100px]">
                    <FiX
                      className="absolute bottom-0 right-0 text-vermilion_bird"
                      onClick={(e) => {
                        e?.stopPropagation();
                        setImageFile(null);
                      }}
                    />
                    <Image
                      width={50}
                      height={50}
                      src={imageFileUrl}
                      alt=""
                      className="mx-auto rounded-full w-[80px] h-[80px] border border-gray-100"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <Image
                      width={80}
                      height={80}
                      src={'/images/defaultProfile.png'}
                      className="mx-auto"
                      alt="default profile"
                    />
                      <button
                                className="absolute bottom-0 items-center w-6 h-6 bg-white border-white rounded-full shadow-sm left-14"
                               >
                                <div className="flex justify-center">
                                    <Image alt="" width={14} height={14} src="/images/edit-05.png" />
                                </div>
                            </button>

                    {/* {error && <p className="mt-3 text-sm text-center text-red-500">{error}</p>} */}
                  </div>
                )}
              </div>
            )}
                            {/* edit button to upload picture */}

                         
                            {/* invisible file input triggered by the edit button */}
                            {/* <input
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
                                style={{ display: 'none' }}
                                onClick={handleProfileUpload}
                            /> */}
                        </div>
                            <div>
                                <h1 className="text-2xl font-semibold leading-8 text-white">
                                 {
                                   personInformation?.data?.name
                                 }
                                </h1>
                                <div className="pt-2 text-sm font-normal leading-5 text-white">
                                    <span>Email :</span>
                                    <span className="pl-3">
                                       {
                                         personInformation?.data?.email
                                       }
                                    </span>
                                </div>
                                <div className="py-2 text-sm font-normal leading-5 text-white">
                                    <span className="pr-3">Phone : {personInformation?.data?.phone}</span>
                                    <span className={cn(`inline-flex items-center gap-x-1.5 py-1.5 px-3  rounded-full text-xs font-medium text-red-600 bg-white`,personInformation?.data?.phone && "bg-green-600 text-white")}>
                                      { personInformation?.data?.phone ?"Verified" : " Not Verified" } 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center pt-5">
                            <p className="text-white text-sm">Your Profile Progress </p>
                            {/* <!-- Progress --> */}
                            <div className="flex items-center pt-2 gap-x-3 whitespace-nowrap">
                                <div
                                    className="flex w-full h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-white"
                                    role="progressbar"
                                  >
                                    <div className="flex flex-col justify-center w-7 overflow-hidden text-xs text-center text-white transition duration-500 bg-[#B6D8FC] rounded-full whitespace-nowrap " style={{ 
                              width:`${setUpProcessPercent?.data?.setup_process_percent}%`
                             }}>
                                        <></>
                                    </div>
                                </div>
                                <div className="w-10 text-end">
                                    <span className="text-sm text-white">
                                        {setUpProcessPercent?.data?.setup_process_percent}
                                %
                                    </span>
                                </div>
                            </div>
                            {/* <!-- End Progress --> */}
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-4 pt-4">    {sideBarItem.map((option:any,i:number) => {
                        return (
                            <Box
                            key={i}
                           
                                onClick={() => handleClick(option.title,option.href)}
                                style={{ minHeight: '50px' }}
                                className={cn(` whitespace-nowrap pl-5 my-1 bg-white text-black 
                                 w-full group select-none flex  items-center text-center rounded-lg gap-x-2`,
                                 (pathname === `/${currentLocale}${option.href}` ||  pathname === option.href) && (`bg-primary text-white`) 
                                 )}>
                                   <Image width={16} height={16}
                                        alt={option.title}
                                        src={`${

                                             pathname === `/${currentLocale}${option.href}` ||  pathname === option.href ? option.imgAfter:option.imgBefore
                                         
                                        }`}
                                    />
                                <p className='text-sm'>{option.title}</p>

                               
                                {
                                    i===0 && !(setUpProcessPercent?.data?.personal_information) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===1 && !(setUpProcessPercent?.data?.self_intro_video) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===2 && !(setUpProcessPercent?.data?.education) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===3 && !(setUpProcessPercent?.data?.work_experience) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===4 && !(setUpProcessPercent?.data?.skills) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===5 && !(setUpProcessPercent?.data?.expert_certification) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===6 && !(setUpProcessPercent?.data?.cv_or_resume) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }
                                {
                                    i===7 && !(setUpProcessPercent?.data?.additional_info) &&   <Box className="w-2 h-2 bg-red-600 rounded-full"></Box>
                                }

                            </Box>
                        )
                    })}
                    </div>
                </div>
            </main>
        }
           
        </>
    )
}

export default SideBarResponsive
