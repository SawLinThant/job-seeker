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
import { FiBarChart, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { cn } from '@/utils/cn'
import moment from 'moment'
import dayjs from 'dayjs'
import appAxios from '@/lib/axios'
import { fileUploadFun, useGetAccountSetUpProcess, useGetStudentPersonalEducation, useGetStudentPersonalWorkExperience, useMutateEducation, useMutateWorkExperience } from '@/services/authService'
import Loading from '@/components/ui/loading/Loading'
import LoadingDialog from '@/components/ui/dialog/LoadingDialog'
import { LuBookOpen } from "react-icons/lu";
import { CiCalendar } from 'react-icons/ci'
import { MdLocationOn, MdOutlineFileDownload } from 'react-icons/md'
import RSelect from '@/components/ui/text-field/RSelect'
import { useGetCountries, useGetJobIndustry, useGetJobLevel } from '@/services/jobService'
import { FaRegBuilding } from "react-icons/fa";
import { Box } from '@mui/material'
import MobileBackHeader from './MobileBackHeader'
const WorkExperience = () => {
      const {data:setUpProcessPercent,mutate:setUpProcessPercentMutate} =useGetAccountSetUpProcess()
      const { showMessage } = useSnackbar();
        const {data:jobsLevel}=useGetJobLevel()
        const {data:industryJob}=useGetJobIndustry()
    const { data: countryList, isLoading: loadingCountry } = useGetCountries();

      const [step,setStep]=useState(0)

      const [isExpend,setIsExpend]=useState<boolean>(false)

      const [isLoading,setIsLoading]=useState(false)

      const {data:workExperiences ,mutate,isLoading:isLoadingEducation} =useGetStudentPersonalWorkExperience()

      const {trigger:workExperienceTrigger,isMutating }=useMutateWorkExperience()

    const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const router =useRouter()

  const searchParams=useSearchParams()
    const [error,setError]=useState<{
      nameError?:string,
      videoError?:string,
    }|null>(null)
        const [imageFile, setImageFile] = useState<any | null>(null);
        const [imageFileInfo, setImageFileInfo] = useState<any>(null);


  const type=searchParams.get('type')
    const methods = useForm<any>();

    const onSubmit=async (data:any)=>{

      if(step===0){
        setStep(1)

      }else{
          const params={
    "job_title": data?.position_title,
    "company_name": data?.company_name,
    "job_position_level_id":data?.jobPosition,
    "job_industry_id": data?.industry,
    "country_id":data?.country,
    "joined_date":  dayjs(data?.joined_date).format("YYYY-MM-DD"),
    "end_date":  dayjs(data?.end_date).format("YYYY-MM-DD"),
    "description": data?.description,
    "doc_file_ids" : imageFileInfo?.map((_:any)=> _?.id)
}


      await workExperienceTrigger(params,{
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
            `/${currentLocale}/account-setup/work-experience`
          );
          methods.reset()
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


  


    }

      const onDrop = useCallback(async(acceptedFiles: any, fileRejections: any) => {

     


   try {


  const multipleA = await Promise.all(acceptedFiles?.map( async(_:any)=>{

    const formData=new FormData()

  formData.append("file",_)


  


  let res = await fileUploadFun(formData)





  return {
    "id": res?.data?.data?.id,
    "title": res?.data?.data?.title,
    "path": res?.data?.data?.path,
    "size": res?.data?.data?.size,
    "file_format": res?.data?.data?.file_format,
    "created_at": res?.data?.data?.created_at,
    "updated_at": res?.data?.data?.updated_at
}



  }))



  setImageFile(multipleA)
  
setImageFileInfo(multipleA)

 


} catch (error) {
  // Only runs when there is an error/exception
} finally {
}

  }, []);

  //    const checkFilSize = (file: File) => {
  //   // if (file.size > 1024 * 1024) {
  //   //   toast.error("file size is too large");
  //   //   return {
  //   //     code: "file size is too large",
  //   //     message: "file size should be less than 25 MB",
  //   //   };
  //   // }
  //   return null;
  // };

      const { getRootProps, getInputProps } = useDropzone({
    // validator: checkFilSize,
    onDrop,
    multiple:true
    
  });


   const optionJobPosition = jobsLevel?.data?.map((_: any) => ({
      label: _?.name,
      value: _?.id,
    }));
   const optionJobIndustry = industryJob?.data?.map((_: any) => ({
      label: _?.name,
      value: _?.id,
    }));

      const optionCountryA = countryList?.data?.map((_: any) => ({
    label: _?.name_en,
    value: _?.id,
  }));

  return (
    <div>

            <Box className="hidden md:block">
               <Nav/>
            </Box>
            <MobileBackHeader title="Work Experience"/>
                <div className="w-full flex items-start">
                            <SideBar />


                            {
                              isLoadingEducation ?<LoadingDialog isLoading={isLoadingEducation}/>  :         <div className='w-[90%] md:w-[70%] mx-auto border shadow-md px-10 mt-5 py-10'>

                                


                                {

                                  type?<div>

<p className='text-md text-center font-bold'>Work Experience</p>


<div className='flex gap-x-4  my-6'>
                                {
                                  ["Employment Details","Career Documentation"].map((_,i)=>(
                                    <div key={i} className={cn("py-2 rounded-lg w-full flex gap-x-2 justify-center items-center bg-[#FCFCFD]",step ===i && ("bg-[#EFF8FF]"))} onClick={()=>{
                                        setStep(i)
                                    }}>

                                      {
                                        _
                                      }

                                      <div className={cn("w-5  h-5  rounded-full text-xs flex justify-center items-center bg-[#F2F4F7]",i===step && "bg-primary text-white")}>

                                        {i+1}
                                      </div>





                                      
                                    </div>
                                  ))
                                }
</div>


 <FormProvider {...methods}>

  <form onSubmit={methods.handleSubmit(onSubmit)}>

{
  step ===0 && (
    <div>

          <div>
        <RTextField
                      type="text"
                      label="Position Title"
                      placeholder="For eg.web designer"
                      name="position_title"
                      required="Position Title  is required."
                      isStar
                    />
    </div>
           <div className="pt-8">
                {optionJobPosition && (
                    <RSelect
                    isStar
                      name="jobPosition"
                      label={'Position Level'}
                      placeholder=""
                      array={optionJobPosition}
                      selectedText="Choose position"
                      required="Position Level  is required."
                    />
                  )}
                  </div>
           <div className="pt-8">
                {optionJobIndustry && (
                    <RSelect
                    isStar
                      name="industry"
                      label={'Industry'}
                      placeholder=""
                      array={optionJobIndustry}
                      selectedText="Choose industry"
                      required="Industry  is required."
                    />
                  )}
                  </div>


        <div className='flex gap-x-4 mt-8'>

         <div className="w-full">

            <RTextField
                      type="text"
                      label="Company  name"
                      placeholder="Enter Company Name"
                      name="company_name"
                      required="Company  name  is required."
                      isStar
                    />
         </div>
         <div className="w-full">
           {optionCountryA && (
                    <RSelect
                    isStar
                      name="country"
                      label={'Country'}
                      placeholder=""
                      array={optionCountryA}
                      selectedText="Choose country"
                      required="Country  is required."
                    />
                  )}
         </div>

          </div>
        <div className='flex gap-x-4 mt-8'>

          <RDateTextField width name="joined_date" label="Joined" validateMessage="Joined is required."   />
          <RDateTextField width name="end_date" label="End Date" validateMessage="End Date is required"  />

          </div>

    

    <RTextArea
   isStar
                    className="col-span-2 mt-8"
                    label="Description"
                    placeholder="Enter a description for your experience"
                    name="description"
                    required="Description is required."
                  />
    </div>
  )
}

                  {
                    step === 1 && (
                      <div>


                    <p className='  mb-2 block text-sm text-[#344054] my-8'>Upload Related Certification<span className='text-red-700 '>*</span></p>


                                    {imageFile ? (
              <div className="relative "> 

              {
                imageFileInfo?.map((_f:any,i:number)=>(

                  <Box key={i} className="w-full">
 <div key={i} className='border flex gap-x-5 items-start border-[#EAECF0] px-3 py-2 rounded-lg mb-2'>
                                    <Image src="/images/uploadVideo.svg" width={40} height={40} alt="upload-video"/>


             <div className='w-full'>
                   <div className='flex'>

                    <div>

                          <p>{_f?.title}</p>
                <p>{_f?.size}</p>
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

                  </Box>
  
                ))
              }

           
               
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

                    <p className="text-center  mt-5 text-gray-700 text-sm">Highlight your work with diverse documentation, showcasing your qualifications and capabilities for a detailed overview.</p>
                      </div>
                    )
                  }



                        <div className='mt-10 flex w-full gap-x-5 '>

                {
                    ["Cancel","Next"].map((_,i)=>(
                        <button type={i===1?"submit":"button"}  key={_} className={cn('w-full py-3 rounded-md text-center cursor-pointer',i ===1 && "bg-primary text-white",i===0 && ("border border-[#EAECF0]"),i===1 && (isMutating || isLoading) && "pointer-events-none opacity-50" )} onClick={()=>{
                            if(i===0){
                                router.push(`/${currentLocale}/account-setup/work-experience`)
                            }
                        }} >{
                          (i===1 && (isMutating || isLoading) ) ? <Loading />:(i===1 && step ===1)? "Save": _
                          
                          }</button>
                    ))
                }

            </div>


  </form>


 </FormProvider>

                                  </div> :<>
                                  
                                   <div className={cn('w-full  flex justify-between items-start bg-[#FCFCFD] px-4 py-3   rounded-md   mb-8',workExperiences?.data?.length === 0 &&"border-b border-gray-300 bg-white  rounded-none pt-2 pb-4" )}>
                                      <p className='text-md  font-bold'>Work Experience</p>
                                      <div className='px-3 py-1 bg-primary text-white text-sm rounded-md cursor-pointer' onClick={()=>{

                                        // setName("")
                                        // setImageFile(null)

                                        router.push(`/${currentLocale}/account-setup/work-experience?type=create`)
                                        setImageFile(null)
setImageFileInfo(null)
setStep(0)
                                      }}>Add</div>
                                    </div>


                                    {
                                      workExperiences?.data?.length === 0?  <>   <p className='text-sm text-center mb-1 text-[#344054]'>There is no work experience added yet.</p>
                                    <p className='text-sm text-center mb-1 text-[#344054]'>You can add your work experience by clicking on the right top button above.</p></>:<div>

                                      {
                                        workExperiences?.data?.map((_y:any,i:number)=>(
                                          <div key={i} className='shadow-md px-6 py-6 mt-5'>

                                            <p><span className="text-primary text-md">{_y?.job_title}</span>&nbsp;<span className="text-sm">{_y?.company_name}</span></p>

                                            <div className="my-4">
                                              <div className="flex gap-x-2 items-center">
                                                <FiBarChart className="text-primary" />
                                                <p className=" text-[#344054] text-sm">{_y?.job_position_level}</p>

                                              </div>
                                              <div className="flex gap-x-2 items-center">
                                                <FaRegBuilding className="text-primary" />
                                                <p className=" text-[#344054] text-sm"> {_y?.job_industry}</p>

                                              </div>
                                              <div className="flex gap-x-2 items-center">
                                                <MdLocationOn className="text-primary" />
                                                <p className=" text-[#344054] text-sm capitalize">{_y?.country_id}</p>

                                              </div>
                                              <div className="flex gap-x-2 items-center">
                                                <CiCalendar className="text-primary" />
                                                <p className=" text-[#344054] text-sm capitalize">{_y?.joined_date} - {_y?.end_date}</p>

                                              </div>
                                          
                                            </div>


                                         <div className='flex justify-between'>


                                            <div>

                                              {
                                                _y?.image_career_documentation?.map((_:any,i:number)=>(
                                                   <a key={i} href={_y?.file?.path} download className="text-primary underline text-sm">
                                              {_?.title} ( {_?.size})
                                            </a>
                                                ))
                                              }
                                            </div>


{/* <a href={_y?.file?.path} download><MdOutlineFileDownload className='text-primary text-2xl' />
</a> */}



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

export default WorkExperience