'use client';
import React, { useContext, useEffect, useTransition } from 'react';

import Link from '@mui/material/Link';

import { FormProvider, useForm } from 'react-hook-form';
import Image from 'next/image';
import RTextField from '@/components/ui/text-field/RTextField';
import { validateEmail, validatePassword } from '@/utils/validation-rule';
import RPasswordTextField from '@/components/ui/text-field/RPasswordTextField';
import { cn } from '@/utils/cn';
import Loading from '@/components/ui/loading/Loading';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Nav from '@/components/nav';
import { useMutationLogin } from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';

import { saveToStorage } from '@/lib/localStoragelib';
import { AuthContext } from '@/context/authContext';
import { useSessionLogin } from '@/lib/session';
import { getStudentData, getToken } from '@/lib/getToken';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  const { showMessage } = useSnackbar();

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const { trigger: loginTrigger, isMutating } = useMutationLogin();

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const methods = useForm();

  const [isPending, startTransition] = useTransition();

  const { trigger: triggerSessionLogin } = useSessionLogin();

  const onSubmit = async (value: any) => {
    setIsLoading(true);

    await loginTrigger(
      {
        email: value.email,
        password: value.password,
      },
      {
        onSuccess: async (res) => {
          setIsLoading(false);

          const { data, status } = res.data;

          setAuthenticated(true);
          await triggerSessionLogin({ ...data, tokenExpired: 1 });

          router.push(`/${currentLocale}`);

          showMessage({
            message: res?.data?.data?.message,
            severity: SEVERITY.SUCCESS,
          });

          methods.reset();
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log('gagag', codeResponse),
  });

  return (
    <div className="  bg-[#E0F2FE]  min-h-screen">
      <Nav />
      <div className="lg:bg-[#F0F9FF]  overflow-auto h-full pt-10 pb-10 md:pt-20 md:pb-20">
        <div className="flex flex-col justify-center  mx-auto bg-white rounded-lg lg:px-10  lg:shadow-sm w-[95%] px-4 md:px-5 md:w-[35%] md:max-w-[350px] py-10">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <Image src={'/logo.svg'} alt="" width={40} height={40} />
                </div>
                <h1 className="text-lg lg:text-lg font-normal leading-9 text-[#101828] py-5">
                  Welcome Back!
                </h1>
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

                <RPasswordTextField
                  label="Password"
                  placeholder="Enter password"
                  name="password"
                  required="Password is required."
                  validate={validatePassword}
                />
                <Link
                  href={`/${currentLocale}/forgot-pass`}
                  className="text-right text-primary text-xs font-semibold -mt-2 mb-3 no-underline"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className={cn(
                  'flex justify-center w-full text-center bg-[#197CC0] rounded-lg mt-3 py-2 text-base font-semibold text-white',

                  (isLoading || isPending) && 'opacity-40 pointer-events-none'
                )}
              >
                {isLoading || isPending ? <Loading /> : 'Log In'}
              </button>
            </form>
          </FormProvider>

          <div className="pt-5 flex items-center text-sm font-medium text-[#475467] uppercase before:flex-[1_1_0%] before:border-t before:border-[#98A2B3] before:mr-2 after:flex-[1_1_0%] after:border-t after:border-[#98A2B3] after:ml-2 dark:text-[#475467] dark:before:border-[#98A2B3] dark:after:border-[#98A2B3]">
            Or
          </div>
          <div className="flex justify-center gap-10 mt-6">
            {/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
/> */}
            <Link href="/">
              <Image src={'/images/line.svg'} alt="" width={30} height={30} />
            </Link>

            <Image
              src={'/images/google.svg'}
              alt=""
              width={30}
              height={30}
              onClick={() => {
                login();
              }}
            />
            <Link href="/">
              <Image src={'/images/facebook.svg'} alt="" width={30} height={30} />
            </Link>
          </div>
          <div className="mt-5 text-center">
            <span className="font-normal text-[#475467] text-sm leading-5">
              {"Don't have an account ?"}
            </span>
            <Link
              href={`/${currentLocale}/register`}
              className="text-[#197CC0] px-1 font-semibold text-sm leading-5 no-underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
