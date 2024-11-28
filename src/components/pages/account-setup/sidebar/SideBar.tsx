'use client'
import React, { useCallback, useEffect, useRef, useState, useTransition } from 'react'

import { usePathname, useRouter, useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import SideBarResponsive from './SideBarResponsive'
import { useGetAccountSetUpProcess, useGetPersonInformation, useMutateProfileUpload } from '@/services/authService'
import { cn } from '@/utils/cn'
import { useDropzone } from 'react-dropzone';
import { FiCheck, FiX } from 'react-icons/fi'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { useTranslation } from 'react-i18next' 
import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import { showSidebarAtom } from '@/components/atoms/atoms'
import { FaCircleCheck } from "react-icons/fa6";

// import SideBarResponsive from './sidebarResponsive/page'
import startTransition from 'react';
import { parseAsInteger, useQueryState } from 'nuqs'

const SideBar = () => {

  const [isPending, startTransition] = useTransition();

  const [,setShowSideBar]=useAtom(showSidebarAtom)

  const router =useRouter()
      const [hover, setHover] = useState<any | null>(null)

      const { i18n } = useTranslation();
  let currentLocale = i18n.language;

    const pathname =usePathname();
        const { showMessage } = useSnackbar();

        const {data:setUpProcessPercent} =useGetAccountSetUpProcess()


    const {trigger:profileUploadTrigger}= useMutateProfileUpload()
  const [imageFileUrl, setImageFileUrl] = useState<any | null>(null);
  const [imageFile, setImageFile] = useState(null);

      const onDrop = useCallback((acceptedFiles: any, fileRejections: any) => {
    if (fileRejections.length) {
      // toast.error(fileRejections[0].errors[0].code);
      return;
    }
    // validateImageOrientation(acceptedFiles[0]);
    if (acceptedFiles) {
      setImageFileUrl(URL.createObjectURL(acceptedFiles?.[0]));
    }
    setImageFile(acceptedFiles);
  }, []);
      const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
  });

    const {data:personInformation,mutate}=useGetPersonInformation()

    // const { progressPercentage , logInUserInfo } = useAuth();
    const segment = useSelectedLayoutSegment()
    const [isActive, setActive] = useState('Personal Information')
  
    const [visable, setVisable] = useQueryState('page', parseAsInteger.withDefault(0))

  useEffect(() => {
    if (personInformation?.data?.image) {
      setImageFileUrl(personInformation?.data?.image);
    }
  }, [personInformation]);

    let sideBarItem = [
        {
            id: 1,
            title: 'Personal Information',
            imgBefore: '/images/webp/personal-information.webp',
            imgAfter: '/images/webp/personal-information-active.webp',
            href: '/account-setup/personal-information',
            current: !segment ? true : false,
        },
        {
            id: 2,
            title: 'Self Introduce Video',
           imgBefore: '/images/webp/self-introduce-video.webp',
            imgAfter: '/images/webp/self-introduce-video-active.webp',
            href: '/account-setup/self-intro-video',
            current: `${segment}` === '/selfintroducevideo' ? true : false,
        },
        {
            id: 3,
            title: 'Education',
            imgBefore: '/images/webp/education.webp',
            imgAfter: '/images/webp/education-active.webp',
            href: '/account-setup/education',
            current: `${segment}` === '/education' ? true : false,
        },
        {
            id: 4,
            title: 'Work Experience',
           imgBefore: '/images/webp/work-experience.webp',
            imgAfter: '/images/webp/work-experience-active.webp',
            href: '/account-setup/work-experience',
            current: `${segment}` === '/workexperience' ? true : false,
        },
        {
            id: 5,
            title: 'Skills',
            imgBefore: '/images/webp/skill.webp',
            imgAfter: '/images/webp/skill-active.webp',
            href: '/account-setup/skills',
            current: `${segment}` === '/skills' ? true : false,
        },
        {
            id: 6,
            title: 'Expert Certification',
            imgBefore: '/images/webp/expert-certification.webp',
            imgAfter: '/images/webp/expert-certification-active.webp',
            href: '/account-setup/expert-certification',
            current: `${segment}` === '/expertcertificate' ? true : false,
        },
        {
            id: 7,
            title: 'CV or Resume',
            imgBefore: '/images/webp/cv-resume.webp',
            imgAfter: '/images/webp/cv-resume-active.webp',
            href: '/account-setup/cv-resume',
            current: `${segment}` === '/cvorresume' ? true : false,
        },
        {
            id: 8,
            title: 'Additional Info',
          imgBefore: '/images/webp/additional-information.webp',
            imgAfter: '/images/webp/additional-information-active.webp',
            href: '/account-setup/additional-information',
            current: `${segment}` === '/additionalinfo' ? true : false,
        },
    ]
    const handleClick = (i:number,link:string) => {



    //  startTransition(()=>{
    //    router.push(`/${currentLocale}/${link}`)
    //     setActive(title)

   

    //  })
                    router.push(`/${currentLocale}${link}`)


        //  if(!isPending){
        // setShowSideBar(false)
        // }

    // setVisable(i)
        
    }
    const [profile, setProfile] = useState(null)
    const fileInputRef = useRef<any | null>(null)

    // const handleProfileUpload = () => {

    //     const file = fileInputRef?.current
    //         ? fileInputRef?.current.files[0]
    //         : null

    //     if (file && file.type.startsWith('image/')) {
    //         setProfile(file)
    //     } else {
    //         alert('Invalid file type. Please upload an image')
    //     }
    // }

        const toggleHover = (id:number |  null) => {
        setHover((prev:any) => (prev === id ? null : id))
    }

    const handleNavigateFillEmail =()=>{

        router.push(`/${currentLocale}/account-setup/to-verify/fill-email`)
    }
    const handleNavigate =()=>{

        router.push(`/${currentLocale}/account-setup/to-verify/fill-phone`)
    }


    return (
        <>
            <div className="visible  lg:hidden xl:hidden">
                <SideBarResponsive imageFileUrl={imageFileUrl}
                    imageFile={imageFile}
                    profileUploadTrigger={profileUploadTrigger}
                    showMessage={showMessage}  
                    mutate={mutate}
                    getRootProps={getRootProps}
                    setImageFile={setImageFile}
                    setImageFileUrl={setImageFileUrl} sideBarItem={sideBarItem} handleClick={handleClick}
                    pathname={pathname}
                    currentLocale={currentLocale} personInformation={personInformation} setUpProcessPercent={setUpProcessPercent}
                  />
            </div>
            <div  className=" hidden md:flex md:w-[20rem] px-2 min-h-screen gap-y-10  lg:flex xl:flex flex-col h-full no-scrollbar overflow-y-auto py-7">
                <div className="flex flex-col">
                    {sideBarItem.map((option:any,i:number) => {

                        return (
                            <Box 
                                key={i}
                                //   onMouseEnter={() => toggleHover(option.id)}
                                //     onMouseLeave={() => toggleHover(null)}
                                onClick={() => handleClick(i,option.href)}
                                style={{ minHeight: '50px' }}
                                className={`whitespace-nowrap cursor-pointer pl-5 my-1 ${
                                       pathname === `/${currentLocale}${option.href}` ||  pathname === option.href
                                        ? ' bg-[#197CC0] text-white'
                                        : ' bg-white text-black  '
                                } w-full  flex  items-center text-center rounded-lg gap-x-4`}>
                                   <Image width={16} height={16}
                                        alt={option.title}
                                        src={`${
                                        pathname === `/${currentLocale}${option.href}` || 
                                    pathname === option.href
                                                ? option.imgAfter
                                                
                                                : option.imgBefore
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

                <div className="flex flex-col justify-center px-8 pb-3">
                    {/* <p className="text-[#6B7280] text-sm font-normal leading-4">
                        Your Progress
                    </p> */}
                    {/* <!-- Progress --> */}
                    {/* <div className="flex items-center pt-2 gap-x-3 whitespace-nowrap">
                        <div
                            className="flex w-full h-2 overflow-hidden bg-[#F2F4F7] rounded-full "
                            >
                            <div className={`flex flex-col justify-center w-[${100}%] overflow-hidden text-xs text-center text-white transition duration-500 bg-[#197CC0] rounded-full whitespace-nowrap`} style={{ 
                              width:`${setUpProcessPercent?.data?.setup_process_percent}%`
                             }}>
                                <div></div>
                            </div>
                        </div>
                        <div className="w-10 text-end">
                            <span className="text-sm text-[#344054] font-medium leading-5">
                               {setUpProcessPercent?.data?.setup_process_percent}
                                %
                            </span>
                        </div>
                    </div> */}
                    {/* <!-- End Progress --> */}
                </div>
            </div>
        </>
    )
}
export default SideBar


// <div {...getRootProps()} className="relative">
// {imageFileUrl ? (
// <div className="relative mx-auto  w-[100px] h-[100px]">
// {
// imageFile && <>

// <FiCheck
// className="absolute -bottom-2 right-5 text-green-600"
// onClick={async(e) => {
// e?.stopPropagation();
// // setImageFile(null);
// // setImageFileUrl(null);

// const formData =new FormData()
// formData.append("profile",imageFile?.[0] ?? '')
// await  profileUploadTrigger({
// data:formData
// },{
// onSuccess:(res)=>{

// showMessage({
// message: "Uploaded Profile Successfully",
// severity: SEVERITY.SUCCESS,
// });
// setImageFile(null);
// //             setImageFileUrl(null);
//                    mutate()

// },
// onError:(error)=>{
// showMessage({
// message:error.response.data.message,
// severity: SEVERITY.ERROR,
// });
// }
// })
// }}
// />
// <FiX
// className="absolute -bottom-2 right-0 text-red-500"
// onClick={(e) => {
// e?.stopPropagation();
// setImageFile(null);
// setImageFileUrl(null);
// }}
// />
// </>
// }


// <Image
// src={imageFileUrl}
// width={50}
// height={50}
// alt=""
// className="mx-auto rounded-full w-[100px] h-[100px]"
// />
// </div>
// ) : (
// <div >
// {imageFileUrl ? (
// <div className="relative mx-auto  w-[100px] h-[100px]">
// <FiX
// className="absolute bottom-0 right-0 text-vermilion_bird"
// onClick={(e) => {
// e?.stopPropagation();
// setImageFile(null);
// }}
// />
// <Image
// width={50}
// height={50}
// src={imageFileUrl}
// alt=""
// className="mx-auto rounded-full w-[80px] h-[80px] border border-gray-100"
// />
// </div>
// ) : (
// <div className="w-full">
// <Image
// width={80}
// height={80}
// src={'/images/defaultProfile.png'}
// className="mx-auto"
// alt="default profile"
// />
// <button
//    className="absolute bottom-0 items-center w-6 h-6 rounded-full  left-14"
//   >
//    <div className="flex justify-center">
//        <Image alt="" width={14} height={14} src="/images/edit-05.png" />
//    </div>
// </button>

// {/* {error && <p className="mt-3 text-sm text-center text-red-500">{error}</p>} */}
// </div>
// )}
// </div>
// )}
// {/* edit button to upload picture */}


// {/* invisible file input triggered by the edit button */}
// {/* <input
//    type="file"
//    ref={fileInputRef}
//    accept="image/*"
//    style={{ display: 'none' }}
//    onClick={handleProfileUpload}
// /> */}
// </div>