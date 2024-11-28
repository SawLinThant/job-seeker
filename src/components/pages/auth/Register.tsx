'use client';
import React, { useTransition } from 'react';

import Link from '@mui/material/Link';

import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import RTextField from '@/components/ui/text-field/RTextField';
import { validateConfirmPassword, validateEmail, validatePassword } from '@/utils/validation-rule';
import RPasswordTextField from '@/components/ui/text-field/RPasswordTextField';
import { cn } from '@/utils/cn';
import { Button } from '@mui/material';
import Loading from '@/components/ui/loading/Loading';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/nav';
import { DevTool } from '@hookform/devtools';
import {
  useMutationCheckEmail,
  useMutationRegister,
  useMutationSendVerifyMail,
} from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import { useAtom } from 'jotai';
import { userCredentialAtom } from '@/components/atoms/atoms';

export default function Register() {
  const { showMessage } = useSnackbar();

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const { trigger: checkMailTrigger, isMutating: checkMailIsMutating } = useMutationCheckEmail();
  const { trigger: sendVerifyMailTrigger, isMutating } = useMutationSendVerifyMail();

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const methods = useForm();

  const [isPending] = useTransition();
  const [, setUserCredential] = useAtom(userCredentialAtom);

  const onSubmit = async (value: any) => {
    // console.log("values",value)
    setIsLoading(true);
    try {
      await checkMailTrigger(
        {
          // name: value.username,
          email: value.email,
          // password: value.password,
          // password_confirmation: value.confirm_password,
        },
        {
          onSuccess: async (res) => {
            await sendVerifyMailTrigger(
              {
                // name: value.username,
                email: value.email,
                // password: value.password,
                // password_confirmation: value.confirm_password,
              },
              {
                onSuccess: (res:any) => {
                  // ('res', res);

                  setIsLoading(false);

                  showMessage({
                    message: res?.data?.data?.message,
                    severity: SEVERITY.SUCCESS,
                  });

                  setUserCredential({
                    email: value?.email,
                    request_id: res?.data?.data?.request_id,
                    name: value?.username,
                    password: value?.confirm_password,
                  });

                  router.push(`/${currentLocale}/register/otp`);
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
          },
          onError: (error) => {
            setIsLoading(false);
            console.log( "error message",error.response.data.message)
            showMessage({
             // message: error.response.data.message,
              message: error.response.data.message === "Email is always exists" ? "Email already exist":error.response.data.message,
              severity: SEVERITY.ERROR,
            });
          },
        }
      );
    } catch (error) {
      console.log('error register', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="  bg-[#E0F2FE]  min-h-screen">
      <Nav />
      <div className="lg:bg-[#F0F9FF]  overflow-auto h-full pt-10 pb-10 md:pt-20 md:pb-20">
        {' '}
        <div className="flex flex-col justify-center  mx-auto bg-white rounded-lg py-6 md:py-0 lg:px-10 lg:py-10 lg:shadow-sm w-[95%] px-4 md:w-[35%]">
          <FormProvider {...methods}>
            {/* <DevTool control={methods.control} /> */}
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <Image src={'/logo.svg'} alt="" width={40} height={40} />
                </div>
                <h1 className="text-md lg:text-lg  font-normal leading-9 text-[#101828] py-5">
                  Create an account
                </h1>
              </div>
              <div className="flex flex-col py-2 gap-y-4">
                <RTextField
                  type="text"
                  label="User Name"
                  placeholder="Enter User Name"
                  name="username"
                  required="Username is required."
                />
                <RTextField
                  type="email"
                  label="Email"
                  placeholder="Enter  Your Email"
                  name="email"
                  required="Email is required."
                  validate={validateEmail}
                />

                <RPasswordTextField
                  label="Password"
                  placeholder="Enter password"
                  name="password"
                  required="Password is required."
                  validate={validatePassword}
                />
                <RPasswordTextField
                  label="Confirm Password"
                  placeholder="Enter Confirm Password"
                  name="confirm_password"
                  required="Password is required."
                  validate={validateConfirmPassword}
                />
              </div>
              <button
                type="submit"
                className={cn(
                  'flex justify-center w-full text-center bg-[#197CC0] rounded-lg mt-3 py-3 text-base font-semibold text-white',

                  (isLoading || isPending) && 'opacity-40 pointer-events-none'
                )}
              >
                {isLoading || isPending ? <Loading /> : 'Create account'}
              </button>
            </form>
          </FormProvider>

          <div className="pt-5 flex items-center text-sm font-medium text-[#475467] uppercase before:flex-[1_1_0%] before:border-t before:border-[#98A2B3] before:mr-2 after:flex-[1_1_0%] after:border-t after:border-[#98A2B3] after:ml-2 dark:text-[#475467] dark:before:border-[#98A2B3] dark:after:border-[#98A2B3]">
            Or
          </div>
          <div className="flex justify-center gap-10 mt-6">
            <Link href="/">
              <Image src={'/images/line.svg'} alt="" width={30} height={30} />
            </Link>
            <Link href="/">
              <Image src={'/images/google.svg'} alt="" width={30} height={30} />
            </Link>
            <Link href="/">
              <Image src={'/images/facebook.svg'} alt="" width={30} height={30} />
            </Link>
          </div>
          <div className="mt-5 text-center">
            <span className="font-normal text-[#475467] text-sm leading-5">
              {'Already have an account?'}
            </span>
            <Link
              href={`/${currentLocale}/login`}
              className="text-[#197CC0] px-1 font-semibold text-sm leading-5 no-underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
