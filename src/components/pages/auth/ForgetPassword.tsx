'use client';
import React, { useTransition } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import RTextField from '@/components/ui/text-field/RTextField';
import { validateEmail } from '@/utils/validation-rule';

import { cn } from '@/utils/cn';
import { Button } from '@mui/material';
import Loading from '@/components/ui/loading/Loading';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/nav';
import Text from '@/components/ui/typo';
import { useMutationForgotPassword } from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import { useAtom } from 'jotai';
import { userCredentialAtom } from '@/components/atoms/atoms';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const { showMessage } = useSnackbar();
   const [,setUserCredential] =useAtom(userCredentialAtom)

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const { trigger: forgotPasswordTrigger, isMutating } = useMutationForgotPassword();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const methods = useForm();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (value: any) => {
    // setIsLoading(true);

    // startTransition(() => {
    //   setTimeout(() => {
    //     router.push(`/${currentLocale}/forgot-pass/otp`);
    //   }, 3000);
    // });
    setIsLoading(true);

    await forgotPasswordTrigger(
      {
        email: value.email,
      },
      {
        onSuccess: (res) => {
          setIsLoading(false);
                    toast.success(res?.data?.data?.message)


        //   showMessage({
        //     message: res?.data?.data?.message,
        //     severity: SEVERITY.SUCCESS,
        //   });

          router.push(
            `/${currentLocale}/forgot-pass/otp`
          );
           setUserCredential({
            email:value?.email,
            request_id:res?.data?.data?.request_id
          })
                    methods.reset()

        },
        onError: (error) => {

          setIsLoading(false);
          toast.error(error.response.data.message)

        //   showMessage({
        //     message:error.response.data.message,
        //     severity: SEVERITY.ERROR,
        //   });
        },
      }
    );
  };


  return (
  <div className="  bg-[#E0F2FE]  min-h-screen">
      <Nav />
      <div className="lg:bg-[#F0F9FF]  overflow-auto h-full pt-10 pb-10 md:pt-20 md:pb-20"> 
        <div className="flex flex-col justify-center  mx-auto bg-white rounded-lg lg:px-10  lg:shadow-sm w-[95%] px-5 md:px-0 md:w-[35%] py-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <Image src={'/logo.svg'} alt="" width={40} height={40} />
                </div>
                <h1 className="text-md lg:text-lg font-normal leading-9 text-[#101828] py-3">
                  Forgot your password?
                </h1>

                <Text className="text-sm  text-center text-[#475467] font-[400] mb-5 ">
                  {"No worries! Enter your email and we'll help you reset it."}
                </Text>
              </div>
              <div className="flex flex-col py-2 gap-y-4">
                <RTextField
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  name="email"
                  required="Email is required."
                  validate={validateEmail}
                />
              </div>
              <button
                type="submit"
                className={cn(
                  'flex justify-center w-full text-center bg-[#197CC0] rounded-lg mt-3 py-2 text-base font-semibold text-white',

                  (isLoading || isPending) && 'opacity-40 pointer-events-none'
                )}
              >
                {isLoading || isPending ? <Loading /> : 'Email me a verification code'}
              </button>
            </form>
          </FormProvider>
          <div className="flex justify-center items-center gap-x-3 mt-5 cursor-pointer" onClick={()=>{
              router.push(`/${currentLocale}/login`)
            }}>
            <Image src="/icons/left-arrow.svg" alt="icons-left-arrow" width={16} height={16} />

            <Text className="text-[#475467] text-sm " >Back to Log in</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
