'use client'
import Nav from '@/components/nav'
import React, { useCallback, useState } from 'react'
import SideBar from './sidebar/SideBar'
import { cn } from '@/utils/cn'
import { FormProvider, useForm } from 'react-hook-form'
import RSelect from '@/components/ui/text-field/RSelect'
import { fileUploadFun, useGetAccountSetUpProcess, useGetJapaneseLevel, useGetTypeCertifications, useGetTypeExpertCertification, useMutateExpertCertificates } from '@/services/authService'
import ErrorMessage from '@/components/ui/text-field/ErrorMessage'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi'
import RTextArea from '@/components/ui/text-field/RTextArea'
import Loading from '@/components/ui/loading/Loading'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import { Box } from '@mui/material'
import MobileBackHeader from './MobileBackHeader'

const ExpertCertification = () => {
         const {data:setUpProcessPercent,mutate:setUpProcessPercentMutate} =useGetAccountSetUpProcess()

  const searchParams =useSearchParams()
  const type =searchParams.get("type")

  const [ isExpend,setIsExpend]=useState(false)

  const [filterType,setFilterType]=useState(0)
      const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router=useRouter()

  const {data:typeExpertCertificationListAll,mutate:typeExpertCertificationListAllMutate}=useGetTypeExpertCertification("")
  const {data:typeExpertCertificationList,mutate}=useGetTypeExpertCertification(filterType ===0?"":filterType ===1?true:filterType ===2? false:"")
        const { showMessage } = useSnackbar();

        const [isLoading,setIsLoading]=useState(false)

      const [imageFile, setImageFile] = useState<any | null>(null);
        const [imageFileInfo, setImageFileInfo] = useState<any>(null);
    const [step,setStep]=useState(0)
     const methods = useForm<any>();
     const [error,setError]=useState<{
      nameError?:string,
      imageError?:string,
    }|null>(null)

    const {data:typeCertifications} = useGetTypeCertifications(step===0?true:false)
   

     const optionTypeCertifications = typeCertifications?.data?.map((_: any) => ({
      label: _?.title,
      value: _?.id,
    }));
     const valueTypeOfCertification =methods.watch('typeOfCertification') as any;


    const {data:japaneseLevels} =useGetJapaneseLevel(valueTypeOfCertification)


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

   const onDrop = useCallback(async(acceptedFiles: any, fileRejections: any) => {
    // if (fileRejections.length) {
    //   toast.error(fileRejections[0].errors[0].code);
    //   return;
    // }
    // validateImageOrientation(acceptedFiles[0]);

   try {
  // Do something that might trigger an error

  const formData=new FormData()

  formData.append("file",acceptedFiles[0])


  const res =await fileUploadFun(formData)

  setImageFile(res?.data?.data?.path)
  setImageFileInfo([res?.data?.data])


} catch (error) {
  // Only runs when there is an error/exception
} finally {
}  }, []);
        const { getRootProps, getInputProps } = useDropzone({
    validator: checkFilSize,
    onDrop,
        maxFiles: 1,

    
  });

  const {trigger:  expertCertificationTrigger,isMutating}=useMutateExpertCertificates()

     const onSubmit=async(data:any)=>{

      const params ={
    "certification_type_id":data?.typeOfCertification,
    "japanese_level_id":data?.level,
    "description":data?.description,
    "file_id" : imageFileInfo?.[0]?.id
}

await expertCertificationTrigger(params,{
      onSuccess: (res) => {
          // ('res', res);

          setIsLoading(false);

          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          mutate()
          setUpProcessPercentMutate()
          typeExpertCertificationListAllMutate()

          router.push(
            `/${currentLocale}/account-setup/expert-certification`
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

  return (
   <div>

    <Box className="hidden md:block">
      <Nav/>

    </Box>
    <MobileBackHeader title="Expert Certification" />
                <div className="w-full flex">
                            <SideBar />

      <div className="w-full lg:pt-10">
        {
         ( typeExpertCertificationListAll?.data?.length ===0 || type) ?  <div className='w-[90%] px-3 md:px-36 mx-auto bg-white  py-4 shadow-md rounded-md mt-4'>
              <p className='text-center mb-5 font-bold'>Expert Certification</p>

              <div className='flex gap-x-4  my-6'>
                                {
                                  ["Japanese Language","Other Certification"].map((_,i)=>(
                                    <div key={i} className={cn("py-2 rounded-lg w-full flex gap-x-2 justify-center items-center border bg-[#FCFCFD] cursor-pointer",step ===i && ("bg-primary text-white border-none"))} onClick={()=>{
                                        setStep((i))
                                    }}>

                                      {
                                        _
                                      }

                                    





                                      
                                    </div>
                                  ))
                                }
</div>
 <FormProvider {...methods}>

  <form onSubmit={methods.handleSubmit(onSubmit)}>

    <div className='w-full pt-8'>
 {optionTypeCertifications && (
                    <RSelect
                    isStar
                      name="typeOfCertification"
                      label={'Type of Certification'}
                      placeholder=""
                      array={optionTypeCertifications}
                      selectedText="Choose  Certification"
                      required="Type of Certification *  is required."
                    />
                  )}
    </div>
    {
       (japaneseLevels?.data && step ===0) && <div className='w-full pt-8'>
              <p className="block mb-2 text-sm text-[#344054]">
               Level
                <span className="text-red-600">*</span>
              </p>
              <div className="flex gap-4">

                {
                  japaneseLevels?.data?.map((_:any,i:number)=>(
                     <div key={i} className="flex items-center gap-2">
                  <input
                    autoComplete="off"
                    id={_?.id}
                    type="radio"
                    className=" focus:ring-0"
                    value={_?.id}
                    {...methods.register("level", {
                      required: "Level is required",
                    })}
                  />
                  <label htmlFor={_?.id} className='text-[#344054] text-sm'>{_?.title}</label>
                </div>
                  ))
                }
                {/* <div className="flex items-center gap-2">
                  <input
                    autoComplete="off"
                    id="male"
                    type="radio"
                    className=" focus:ring-0"
                    value="male"
                    {...methods.register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <label htmlFor="male" className='text-[#344054] text-sm'>Male</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    autoComplete="off"
                    id="female"
                    value="female"
                    type="radio"
                    className=" focus:ring-0"
                    {...methods.register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <label htmlFor="female" className='text-[#344054] text-sm'>Female</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    autoComplete="off"
                    id="others"
                    value="others"
                    type="radio"
                    className=" focus:ring-0"
                    {...methods.register("gender", {
                      required: "Gender is required",
                    })}
                  />
                  <label htmlFor="others" className='text-[#344054] text-sm'>Others</label>
                </div> */}
              </div>
                  {methods.formState.errors?.gender && (
              <ErrorMessage text={ methods.formState.errors?.gender?.message as string}/>
              )}

              
          
            </div>
    }

      <div>


                    <p className='  mb-2 block text-sm text-[#344054] my-8'>Upload Related Certification<span className='text-red-700 '>*</span></p>


                                    {imageFile ? (
              <div className="relative "> 

              {
                imageFileInfo?.map((_f:any,i:number)=>(
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
                ))
              }

           
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

                    {error && <ErrorMessage text={error?.imageError as string} />}

                
                      </div>

                       <RTextArea
   isStar
                    className="col-span-2 mt-8"
                    label="Description"
                    placeholder="Enter a description for your experience"
                    name="description"
                    required="Description is required."
                  />

                  
    
    <div className='mt-10 flex w-full gap-x-5 '>

                {
                    ["Cancel","Save"].map((_,i)=>(
                        <button type={i===1?"submit":'button'}  key={_} className={cn('w-full py-3 rounded-md text-center cursor-pointer',i ===1 && "bg-primary text-white",i===0 && ("border border-[#EAECF0]"),i===1 && (isMutating || isLoading) && "pointer-events-none opacity-50" )} >{
                          (i===1 && (isMutating || isLoading) ) ? <Loading />: _
                          
                          }</button>
                    ))
                }

            </div>
    
  </form>
  </FormProvider>
              </div> :<div className='w-[90%] px-36 mx-auto bg-white  py-4 shadow-md rounded-md mt-4'>

                   <div className='w-full mb-5 flex justify-between items-start bg-[#FCFCFD] px-6 py-2 rounded-md'>
                                      <p className='text-md font-bold '>Expert Certification</p>
                                      <div className='px-3 py-1 bg-primary text-white text-sm rounded-md cursor-pointer' onClick={()=>{

                                      setImageFileInfo(null)
                                      methods.reset()

                                        router.push(`/${currentLocale}/account-setup/expert-certification?type=true`)
                                      }}>Add</div>
                                    </div>
                                    <div className='flex gap-x-10'>

                                      {
                                        ["All","Japanese Language","Other Certification"].map((_,i)=>(
                                          <div key={i} className={cn("flex text-sm items-center gap-x-2  px-3 py-1 rounded-md cursor-pointer",filterType ===i && "bg-[#EFF8FF] text-primary")} onClick={()=>{
                                            setFilterType(i)
                                          }}>
                                            {
                                              _
                                            }

                                            <div className={cn("w-5 h-5 rounded-full flex justify-center items-center bg-[#F2F4F7] text-xs text-[#344054]",filterType ===i && ("bg-primary/10 text-primary"))}>{i===0?typeExpertCertificationListAll?.all : i===1?typeExpertCertificationListAll?.japanese_certificates:i===2?typeExpertCertificationListAll?.not_japanese_certificates:""}</div>

                                          </div>
                                        ))
                                      }
                                    </div>
                                    <div>

                                      {
                                        typeExpertCertificationList?.data?.map((_d:any,i:number)=>(

                                          <div key={i} className='mt-5'>

                                            <p className='text-md'>{_d?.title} - {_d?.japanese_level}</p>

                                            <a href='' download className='text-primary' >
{_d?.file?.title} ({_d?.file?.size} )
                                            </a>
                                            

                                           
                                          <p className={cn('text-gray-600 mt-5', !isExpend && "truncate-content ")}>

                                        {
                                          _d?.description
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
                </div>
        }


          
      </div>
      </div>
   </div>
  )
}

export default ExpertCertification