"use client"
import Nav from '@/components/nav'
import React, { useCallback, useState } from 'react'
import SideBar from './sidebar/SideBar'
import { FiEdit, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/utils/cn';
import ReactPlayer from 'react-player'
import { useGetAccountSetUpProcess, useGetPersonInformation, useGetStudentPersonalUploadResumes, useGetStudentPersonalUploadVideo, useMutateProfileUploadCVResume, useMutateVideoUpload } from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import ErrorMessage from '@/components/ui/text-field/ErrorMessage';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import LoadingDialog from '@/components/ui/dialog/LoadingDialog';
import { Box } from '@mui/material';
import MobileBackHeader from './MobileBackHeader';


const CVResume = () => {
  const {data:setUpProcessPercent,mutate:setUpProcessPercentMutate} =useGetAccountSetUpProcess()
      const { i18n } = useTranslation();
  let currentLocale = i18n.language;

  const router = useRouter()

  const searchParams=useSearchParams()

  const addParam = searchParams.get("add");



    const {data:resumeUpload,mutate,isLoading:resumeUploadLoading}=useGetStudentPersonalUploadResumes()

    const { showMessage } = useSnackbar();

    const [error,setError]=useState<{
      nameError?:string,
      videoError?:string,
    }|null>(null)


    const [name,setName]=useState<string>("")

      const [imageFile, setImageFile] = useState<File[] | null>(null);

      const {trigger:resumeUploadTrigger,isMutating}=useMutateProfileUploadCVResume()
  const onDrop = useCallback((acceptedFiles: any, fileRejections: any) => {
    // if (fileRejections.length) {
    //   toast.error(fileRejections[0].errors[0].code);
    //   return;
    // }
    // validateImageOrientation(acceptedFiles[0]);

    setImageFile(acceptedFiles);
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
        <Box className="hidden md:block ">
          <Nav/>
        </Box>
        <MobileBackHeader title="CV & Resume"/>
                <div className="w-full flex items-start">
                            <SideBar />
                               <div className='w-[90%] md:w-[70%] mx-auto border shadow-md px-10 mt-5 py-10'>

                            {
                             resumeUploadLoading ?<LoadingDialog isLoading={resumeUploadLoading}/> :<>
                              
                                  {
                                  (resumeUpload?.data?.length !==0 && !addParam)?<>
                                  
                                    <div className='w-full mb-5 flex justify-between items-start bg-[#FCFCFD] px-6 py-2 rounded-md'>
                                      <p className='text-md font-bold '>Your CV or Resume</p>
                                      <div className='px-3 py-1 bg-primary text-white text-sm rounded-md' onClick={()=>{

                                        setName("")
                                        setImageFile(null)

                                        setError(null)

                                        router.push(`/${currentLocale}/account-setup/cv-resume?add=true`)
                                      }}>Add</div>
                                    </div>

                                    {
                                      resumeUpload?.data?.map((_:any,i:number)=>(

                                    <div className='flex w-full justify-between items-start px-6 py-2 shadow-md mb-2' key={i}>
                                      <div>

                                        <p className='mb-3'>{_?.title}</p>
<a href={_?.path} download="cv" className='mt-8 text-primary underline text-sm'> {_?.file_name}({_?.size})</a>

                                       
                                      </div>

                                      {/* <FiEdit className='text-primary'/> */}



                                    </div>
                                      ))
                                    }





                                  </> :<>
                                  
                                     <p className='text-md font-bold text-center'>You need to upload your CV or Resume</p>
                                <p className='text-md  text-center text-sm'>Submit your CV or Resume as part of your job application to highlight your qualifications and experiences.</p>
                              

            <div>
 <div className="w-full mb-10 mt-10">
      <label id=" g"className="block mb-1 text-sm text-[#344054]">
        Name
      <span className="text-red-600">*</span>
                        

      </label>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e)=>{
            setName(e.target.value)
          }}
          autoComplete='off'
          placeholder="For eg. Resume for Business Management"
        
          className={cn(
            'w-full px-2 py-2 text-sm border rounded-md focus:outline-none focus:ring-0',

          )}
        />
        {error && <ErrorMessage text={error?.nameError as string} />}
      </div>
    </div>

                <p className=' text-sm mb-2'>Upload CV or Resume <span className='text-red-700 '>*</span></p>


                                    {imageFile ? (
              <div className="relative "> 

              <div className='border flex gap-x-5 items-start border-[#EAECF0] px-3 py-2 rounded-lg'>
                                    <Image src="/images/uploadVideo.svg" width={40} height={40} alt="upload-video"/>


             <div className='w-full'>
                   <div className='flex'>

                    <div>

                          <p>{imageFile[0].name}</p>
                <p>16 MB</p>
                    </div>

                     <FiX
                  className="absolute top-3 right-3 text-vermilion_bird"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    setImageFile(null);
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
                      supported file: pdf (max. 23 MB)
                    </span>
                  </div>
                  </div>
                
                )}
              </div>
              </div>
             
            )}

                    {error && <ErrorMessage text={error?.videoError as string} />}

            </div>

            <div className='mt-10 flex w-full gap-x-5 '>

                {
                    ["Cancel","Save"].map((_,i)=>(
                        <div key={_} className={cn('w-full py-3 rounded-md text-center cursor-pointer',i ===1 && "bg-primary text-white",i===0 && ("border border-[#EAECF0]"))} onClick={()=>{

                          if(i===1){

                            if(imageFile && name?.length !==0){

                              const formData=new FormData();
                              formData.append("title",name??"")
                              formData.append("file",imageFile[0])
                              resumeUploadTrigger({
                                data:formData

                              },{
                                   onSuccess: (res) => {
          // ('res', res);

mutate()
          showMessage({
            message: "Uploaded successfully self-intro video",
            severity: SEVERITY.SUCCESS,
          });
            router.push(`/${currentLocale}/account-setup/cv-resume`)
setUpProcessPercentMutate()
       
        },
        onError: (error) => {


          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
                              })
                            }else{


                              if(name?.length ===0){
  setError({
    ...error,
    nameError:"Name is Required"

                              })

                              }else if(!imageFile){
                                setError({
                                  ...error,
                                  videoError:"Cv (or) Resume is required"
                                })

                              }else{

                              }
                            
                            }

                          }else{
                            setImageFile(null)
                          }
                         
                        }}>{_}</div>
                    ))
                }

            </div>
                                  </>
                                }
</>
                            }
                             
                            </div>



                            </div>

                         
                            </div>
  )
}

export default CVResume