"use client"
import Nav from '@/components/nav'
import React, { useCallback, useState } from 'react'
import SideBar from './sidebar/SideBar'
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/utils/cn';
import ReactPlayer from 'react-player'
import { fileUploadFun, useGetAccountSetUpProcess, useGetPersonInformation, useGetStudentPersonalUploadVideo, useMutateDeleteSelfIntroVideo, useMutateVideoUpload } from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import LoadingDialog from '@/components/ui/dialog/LoadingDialog';
import { Box } from '@mui/material';
import Text from '@/components/ui/typo';
import MobileBackHeader from './MobileBackHeader';
import Loading from '@/components/ui/loading/Loading';
import ConfirmRejectDialog from '@/components/ui/dialog/ConfirmRejectDialog';
import Bycrile from '@/components/icons/Bycrile';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import UploadIcon from '@/components/icons/UploadIcon';





const SelfIntroVideo = () => {

  const [isDeleteUpload, setIsDeleteUpload] = useState(false);
  const [isReUpload, setIsReUpload] = useState(false);
  const [isReUploadR, setIsReUploadR] = useState(false);

  const handleIsDeleteUpload = () => {
    setIsDeleteUpload(!isDeleteUpload)
  }
  const handleIsReUpload = () => {
    setIsReUpload(!isReUpload)
  }

  const { data: setUpProcessPercent, mutate: setUpProcessPercentMutate } = useGetAccountSetUpProcess()

  const { data: getProfileUploadVideo, mutate, isLoading: getProfileUploadVideoLoading } = useGetStudentPersonalUploadVideo()

  const { showMessage } = useSnackbar();

  const [imageFile, setImageFile] = useState<File[] | null>(null);
  const [imageFileShow, setImageFileShow] = useState<any | null>(null);

  const { trigger: videoUploadTrigger, isMutating } = useMutateVideoUpload()
  const { trigger: deleteVideoTrigger, isMutating: isMutatingDeleteVideo } = useMutateDeleteSelfIntroVideo()
  const onDrop = useCallback(async (acceptedFiles: any, fileRejections: any) => {
    // if (fileRejections.length) {
    //   toast.error(fileRejections[0].errors[0].code);
    //   return;
    // }
    // validateImageOrientation(acceptedFiles[0]);

    const formData = new FormData()

    formData.append("file", acceptedFiles[0])


    const res = await fileUploadFun(formData)

    setImageFileShow(res?.data?.data)


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


  const deleteModalConfirmFun = () => {
    deleteVideoTrigger({}, {
      onSuccess: (res) => {
        // ('res', res);

        mutate()
        showMessage({
          message: "Deleted  self-intro video",
          severity: SEVERITY.SUCCESS,
        });
        setUpProcessPercentMutate()

        handleIsDeleteUpload()
        setImageFile(null)

      },
      onError: (error) => {


        showMessage({
          message: error.response.data.message,
          severity: SEVERITY.ERROR,
        });
      },
    })

  }

  const reUploadVideoConfirmFun = () => {
    setIsReUploadR(!isReUploadR)

    setIsReUpload(!isReUpload)
  }

  return (
    <div>

      <Box className='hidden md:block'>
        <Nav/>

      </Box>
      <MobileBackHeader title='Self-introduction Video' />

      <div className="w-full flex">
        <SideBar />
        <div className='w-full   px-10 mt-5 py-2'>

          {
            // getProfileUploadVideoLoading ? <LoadingDialog isLoading={getProfileUploadVideoLoading} /> : 
            
            <>
              {
                (getProfileUploadVideo?.data?.path && !isReUploadR) ? <>

                  <p className='text-md  text-center text-md mt-5 mb-3 pb-4  font-bold'>Your Self-Introduced Video</p>

                   {/* <iframe src={getProfileUploadVideo?.data?.path} ></iframe> */}
                  <video width="200" height="452" className='mx-auto rounded-lg' controls>
                    <source src={getProfileUploadVideo?.data?.path} type="video/mp4" />
                  </video>

                  <div className='flex justify-center items-center mt-10 gap-x-3'>
                    <div className='px-3 py-1 rounded-md bg-[#FEF3F2] text-[#B42318] cursor-pointer' onClick={handleIsDeleteUpload}>Delete</div>
                    <div className='px-3 py-1 rounded-md bg-primary text-white cursor-pointer' onClick={handleIsReUpload}>Re-upload</div>
                  </div>

                </> : <>

                  <p className='text-md font-bold text-left mb-3 text-xl'>Self Introduce Video</p>
                  {/* <p className='text-md  text-left text-sm  '>Submit a video as part of your job application to personally introduce yourself.</p>
                  <p className='text-md  text-left text-sm  '>Your Self-Introduced Video</p> */}

                  {imageFileShow ? (
                    <div className="relative ">

                      <div className='border flex gap-x-5 items-start border-[#EAECF0] px-3 py-2 rounded-lg'>
                        {/* <Image src="/images/uploadVideo.svg" width={40} height={40} alt="upload-video" /> */}
                     
                        <div className='w-full'>
                          <div className='flex'>

                            <div>

                              <p>{imageFileShow?.title}</p>
                              <p>{imageFileShow?.size}</p>
                            </div>

                            <FiX
                              className="absolute top-3 right-3 text-vermilion_bird"
                              onClick={(e: any) => {
                                e.stopPropagation();
                                setImageFile(null);
                                setImageFileShow(null);
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
                    <div
                      className="flex items-center justify-center  p-3 rounded-[10px]  border border-dashed"
                      {...getRootProps()}
                    >
                      {imageFileShow ? (
                        <div className="relative flex-1 w-full">
                          <FiX
                            className="absolute top-3 right-3 text-vermilion_bird"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              setImageFile(null);
                              setImageFileShow(null);

                            }}
                          />
                          <Image
                            width={50}
                            height={50}
                            src={
                              imageFileShow?.path && URL.createObjectURL(imageFileShow?.path)
                            }
                            alt=""
                            className="w-full rounded-md "
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-3 flex-1 h-full ">
                        <Bycrile/>

                          <input type="file" {...getInputProps()} />
                          <span className="block  text-[14px] mt-3 text-center  font-semibold">
                          Submit a video as part of your job application to personally introduce yourself.
                          </span>
                          {/* <span className="block text-[#667085] mt-3 text-sm ">
                          Supported file: mp4 (max. 23 MB)
                          </span> */}
                        <PrimaryButton className="py-2 px-5 mt-3 text-sm gap-2">
                             <UploadIcon />  <span className="font-semibold">Click to Upload</span>
                        </PrimaryButton>
                        </div>
                      )}
                    </div>
                  )}

                  <div className='mt-10 flex w-full gap-x-5 '>

                    {
                      ["Cancel", "Save"].map((_, i) => (
                        <div key={_} className={cn('w-full py-3 rounded-md text-center cursor-pointer', i === 1 && "bg-primary text-white", i === 0 && ("border border-[#EAECF0]"), (i === 1 && (imageFile === null || isMutating)) && "bg-primary/50 pointer-events-none")} onClick={() => {

                          if (i === 1) {

                            if (imageFile) {

                              const formData = new FormData();
                              formData.append("self_intro_video", imageFile[0])
                              videoUploadTrigger({
                                data: formData

                              }, {
                                onSuccess: (res) => {
                                  // ('res', res);

                                  showMessage({
                                    message: "Uploaded successfully self-intro video",
                                    severity: SEVERITY.SUCCESS,
                                  });
                                  mutate()

                                  setImageFileShow(null)
                                  setUpProcessPercentMutate()


                                  setIsReUploadR(false)

                                },
                                onError: (error) => {


                                  showMessage({
                                    message: error.response.data.message,
                                    severity: SEVERITY.ERROR,
                                  });
                                },
                              })


                            }

                          } else {
                            setImageFile(null)
                            setImageFileShow(null)
                          }

                        }}>{(isMutating && i === 1) ? <Loading /> : isReUploadR && i === 1 ? "Update" : _}</div>
                      ))
                    }

                  </div>
                </>
              }</>
          }



        </div>



      </div>

      <ConfirmRejectDialog isToggle={isDeleteUpload}
        toggleModal={handleIsDeleteUpload}
        imageUrl="/images/reject-icon.svg"
        title="Delete your self-introduction video"
        desc="Your upload video will be deleted and olonger included when you apply to jobs. Previously submitted video will not be afffected."
        confirmFun={deleteModalConfirmFun}
        reject confirmText="Delete" isMutatingLoading={isMutatingDeleteVideo} />
      <ConfirmRejectDialog isToggle={isReUpload}
        toggleModal={handleIsReUpload}
        imageUrl="/images/reupload-icon.svg"
        title="Re-upload your self-introduction video"
        desc="Uploading a new video will replace your existing one. Are you sure you want to continue?"
        confirmFun={reUploadVideoConfirmFun}
        confirmText="Re-upload" isMutatingLoading={isMutatingDeleteVideo} />


    </div>
  )
}

export default SelfIntroVideo

