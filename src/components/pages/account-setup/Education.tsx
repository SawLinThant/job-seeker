'use client'
import Nav from '@/components/nav'
import React, { useCallback, useState } from 'react'
import SideBar from './sidebar/SideBar'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { FormProvider, useForm } from 'react-hook-form'
import RTextField from '@/components/ui/text-field/RTextField'
import RTextArea from '@/components/ui/text-field/RTextArea'
import RDateTextField from '@/components/ui/text-field/RDateTextField'
import Image from 'next/image'
import ErrorMessage from '@/components/ui/text-field/ErrorMessage'
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { cn } from '@/utils/cn'
import moment from 'moment'
import dayjs from 'dayjs'
import appAxios from '@/lib/axios'
import { fileUploadFun, useGetAccountSetUpProcess, useGetStudentPersonalEducation, useMutateEducation } from '@/services/authService'
import Loading from '@/components/ui/loading/Loading'
import LoadingDialog from '@/components/ui/dialog/LoadingDialog'
import { LuBookOpen } from "react-icons/lu";
import { CiCalendar } from 'react-icons/ci'
import { MdOutlineFileDownload } from 'react-icons/md'
import { Box } from '@mui/material'
import MobileBackHeader from './MobileBackHeader'

const Education = () => {
      const { showMessage } = useSnackbar();

      const [isExpend,setIsExpend]=useState<boolean>(false)

      const [isLoading,setIsLoading]=useState(false)
   const {data:setUpProcessPercent,mutate:setUpProcessPercentMutate} =useGetAccountSetUpProcess()
      const {data:educations ,mutate,isLoading:isLoadingEducation} =useGetStudentPersonalEducation()


      const {trigger:educationTrigger,isMutating }=useMutateEducation()


    const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const router =useRouter()

  const searchParams=useSearchParams()
    const [error,setError]=useState<{
      nameError?:string,
      videoError?:string,
    }|null>(null)
        const [imageFile, setImageFile] = useState<File[] | null>(null);
        const [imageFileInfo, setImageFileInfo] = useState<any>(null);

  const type=searchParams.get('type')
    const methods = useForm<any>();

    const onSubmit=async (data:any)=>{


    const params=  {
    "attended_school":data?.university,
    "field_of_study":data?.health_study,
    "start_date":  dayjs(data?.attended_date).format("YYYY-MM-DD"),
    "end_date": 
        dayjs(data?.end_date).format("YYYY-MM-DD"),
    "description":data?.description,
    "degree":data?.degree,
    "file_id" : imageFileInfo?.id
}

      await educationTrigger(params,{
            onSuccess: (res) => {
          // ('res', res);

          setIsLoading(false);

          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          setUpProcessPercentMutate()
          mutate()

          router.push(
            `/${currentLocale}/account-setup/education`
          );
          methods.reset()
          setImageFile(null)
setImageFileInfo(null)
        },
        onError: (error) => {


          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
      })


    }

      const onDrop = useCallback(async(acceptedFiles: any, fileRejections: any) => {
    // if (fileRejections.length) {
    //   toast.error(fileRejections[0].errors[0].code);
    //   return;
    // }
    // validateImageOrientation(acceptedFiles[0]);

    // setImageFile(acceptedFiles);

   try {
  // Do something that might trigger an error

  const formData=new FormData()

  formData.append("file",acceptedFiles[0])


  const res =await fileUploadFun(formData)


  setImageFile(res?.data?.data?.path)
  setImageFileInfo(res?.data?.data)


} catch (error) {
  // Only runs when there is an error/exception
} finally {
}
  }, []);

     const checkFilSize = (file: File) => {
    // if (file.size > 1024 * 1024) {
    //   toast.error("file size is too large");
    //   return {
    //     code: "file size is too large",
    //     message: "file size should be less than 25 MB",
    //   };
    // }
    return null;
  };

      const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    validator: checkFilSize,
    onDrop,
  });

  return (
    <div>

           <Box className="hidden md:block">
              <Nav/>
           </Box>

           <MobileBackHeader title='Education'/>
                <div className="w-full flex items-start">
                            <SideBar />


                            {
                              isLoadingEducation ?<LoadingDialog isLoading={isLoadingEducation}/>  :         <div className='w-[90%] md:w-[70%] mx-auto border shadow-md px-10 mt-5 py-10'>


                                {

                                  type?<div>

<p className='text-md text-center font-bold'>Education</p>


 <FormProvider {...methods}>

  <form onSubmit={methods.handleSubmit(onSubmit)}>

    <div>
        <RTextField
                      type="text"
                      label="University or Attended School"
                      placeholder="For eg.University of Yangon"
                      name="university"
                      required="University or Attended School  is required."
                      isStar
                    />
    </div>

    <div className='flex gap-x-4 mt-8'>
        <RTextField
                      type="text"
                      label="Degree"
                      placeholder="For eg. MBBS (hons)"
                      name="degree"
                      required="Degree is required."
                      isStar
                    />
        <RTextField
                      type="text"
                      label="Field of Study"
                      placeholder="For eg. Health and Medicine"
                      name="health_study"
                      required="Field of Study is required."
                      isStar
                    />
    </div>
        <div className='flex gap-x-4 mt-8'>

          <RDateTextField width name="attended_date" label="Attended Date" validateMessage="Attended Date is required." maxDate={dayjs(new Date())}  />
          <RDateTextField width name="end_date" label="End Date" validateMessage="End Date is required"  />

          </div>

    

    <RTextArea
   isStar
                    className="col-span-2 mt-8"
                    label="Description"
                    placeholder="Enter a description for your studies ,awards,etc..."
                    name="description"
                    required="Description is required."
                  />

                    <p className='  mb-2 block text-sm text-[#344054] my-8'>Upload Related Certification<span className='text-red-700 '>*</span></p>


                                    {imageFile ? (
              <div className="relative "> 

              <div className='border flex gap-x-5 items-start border-[#EAECF0] px-3 py-2 rounded-lg'>
                                    <Image src="/images/uploadVideo.svg" width={40} height={40} alt="upload-video"/>


             <div className='w-full'>
                   <div className='flex'>

                    <div>

                          <p>{imageFileInfo?.title}</p>
                <p>{imageFileInfo?.size}</p>
                    </div>

                     <FiX
                  className="absolute top-3 right-3 text-vermilion_bird"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setImageFile(null);
                    setImageFileInfo(null);
                  }}
                />
                </div>
              
                <div className='flex gap-x-4 items-center'>
                    <div className='h-2 w-full rounded-xl bg-primary'></div>
                    <p>100%</p>
                </div>
             </div>
              </div>
              <p className='text-green-500 text-xs mt-2 text-right font-normal'> Upload Completed</p>
               
                {/* <Image
                width={50}
                height={50}
                  src={imageFile?.[0] && }
                  alt=""
                  className="md:w-[350px] md:h-[300px] rounded-md "
                /> */}
                  {/* <ReactPlayer
          className='react-player'
          url={URL.createObjectURL(imageFile?.[0])}
          width='100%'
          height='100%'
        /> */}
        {/* <video width="200" height="452" className='mx-auto rounded-lg' controls>
  <source src={URL.createObjectURL(imageFile?.[0])} width={"720"} height="432" type="video/mp4"/>
</video> */}
              </div>
            ) : (
              <div>


 <div
                className="flex items-center justify-center  p-3 rounded-[10px]  border border-dashed"
                {...getRootProps()}
              >
                {imageFile ? (
                  <div className="relative flex-1 w-full">
                    <FiX
                      className="absolute top-3 right-3 text-vermilion_bird"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        setImageFile(null);
                      }}
                    />
                    <Image
                    width={50}
                    height={50}
                      src={
                        imageFile?.[0] && URL.createObjectURL(imageFile?.[0])
                      }
                      alt=""
                      className="w-full rounded-md "
                    />
                  </div>
                ) : (

                  <div>

  <div className="flex flex-col items-center justify-center py-3 flex-1 h-full ">
                   <Image width={50} height={50} src="/images/upload-video.svg"  alt='upload-video'/>

                    <input type="file" {...getInputProps()} />
                    <span className="block text-primary text-[14px] mt-3 mb-1 text-center w-[80%] font-semibold">
                    Click to upload
                    </span>
                    <span className="block text-dim_grey text-sm ">
                      supported file:  JPG or PNG (max. 23 MB)
                    </span>
                  </div>
                  </div>
                
                )}
              </div>
              </div>
             
            )}

                    {error && <ErrorMessage text={error?.videoError as string} />}


                        <div className='mt-10 flex w-full gap-x-5 '>

                {
                    ["Cancel","Save"].map((_,i)=>(
                        <button type={i===1 ? "submit":"button"}  key={_} className={cn('w-full py-3 rounded-md text-center cursor-pointer',i ===1 && "bg-primary text-white",i===0 && ("border border-[#EAECF0]"),i===1 && (isMutating || isLoading) && "pointer-events-none opacity-50" )} onClick={()=>{
                            if(i===0){
                                router.push(`/${currentLocale}/account-setup/education`)
                            }
                        }}>{
                          (i===1 && (isMutating || isLoading) ) ? <Loading />: _
                          
                          }</button>
                    ))
                }

            </div>


  </form>


 </FormProvider>

                                  </div> :<>
                                  
                                   <div className={cn('w-full  flex justify-between items-start bg-[#FCFCFD] px-4 py-3   rounded-md   mb-8',educations?.data?.length === 0 &&"border-b border-gray-300 bg-white  rounded-none pt-2 pb-4" )}>
                                      <p className='text-md  font-bold'>Education</p>
                                      <div className='px-3 py-1 bg-primary text-white text-sm rounded-md cursor-pointer' onClick={()=>{

                                        // setName("")
                                        // setImageFile(null)

                                        router.push(`/${currentLocale}/account-setup/education?type=create`)
                                      }}>Add</div>
                                    </div>


                                    {
                                      educations?.data?.length === 0?  <>   <p className='text-sm text-center mb-1 text-[#344054]'>There is no education added yet.</p>
                                    <p className='text-sm text-center mb-1 text-[#344054]'>You can add your education by clicking on the right top button above.</p></>:<div>

                                      {
                                        educations?.data?.map((_y:any,i:number)=>(
                                          <div key={i} className='shadow-md px-6 py-6 mt-5'>

                                            <p><span className="text-primary text-md">{_y?.attended_school}</span>&nbsp;<span className="text-sm">{_y?.degree}</span></p>

                                            <div className="my-4">
                                              <div className="flex gap-x-2 items-center">
                                                <LuBookOpen className="text-primary" />
                                                <p className=" text-[#344054] text-sm">{_y?.field_of_study}</p>

                                              </div>
                                              <div className="flex gap-x-2 items-center">
                                                <CiCalendar className="text-primary" />
                                                <p className=" text-[#344054] text-sm">{_y?.start_date} - {_y?.end_date}</p>

                                              </div>
                                            </div>


                                         <div className='flex justify-between'>


                                             <a href={_y?.file?.path} download className="text-primary underline text-sm">
                                              {_y?.file?.title} ( {_y?.file?.size})
                                            </a>


<a href={_y?.file?.path} download><MdOutlineFileDownload className='text-primary text-2xl' />
</a>



                                         </div>

                                          <p className={cn('text-gray-600 mt-5', !isExpend && "truncate-content ")}>

                                        {
                                          _y?.description
                                        }
                                      </p>

                                      <div className='py-2 flex justify-center mt-5  text-center bg-[#F2F4F7] rounded-lg' onClick={()=>{
                                        setIsExpend(!isExpend)
                                      }}>


                                        {!isExpend ?<FiChevronDown  className='text-primary'/>
 :<FiChevronUp className='text-primary'/>
}


                                      </div>



                                          </div>
                                        ))
                                      }
                                     
                                    </div>
                                    }

                                 
                                  </>
                                }


                                    


                               </div>
                            }
                       
                               </div>
    </div>
  )
}

export default Education