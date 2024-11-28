import BackIcon from '@/components/icons/back'
import EyeOutline from '@/components/icons/eye-outline'
import JobIcon from '@/components/icons/job'
import LocationIcon from '@/components/icons/location'
import ManyUser from '@/components/icons/Manyuser'
import Saveicon from '@/components/icons/Saveicon'
import SecondLogo from '@/components/icons/second'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import SecondaryButton from '@/components/ui/button/SecondaryButton'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import useGetStudentId from '@/hooks/useGetStudentData'
import { useMutateJobApply, useMutateSavedUnSaveJob } from '@/services/jobService'
import { JobDetailTypeI } from '@/types/jobDetail'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

const JobType:React.FC<{props:JobDetailTypeI,mutate:any}> = ({props,mutate}) => {
      const { showMessage } = useSnackbar();
        const { studentId } = useGetStudentId();


  const router = useRouter();
  const handleBack = ()=> router.back();
   const { trigger: jobApplyTrigger, isMutating } = useMutateJobApply();
   const { trigger: saveUnSaveTrigger, isMutating: saveUnSaveIsMutating } =
    useMutateSavedUnSaveJob();
    const { t, i18n } = useTranslation();
  let currentLocale = i18n.language;
  return (
    <div>
      <div className="flex justify-between flex-wrap mt-5 mb-12">
            <button onClick={handleBack} className="flex items-center gap-2 font-semibold">
              <BackIcon /> Go back
            </button>
            <div className="flex justify-between flex-wrap gap-3">
              <SecondaryButton className="py-3 px-4 flex text-sm items-center gap-2"  onClick={async () => {
                  if (studentId) {
                    if (props?.data?.is_saved) {
                      await saveUnSaveTrigger(
                        {
                          id: props?.data?.id,
                          status: false,
                        },
                        {
                          onSuccess: (res) => {
                           
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
                    } else {
                      await saveUnSaveTrigger(
                        {
                          id: props?.data?.id,
                          status: true,
                        },
                        {
                          onSuccess: (res) => {
                            

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
                }}>
                <Saveicon />  {t(props?.data?.is_saved ? 'saved_lbl' : 'save_lbl')}
              </SecondaryButton>
              <PrimaryButton className="py-3 px-4 flex text-sm items-center gap-2" onClick={async()=>{

                if(studentId){
  await jobApplyTrigger(
                      {
                        id: props?.data?.id,
                      },
                      {
                        onSuccess: (res) => {
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
                }else{
                     router.push(`/${currentLocale}/login`);
                }
               
              }}>
                <JobIcon />  {t(props?.data?.is_applied ? 'applied_job_lbl' : 'apply_job_lbl')}
              </PrimaryButton>
            </div>
          </div>
          <div className="flex items-center flex-wrap mt-6 justify-between">
            <div className="flex items-center flex-wrap gap-2">

                {
                    props.data.companyLogo ?  <Image src={props.data.companyLogo || ""} alt={props.data.companyLogo || ""} width={50} height={50} className="rounded-full"/>: <SecondLogo />
                }

               
              
              <p className="font-semibold">{props.data.company}</p>
              <LocationIcon />
              <p className="text-primary">{`${props.data.location.country},${props.data.location.region},${props.data.location.township}`}</p>
            </div>
            <div className=" mt-5 md:mt-auto flex flex-wrap items-center gap-3 text-[#667085]">
              <EyeOutline />
              <p>{props.data.views}</p>
              <span className="w-[1px] h-[15px] bg-[#D0D5DD] inline-block" />
              <ManyUser />
              <span className="w-[1px] h-[15px] bg-[#D0D5DD] inline-block" />
              <p>{props.data.applicants} Applicants</p>
              <span className="w-[1px] h-[15px] bg-[#D0D5DD] inline-block" />
              <p>{props.data.date}</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-3xl font-semibold">{props.data.title}</p>
          </div>
          <div className="mt-8 flex items-end gap-2 flex-wrap text-primary">
            <p className="text-2xl font-semibold">¥ {`${(+props.data.salary.start)?.toLocaleString()}~${(+props.data.salary.end)?.toLocaleString()}`}</p>
            <p className="text-xl"> / mo</p>
          </div>
    </div>
  )
}

export default JobType
