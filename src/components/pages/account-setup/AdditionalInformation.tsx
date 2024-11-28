"use client"
import Nav from '@/components/nav'
import React from 'react'
import SideBar from './sidebar/SideBar'
import { FormProvider, useForm } from 'react-hook-form'
import RTextField from '@/components/ui/text-field/RTextField'
import { useGetAccountSetUpProcess, useGetJapanRegion, useGetPersonalAdditional, useGetVisaType, useMutateAdditional } from '@/services/authService'
import RSelect from '@/components/ui/text-field/RSelect'
import Loading from '@/components/ui/loading/Loading'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import { cn } from '@/utils/cn'
import { IoLocationOutline } from "react-icons/io5";
import { CiPassport1 } from 'react-icons/ci'
import { FiEdit } from 'react-icons/fi'
import LoadingDialog from '@/components/ui/dialog/LoadingDialog'
import { Box } from '@mui/material'
import MobileBackHeader from './MobileBackHeader'


const AdditionalInformation = () => {

    const {data:setUpProcessPercent,mutate:setUpProcessPercentMutate} =useGetAccountSetUpProcess()
    const {data:personalAdditional,mutate,isLoading:getPersonalisLoading}=useGetPersonalAdditional()

      const methods = useForm<any>();
    const { showMessage } = useSnackbar();

    const {trigger:additionalTrigger,isMutating}=useMutateAdditional()


      const {data:japanRegion}=useGetJapanRegion()
      const {data:visaType}=useGetVisaType()
  const [isLoading, setIsLoading] = React.useState(false);

          const optionJapanRegionA = japanRegion?.data?.map((_: any) => ({
    label: _?.name_en,
    value: _?.id,
  }));
          const optionVisaTypeA = visaType?.data?.map((_: any) => ({
    label: _?.name,
    value: _?.id,
  }));

    const onSubmit = async (data:any) => {
    setIsLoading(true)
    await additionalTrigger({
   expected_salary_start:data?.ems_from_salary,
expected_salary_end:data?.ems_to_salary,
preferred_location_one_id:data?.pre_location,
preferred_location_two_id:data?.pre_second_location,
visa_type_id:data?.visa_type,
    },{
      onSuccess:(res)=>{
        mutate()
        methods.reset()
           showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });
              setIsLoading(false)
              setUpProcessPercentMutate()

      },
       onError: (error) => {

          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
    })
    // await personalInformation({
    //   name: data.username,
    //   email: data.email,
    //   phone: data.phone,
    //   gender: data.gender,
    //   birth_date: data.birthdate,
    //   address: data.address,
    //   country: data.country,
    // });
  };

  return (
    <div>
              <Box className="hidden md:block">
                  <Nav/>
              </Box>
              <MobileBackHeader title="Additional Info"/>
                <div className="w-full flex items-start">
                            <SideBar />
                               <div className='w-[90%] md:w-[70%] mx-auto border shadow-md px-10 mt-5 py-10'>


                         {
                         getPersonalisLoading ? <LoadingDialog isLoading={getPersonalisLoading}/>: <>       {


personalAdditional?.data?.visa_type?<div>

<div className='px-2'>

    <p className='pb-4 mb-4  border-b border-[#D0D5DD]'>Additional Information</p>

    <div className='flex items-start justify-between'>

        <div>

            <p className='text-primary text-md mb-4'>{`${personalAdditional?.data?.expected_salary_start} ~ ${personalAdditional?.data?.expected_salary_end} Yen/m`}</p>
            <div className='flex gap-x-2 items-center mb-2'> <IoLocationOutline  className='text-primary'/>
 <p className='text-sm text-[#344054]'>{personalAdditional?.data?.preferred_location_one},{personalAdditional?.data?.preferred_location_two}</p></div>
            <div className='flex gap-x-2 items-center'><CiPassport1 className='text-primary' />
 <p className='text-sm text-[#344054]'>{personalAdditional?.data?.visa_type}</p></div>
        </div>
                                              <FiEdit className='text-primary cursor-pointer'/>

    </div>

</div>

</div> :  <>
                                <p className='text-center font-bold mb-10'>Additional Information</p>


 <FormProvider {...methods}>

        <form           onSubmit={methods.handleSubmit(onSubmit)}
>
   <div className='grid grid-cols-2 gap-x-4'>
   <RTextField
                      type="text"
                      label="Expected Monthly Salary"
                      placeholder="Enter salary"
                      name="ems_from_salary"
                      required="Expected Monthly Salary is required."
                      isStar
                      rightIcon
                    />
   <RTextField
                      type="text"
                      label="&nbsp;"
                      placeholder="Enter salary"
                      name="ems_to_salary"
                      required="Expected Monthly Salary is required."
                      rightIcon
                    />

                                </div>

                                       <div className="pt-8">
                {optionJapanRegionA && (
                    <RSelect
                    isStar
                      name="pre_location"
                      label={'Preferred Location'}
                      placeholder="Anywhere in Japan"
                      array={optionJapanRegionA}
                      selectedText="Select Preferred Location"
                      required="Preferred Location is required."
                    />
                  )}
                  </div>
                                       <div className="pt-8">
                {optionJapanRegionA && (
                    <RSelect
                    isStar
                      name="pre_second_location"
                      label={'Second Preferred Location'}
                      placeholder="Anywhere in Japan"
                      array={optionJapanRegionA}
                      selectedText="Select Second Preferred Location"
                      required="Second Preferred Location is required."
                    />
                  )}
                  </div>
                                       <div className="pt-8">
                {optionVisaTypeA && (
                    <RSelect
                    isStar
                      name="visa_type"
                      label={'Seeking Visa Type'}
                      placeholder="Anywhere in Japan"
                      array={optionVisaTypeA}
                      selectedText="Select Seeking Visa Type"
                      required="Seeking Visa Type required."
                    />
                  )}
                  </div>

                   <div className="flex gap-8 pt-8">
            <button
              type="button"
              className="border flex justify-center w-full shadow-sm border-[#EAECF0] p-[10px] rounded-lg text-[#344054] leading-6 font-semibold text-base"

              onClick={()=>{
                methods.reset()
              }}
            >
              Cancel
            </button>

            <button
            disabled={(isMutating || isLoading)}
              type="submit"
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

                                <div>

                                </div>

        </form>

        </FormProvider>
                            
                            </>
                                }
</>
                         }
                          
                             



                               </div>
                               </div>
    </div>
  )
}

export default AdditionalInformation