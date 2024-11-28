'use client';
import React, { useTransition } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import { validateConfirmPassword,  validatePassword } from '@/utils/validation-rule';

import { cn } from '@/utils/cn';
import Loading from '@/components/ui/loading/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/nav';
import Text from '@/components/ui/typo';
import RPasswordTextField from '@/components/ui/text-field/RPasswordTextField';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import { useMutationForgotPasswordNewPassword } from '@/services/authService';
import { useAtom } from 'jotai';
import { userCredentialAtom } from '@/components/atoms/atoms';

export default function NewPassword() {
  const serachpararms = useSearchParams();
    const [userCredential,setUserCredential] =useAtom(userCredentialAtom)
  const { showMessage } = useSnackbar();

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const { trigger: forgotNewPasswordTrigger, isMutating } = useMutationForgotPasswordNewPassword();

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const methods = useForm();

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (value: any) => {

    setIsLoading(true);

    await forgotNewPasswordTrigger(
      {
        email:userCredential?.email as string,
        password: value.password,
        password_confirmation: value.confirm_new_password,
      },
      {
        onSuccess: (res) => {
          setIsLoading(false);

          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });

          router.push(`/${currentLocale}/login`);
                    methods.reset()
                    setUserCredential(null)

        },
        onError: (error) => {

          setIsLoading(false);

          showMessage({
            message: error.response.data.message,
            severity: SEVERITY.ERROR,
          });
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
                <h1 className="text-lg lg:text-lg font-normal leading-9 text-[#101828] py-3">
                  Set your new password
                </h1>
              </div>
              <div className="flex flex-col py-2 gap-y-4">
                <RPasswordTextField
                  label="New Password"
                  placeholder="Enter your new password"
                  name="password"
                  required="Password is required."
                  validate={validatePassword}
                />
                <RPasswordTextField
                  label="Confirm New Password"
                  placeholder="Retype your new password"
                  name="confirm_new_password"
                  required="Confirm new password is required."
                  validate={validateConfirmPassword}
                />
              </div>
              <button
                type="submit"
                className={cn(
                  'flex justify-center w-full text-center bg-[#197CC0] rounded-lg mt-3 py-2 text-base font-semibold text-white',

                  (isLoading || isPending) && 'opacity-40 pointer-events-none'
                )}
              >
                {isLoading || isPending ? <Loading /> : 'Confirm'}
              </button>
            </form>
          </FormProvider>
          <div className="flex justify-center items-center gap-x-3 mt-5 cursor-pointer " onClick={()=>{
                          router.push(`/${currentLocale}/login`)

            }}>
            <Image src="/icons/left-arrow.svg" alt="icons-left-arrow" width={16} height={16} />

            <Text
              className="text-[#475467] text-sm "
            
            >
              Back to Log in
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
