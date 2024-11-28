'use client'
import { userCredentialAtom } from '@/components/atoms/atoms'
import Nav from '@/components/nav'
import Loading from '@/components/ui/loading/Loading'
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext'
import RTextField from '@/components/ui/text-field/RTextField'
import Text from '@/components/ui/typo'
import { useMutationCheckPhone, useMutationCheckToVerifyEmail, useMutationSendVerifyEmail, useMutationSendVerifyPhone } from '@/services/authService'
import { cn } from '@/utils/cn'
import { validateEmail } from '@/utils/validation-rule'
import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const FillVerifyType = () => {
       const [,setUserCredential] =useAtom(userCredentialAtom)

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
    const pathname=usePathname()


  const isToVerifyFillPhone=pathname ===`/${currentLocale}/account-setup/to-verify/fill-phone` || pathname ===`/account-setup/to-verify/fill-phone`;
  const isToVerifyFillEmail=pathname ===`/${currentLocale}/account-setup/to-verify/fill-email` || pathname ===`/account-setup/to-verify/fill-email`;

   const { trigger: checkEmailTrigger, isMutating:checkEmailIsMutating } = useMutationCheckToVerifyEmail();
   const { trigger: checkPhoneTrigger, isMutating:checkPhoneIsMutating } = useMutationCheckPhone();
     const { trigger: sendVerifyPhoneTrigger, isMutating } = useMutationSendVerifyPhone();
     const { trigger: sendVerifyEmailTrigger, isMutating:isMutatingVerifyEmail } = useMutationSendVerifyEmail();
  const [isLoading, setIsLoading] = React.useState(false);

  const { showMessage } = useSnackbar();

    const router=useRouter()
      const methods = useForm();

       const onSubmit = async (value: any) => {
    setIsLoading(true);


    

   if(isToVerifyFillPhone){
      await checkPhoneTrigger(
      {
        // name: value.username,
        phone: value.phone,
        // password: value.password,
        // password_confirmation: value.confirm_password,
      },
      {
        onSuccess: async(res) => {

          // console.log("Res",res)

          setIsLoading(false)

        

             await sendVerifyPhoneTrigger(
      {
        // name: value.username,
        phone: value.phone,
        // password: value.password,
        // password_confirmation: value.confirm_password,
      },
      {
        onSuccess: (res) => {
          // ('res', res);

          setIsLoading(false);

          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });

          setUserCredential({
  phone:value?.phone,
  request_id:res?.data?.data?.request_id,

})
methods.reset()
          router.push(
            `/${currentLocale}/account-setup/to-verify/fill-phone/otp`
          );
        },
        onError: (error) => {

          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
      }
    );

      
        },
        onError: (error) => {

          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
      }
    );

   }else if(isToVerifyFillEmail){
    await checkEmailTrigger(
      {
        // name: value.username,
        email: value.email,
        // password: value.password,
        // password_confirmation: value.confirm_password,
      },
      {
        onSuccess: async(res) => {

          // console.log("Res",res)

          setIsLoading(false)

        

             await sendVerifyEmailTrigger(
      {
        // name: value.username,
        email: value.email,
        // password: value.password,
        // password_confirmation: value.confirm_password,
      },
      {
        onSuccess: (res) => {
          // ('res', res);

          setIsLoading(false);

          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });

          setUserCredential({
  email:value?.email,
  request_id:res?.data?.data?.request_id,

})
methods.reset()
          router.push(
            `/${currentLocale}/account-setup/to-verify/fill-email/otp`
          );
        },
        onError: (error) => {

          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
      }
    );

      
        },
        onError: (error) => {

          setIsLoading(false);

          showMessage({
            message:error.response.data.message,
            severity: SEVERITY.ERROR,
          });
        },
      }
    );
   }else{

   }

  
  };

  

  return (
    <Box>
              <Box className="hidden md:block">
                  <Nav/>
              </Box>

                  <div className="lg:bg-[#F0F9FF]  overflow-auto h-full pt-10 pb-10 md:pt-20 md:pb-20"> 
        <div className="flex flex-col justify-center  mx-auto bg-white rounded-lg lg:px-10  lg:shadow-sm w-[95%] px-5 md:px-0 md:w-[35%] py-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <Image src={'/logo.svg'} alt="" width={40} height={40} />
                </div>
                <h1 className="text-md lg:text-lg font-normal leading-9 text-[#101828] py-3">

                    {
                        isToVerifyFillEmail?"To Change?" : "To Verify?"
                    }
                
                </h1>

                {/* <Text className="text-sm  text-center text-[#475467] font-[400] mb-5 ">
                  {"No worries! Enter your email and we'll help you reset it."}
                </Text> */}
              </div>
              <div className="flex flex-col py-2 gap-y-4">
                <RTextField
                  type={isToVerifyFillPhone? "number":isToVerifyFillEmail?"email":"" }
                  label={isToVerifyFillPhone?"Phone" :isToVerifyFillEmail?"Email":""}
                  placeholder={`Enter your ${isToVerifyFillPhone?"phone":isToVerifyFillEmail?"email":""}`}
                  name={isToVerifyFillPhone? "phone":isToVerifyFillEmail?"email":""}
                  required={`${isToVerifyFillPhone?"Phone":isToVerifyFillEmail?"Email":""} is required.`}
                  validate={isToVerifyFillPhone? "":isToVerifyFillEmail?validateEmail:""}
                />
              </div>
              <button
                type="submit"
                className={cn(
                  'flex justify-center w-full text-center bg-[#197CC0] rounded-lg mt-3 py-2 text-base font-semibold text-white',

                  (isLoading ) && 'opacity-40 pointer-events-none'
                )}
              >
                {isLoading  ? <Loading /> : `${isToVerifyFillPhone?"Phone":isToVerifyFillEmail?"Email":""} me a verification code`}
              </button>
            </form>
          </FormProvider>
          <div className="flex justify-center items-center gap-x-3 mt-5 cursor-pointer" onClick={()=>{
              router.push(`/${currentLocale}/account-setup/personal-information`)
            }}>
            <Image src="/icons/left-arrow.svg" alt="icons-left-arrow" width={16} height={16} />

            <Text className="text-[#475467] text-sm " >Back</Text>
          </div>
        </div>
      </div>



              </Box>
  )
}

export default FillVerifyType