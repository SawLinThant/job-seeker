'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useGetStudentId from '@/hooks/useGetStudentData';
import { useTranslation } from 'react-i18next';
import {
  useGetJobList,
  useGetJobPopularList,
  useMutateJobApply,
  useMutateSavedUnSaveJob,
} from '@/services/jobService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import LocationIcon from '@/components/icons/location';
import RightArr from '@/components/icons/rightArr';
import Lotting from '@/components/icons/lotting';
import Star from '@/components/icons/star';
import Saveicon from '@/components/icons/Saveicon';
import EyeOutline from '@/components/icons/eye-outline';
import ManyUser from '@/components/icons/Manyuser';
import JobIcon from '@/components/icons/job';
import { cn } from '@/utils/cn';

const Card: React.FC<any> = ({ jobData, mutateInfinite }) => {
  const { showMessage } = useSnackbar();

  const { data: popularJob, mutate: mutatePopularJobList } = useGetJobPopularList();

  const { trigger: saveUnSaveTrigger, isMutating: saveUnSaveIsMutating } =
    useMutateSavedUnSaveJob();

  const { data: jobLists, mutate } = useGetJobList({ pageIndex: 0, pageSize: 4 }, '', []);

  const { trigger: jobApplyTrigger, isMutating } = useMutateJobApply();
  const router = useRouter();
  const { t, i18n } = useTranslation();
  let currentLocale = i18n.language;

  const { studentId } = useGetStudentId();

  const handleRoute = (id: string) => {
    router.push(`/jobs/${id}`);
  };

  return (
    <div className="bg-white w-full rounded-md text-xs 2xl:text-sm py-4 mb-5  ">
      <div className="flex flex-col gap-4 ">
        <div className="flex px-4 items-center justify-between capitalize flex-wrap">
          <div className="flex items-center flex-wrap  gap-2">
            <Image
              src={jobData.companyLogo}
              alt=""
              width={30}
              height={30}
              className="rounded-full object-cover"
            />
            <p className="text-sm">{jobData.company}</p>
            <p></p>
            <LocationIcon />
            <p className="text-[#197CC0]">{jobData.location}</p>
          </div>
          <div className="cursor-pointer" onClick={() => handleRoute(jobData.id)}>
            <RightArr />
          </div>
        </div>
        <div className="px-4">
          <p className="text-sm font-semibold text-wrap mt-2">{jobData.title}</p>
        </div>
        <div className=" px-4 flex gap-2">
          {/* <p className='px-2 inline-block py-1 bg-[#EFF8FF] rounded-full text-[#197CC0]'>On sit</p> */}
          <p className="px-2 py-1 inline-block rounded-full bg-[#EFF8FF] text-[#197CC0]">
            {jobData.jobType}
          </p>
        </div>
        <div className="px-4">
          <p className="text-[#197CC0] text-2xl mb-2 font-semibold">
            ¥ {jobData.salary.start}~{jobData.salary.end}{' '}
            <span className="text-sm text-[#197CC0] lowercase font-normal">/ mo</span>
          </p>
        </div>
        <div className="flex px-4 flex-wrap justify-between items-center">
          <p className="text-[#667085]">Posted {jobData.date}</p>
          <div className="flex items-center gap-2">
            <Lotting />
            <p className="capitalize">{jobData.gender}</p>
            <span className="inline-block w-[1px] bg-[#D0D5DD] h-[15px]"></span>
            <p className="text-[#197CC0]">Last apply date : {jobData.lastApplyDate}</p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-white border-[1px] border-[#D0D5DD] my-1 border-dashed" />
        <div className="px-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center mb-3 gap-2 flex-wrap">
              <Star />
              <p className="text-[#344054]">{jobData.rating}</p>
              <span className="inline-block w-[1px] bg-[#D0D5DD] h-[15px]" />
              <EyeOutline />
              <span className="inline-block text-[#667085]">{jobData.views} </span>
              <span className="inline-block w-[1px] bg-[#D0D5DD] h-[15px]" />
              <ManyUser />
              <span className="inline-block text-[#667085]">{jobData.applicants} Applicants</span>
            </div>
            <div className="flex items-center flex-wrap gap-3">
              <button
                onClick={async () => {
                  if (studentId) {
                    if (jobData?.is_saved) {
                      await saveUnSaveTrigger(
                        {
                          id: jobData?.id,
                          status: false,
                        },
                        {
                          onSuccess: (res) => {
                            mutateInfinite && mutateInfinite();
                            showMessage({
                              message: res?.data?.data?.message,
                              severity: SEVERITY.SUCCESS,
                            });
                            mutate();
                            mutatePopularJobList();
                          },
                          onError: (error) => {
                            showMessage({
                              message: error?.response?.data?.message,
                              severity: SEVERITY.ERROR,
                            });
                          },
                        }
                      );
                    } else {
                      await saveUnSaveTrigger(
                        {
                          id: jobData?.id,
                          status: true,
                        },
                        {
                          onSuccess: (res) => {
                            mutatePopularJobList();
                            mutateInfinite && mutateInfinite();

                            showMessage({
                              message: res?.data?.data?.message,
                              severity: SEVERITY.SUCCESS,
                            });
                            mutate();
                          },
                          onError: (error) => {
                            showMessage({
                              message: error?.response?.data?.message,
                              severity: SEVERITY.ERROR,
                            });
                          },
                        }
                      );
                    }
                  } else {
                    router.push(`/${currentLocale}/login`);
                  }
                }}
                className="p-3 flex items-center gap-3 hover:bg-gray-300 transition-all duration-75 ease-in-out border rounded-lg"
              >
                <Saveicon />{' '}
                <span className="text-sm"> {t(jobData?.is_saved ? 'saved_lbl' : 'save_lbl')}</span>
              </button>
              <button
                disabled={jobData?.is_applied}
                onClick={async () => {
                  try {
                    if (studentId) {
                      await jobApplyTrigger(
                        {
                          id: jobData?.id,
                        },
                        {
                          onSuccess: (res) => {
                            mutatePopularJobList();
                            showMessage({
                              message: res?.data?.data?.message,
                              severity: SEVERITY.SUCCESS,
                            });
                            mutate();
                            mutateInfinite && mutateInfinite();
                          },
                          onError: (error) => {
                            showMessage({
                              message: error?.response?.data?.message,
                              severity: SEVERITY.ERROR,
                            });
                          },
                        }
                      );
                    } else {
                      router.push(`/${currentLocale}/login`);
                    }
                  } catch (error) {
                    console.log('error triggering apply job', error);
                  } finally {
                  }
                }}
                className={cn(
                  'p-3 flex items-center gap-3 bg-[#197CC0] hover:bg-[#154e77] transition-all duration-100 ease-in-out  text-white rounded-lg',
                  jobData?.is_applied && 'pointer-events-none opacity-50'
                )}
              >
                <JobIcon />{' '}
                <span className="text-sm">
                  {' '}
                  {t(jobData?.is_applied ? 'applied_job_lbl' : 'apply_job_lbl')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <Link href={`/${currentLocale}/jobs/${jobData?.id}`} >
    //     <div className="flex flex-col justify-between w-full gap-4 p-[18px] md:pt-6 md:pb-4 lg:pt-8 lg:px-6 bg-white rounded-lg mb-5 -z-1">
    //       <div className="flex flex-col md:flex-row md:item-center md:justify-between gap-2 md:gap-[50px]">
    //         <p
    //           onClick={() => handleRoute(jobData.id)}
    //           className="text-sm md:text-lg font-medium text-[#101828] md:truncate hover:text-blue-500 cursor-pointer"
    //         >
    //           {jobData?.title}
    //         </p>
    //         <div className="flex items-center gap-2 bg-[#F2F4F7] px-[6px] md:px-2.5 py-[2px] rounded-2xl w-fit min-w-fit">
    //           <Image alt="eye" src="/images/eye.svg" width={20} height={20} />
    //           <p className="text-xs md:text-sm text-[#344054] text-nowrap">{+jobData.views} Views</p>
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-2 -mt-1 md:flex-row md:items-center md:gap-4">
    //         <div className="flex items-center gap-2 md:max-w-[30%] xl:max-w-[50%]">
    //           <Image
    //             src={jobData?.companyLogo || "/logo.svg"}
    //             alt="company logo"
    //             width={20}
    //             height={20}
    //             className="object-fill w-10 h-10 rounded-full"
    //           />
    //           <p className="text-xs lg:text-sm font-medium text-[#101828] truncate">
    //             {jobData?.company}
    //           </p>
    //         </div>
    //         <div className="flex items-center gap-4">
    //           <div className="flex items-center gap-2 bg-[#F2F4F7] px-2.5 py-[2px] rounded-2xl min-w-fit">
    //             <Image alt="eye" src="/icons/location.svg" width={20} height={20} />
    //             <p className="text-xs lg:text-sm font-medium text-[#344054]">{jobData.location}</p>
    //           </div>
    //           <div className="flex items-center gap-2 bg-[#F2F4F7] px-2.5 py-[2px] rounded-2xl min-w-fit">
    //             <Image alt="eye" src="/images/user.svg" width={20} height={20} />
    //             <p className="text-xs lg:text-sm font-medium text-[#344054]">
    //               {jobData?.applicants} Applicants
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-4 md:flex-col-reverse">
    //         <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
    //           <div className="flex items-center gap-4">
    //             <p className="capitalize text-xs md:text-sm text-[#344054] font-medium">
    //               salary range :
    //             </p>
    //             <p className="text-[#197CC0] text-sm md:text-lg font-semibold">
    //               {jobData?.salary?.start} ~ {jobData?.salary?.end}/m
    //             </p>
    //           </div>
    //           <div className="flex justify-start items-center gap-3 text-xs font-medium lg:text-sm">
    //             <span className="text-[#175CD3] bg-blue-50 px-2 py-[2px] md:p-2 rounded-full">
    //               {jobData?.workEnvironment}
    //             </span>
    //             {/* <span
    //               className={`${
    //                 jobData.jobType == 'part time'
    //                   ? 'text-[#B93815] bg-red-50'
    //                   : 'text-[#175CD3] bg-blue-50'
    //               } px-2 py-[2px] md:p-2 rounded-full capitalize`}
    //             >
    //               {jobData.jobType}
    //             </span> */}
    //           </div>
    //         </div>
    //       </div>
    //       <div className="flex items-center justify-between">
    //         <div className="flex items-center gap-3">
    //           <p className="text-xs md:text-sm text-[#344054] font-medium">Ratings:</p>
    //           <StarRating className="w-6" rating={jobData.rating} disabled={true} />
    //         </div>
    //         {/* <p className="text-xs md:text-sm text-[#475467] font-medium text-end md:text-start">
    //           +4 comments
    //         </p> */}
    //       </div>

    //       <div className="flex items-center justify-between text-xs md:text-sm">
    //         <p className="mb-2 text-[#667085]">Posted on :{jobData.date}</p>
    //         <p className={`${jobData.lastApplyDate == 'Today' ? 'text-[#B42318]' : 'text-[#475467]'}`}>
    //           Last Apply : {jobData.lastApplyDate}
    //         </p>
    //       </div>

    //       {/* <div className="flex flex-col w-full mt-2 text-xs font-medium md:flex-row max-md:items-center max-md:justify-between">
    //                 <div className="flex items-start justify-between w-full mb-4">

    //                     <div>
    //                         <StarRating
    //                             className="w-6"
    //                             rating={jobData.rating}
    //                             disabled={true}
    //                         />
    //                         <p className="text-sm text-[#344054] font-medium text-end md:text-start">
    //                             +4 comments
    //                         </p>
    //                     </div>
    //                 </div>

    //                 <div className="flex flex-row w-full text-sm font-medium max-md:justify-between text-end md:items-end md:flex-col">
    //                     <p className="mb-2 text-[#101828]">
    //                         Posted on :{jobData.date}
    //                     </p>
    //                     <p
    //                         className={`${
    //                             jobData.lastApplyDate == 'Today'
    //                                 ? 'text-[#B42318]'
    //                                 : 'text-[#475467]'
    //                         }`}>
    //                         Last Apply : {jobData.lastApplyDate}
    //                     </p>
    //                 </div>
    //             </div> */}

    //       <div className="flex items-center justify-end gap-2 -mt-1 md:gap-6">
    //         <SecondaryButton
    //  className={`text-sm font-semibold px-[14px] py-2 gap-2`}    onClick={async() => {
    //           if(studentId){
    //                   if(jobData?.is_saved){
    //             await saveUnSaveTrigger({
    //               id:jobData?.id,
    //               status:false
    //             },{
    //                onSuccess:(res)=>{
    //               mutateInfinite && mutateInfinite()
    //              showMessage({
    //             message: res?.data?.data?.message,
    //             severity: SEVERITY.SUCCESS,
    //           });
    //           mutate()
    //            mutatePopularJobList()

    //       },
    //       onError:(error)=>{

    //            showMessage({
    //             message:error?.response?.data?.message,
    //             severity: SEVERITY.ERROR,
    //           });
    //       }
    //             })
    //           }else{
    //           await saveUnSaveTrigger({
    //               id:jobData?.id,
    //               status:true
    //             },{
    //                onSuccess:(res)=>{
    //                 mutatePopularJobList()
    //                                      mutateInfinite && mutateInfinite()

    //              showMessage({
    //             message: res?.data?.data?.message,
    //             severity: SEVERITY.SUCCESS,
    //           });
    //           mutate()

    //       },
    //       onError:(error)=>{

    //            showMessage({
    //             message:error?.response?.data?.message,
    //             severity: SEVERITY.ERROR,
    //           });
    //       }
    //             })
    //           }

    //             }else{
    //               router.push(`/${currentLocale}/login`)

    //             }

    //            }}>
    //           <Image src="/images/bookmarkIcon.svg" alt="bookmark" width={20} height={20} />
    //           {t(jobData?.is_saved ?"saved_lbl" :"save_lbl") }
    //         </SecondaryButton>

    //         <PrimaryButton
    //         disabled={jobData?.is_applied}
    //           onClick={async() => {
    //             if(studentId){
    //                 await jobApplyTrigger({
    //       id:jobData?.id
    //     },{
    //       onSuccess:(res)=>{
    //         mutatePopularJobList()
    //              showMessage({
    //             message: res?.data?.data?.message,
    //             severity: SEVERITY.SUCCESS,
    //           });
    //           mutate()
    //                                mutateInfinite && mutateInfinite()

    //       },
    //       onError:(error)=>{

    //            showMessage({
    //             message:error?.response?.data?.message,
    //             severity: SEVERITY.ERROR,
    //           });
    //       }
    //     })

    //             }else{
    //               router.push(`/${currentLocale}/login`)

    //             }
    //            }}
    //           className={`text-sm font-semibold px-[14px] py-2 gap-2`}
    //         >
    //           <Image src="/images/briefcaseIcon.svg" alt="bookmark" width={20} height={20} />
    //         {t(jobData?.is_applied? "applied_job_lbl":"apply_job_lbl") }
    //         </PrimaryButton>
    //       </div>
    //     </div>
    // </Link>
  );
};

export default Card;
