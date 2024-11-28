"use client"
import Nav from '@/components/nav'
import React, { useState } from 'react'
import SideBar from './sidebar/SideBar'
import Select from 'react-select'
import { useGetAccountSetUpProcess, useGetAccountSkillList, useGetSkillList, useMutateSkill } from '@/services/authService'
import { cn } from '@/utils/cn'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import Loading from '@/components/ui/loading/Loading'
import { FiEdit } from 'react-icons/fi'
import ErrorMessage from '@/components/ui/text-field/ErrorMessage'
import LoadingDialog from '@/components/ui/dialog/LoadingDialog'
import { Box } from '@mui/material'
import MobileBackHeader from './MobileBackHeader'

const Skills = () => {

    const {data:setUpProcessPercent,mutate:setUpProcessPercentMutate} =useGetAccountSetUpProcess()
        const { showMessage } = useSnackbar();

        const [error,setError]=useState<any | null>(null)

        const [editSkill,setEditSkill]=useState(false)

  const [isLoading, setIsLoading] = React.useState(false);

  const {trigger: skillTrigger,isMutating}=useMutateSkill()

    const {data:skillsAccount,mutate,isLoading:skillLoading}=useGetAccountSkillList()
    const {data:skills}=useGetSkillList()


    const [skill,setSkill]=useState<{
          label:string;
          value:string;
        }[]|null>(null);

          const skillOptions = skills?.data?.map((_: any) => ({
    label: _?.name,
    value: _?.id,
  }));

  return (
     <div>
                <Box className="hidden md:block">
                  <Nav/>
                </Box>
                <MobileBackHeader title="Skill"/>
                <div className="w-full flex items-start">
                            <SideBar />
                               <div className='w-[90%] md:w-[70%] mx-auto border shadow-md px-10 mt-5 py-10'>
{
  skillLoading?<LoadingDialog isLoading={skillLoading}/> :
                               <>
                               
                                {
                                    skillsAccount?.data?.length>0  && !editSkill?<div>

                                               <div className='w-full mb-5 flex justify-between items-start bg-white px-6 pb-5 pt-2 rounded-md  border-b'>
                                      <p className='text-md font-bold '>Your Skill Set</p>
                                      <div className='px-3 py-1 bg-primary text-white text-sm rounded-md' onClick={()=>{

setEditSkill(true)
                                      
                                      }}>Edit</div>
                                    </div>

                                    <div className='flex items-start justify-between px-6'>

                                        <div className='flex gap-x-2 flex-wrap'>
                                           {
                                           skillsAccount?.data?.map((_:any,i:number)=>(
                                                <p key={i} className='bg-[#E0F2FE] text-gray-700 text-xs px-4 py-2 rounded-xl mb-3'>
{_?.name}
                                                </p>
                                            ))
                                           }
                                        </div>
                                        {/* <FiEdit className='text-primary'/> */}
                                    </div>

                                    </div> :<>
                                    
                                                      <p className='text-md  text-center'>Nearly there! What work are you here to do?</p>
                                <p className='text-sm text-[#344054] text-center'>Include your skills in your job application to showcase your qualifications and suitability for the position.</p>


                                  <div className="w-full mt-6">
          <label className="block mb-1 text-sm text-gray-700">Your Skills <span className='text-red-500'>*</span></label>
          {skillOptions && (
            <Select
            isMulti
              options={skillOptions}
              placeholder={'Select  Your Skills'}
              onChange={(e: any) => {
                setSkill(e);
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  border: '1.5px solid #D0D5DD',
                  boxShadow: 'none !important',
                  '*': {
                    boxShadow: 'none !important',
                  },
                  '&:hover': {
                    border: '1.5px solid #D0D5DD !important',
                  },
                }),
              }}
            />
          )}

          {
            error && <ErrorMessage text={error} />
          }
        </div>
              <div className="flex gap-8 pt-8">
            <button
              type="button"
              className="border flex justify-center w-full shadow-sm border-[#EAECF0] p-[10px] rounded-lg text-[#344054] leading-6 font-semibold text-base"

              onClick={()=>{
                setSkill(null)
              }}
            >
              Cancel
            </button>

            <button
            disabled={(isMutating || isLoading)}
             onClick={async()=>{

                if(skill){
 await skillTrigger({
                    skills:skill?.map((_:any)=>_?.value)
                },{
                    onSuccess:(res)=>{
                          mutate()
                                    setUpProcessPercentMutate()

                                    setEditSkill(false)

           showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
          
              setIsLoading(false)
                    },
                           onError: (error) => {

          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
                })
                }else{
                    setError("Skill is required")
                }

               
             }}
              className={
                cn("bg-[#197CC0] flex justify-center w-full shadow-sm p-[10px] rounded-lg text-white leading-6 font-semibold text-base",


                  (isMutating || isLoading) && ("pointer-event-none opacity-50")
                )
              }
            >

              {
               ( isMutating || isLoading ) ?<Loading/> :"Save"
              }
            </button>
          </div>
                                    </>
                                }
                               </>
}

              

         

                                </div></div></div>
  )
}

export default Skills