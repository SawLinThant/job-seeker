'use client';
import Nav from '@/components/nav';
import Text from '@/components/ui/typo';
import Image from 'next/image';
import React, { useState } from 'react';
import OtpInput from './simple/otp/OtpInput';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
  useMutationForgotResendVerifyMail,
  useMutationSendVerifyMail,
} from '@/services/authService';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import { error } from 'console';
import LoadingDialog from '@/components/ui/dialog/LoadingDialog';
import { userCredentialAtom } from '@/components/atoms/atoms';
import { useAtom } from 'jotai';

const RegisterOtp: React.FC = () => {
  const [userCredential] = useAtom(userCredentialAtom);

  const { showMessage } = useSnackbar();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const [isError, setError] = React.useState<string>('');

  const serachpararms = useSearchParams();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));

  const [isSuccessVerify, setIsSuccessVerify] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const { trigger: forgotResendVerifyTrigger, isMutating } = useMutationForgotResendVerifyMail();
  const { trigger: registerResendVerifyTrigger, isMutating: isMutating2 } =
    useMutationSendVerifyMail();

  if (isError === 'success' && pathname === `/${currentLocale}/register/otp`) {
  } else if (isError === 'success' && pathname === `/${currentLocale}/forgot-pass/otp`) {
    router.push(`/${currentLocale}/forgot-pass/new-password`);
  } else {
  }

  const handeResend = async () => {
    try {
      if (pathname === `/${currentLocale}/register/otp` || pathname === `/register/otp`) {
        await registerResendVerifyTrigger(
          {
            email: userCredential?.email as string,
          },
          {
            onSuccess: (res) => {
              showMessage({
                message: res?.data?.data?.message,
                severity: SEVERITY.SUCCESS,
              });
              setOtp(new Array(6).fill(''));
            },
            onError: (error) => {
              showMessage({
                message: error.response.data.message,
                severity: SEVERITY.ERROR,
              });
            },
          }
        );
      } else if (
        pathname === `/${currentLocale}/forgot-pass/otp` ||
        pathname === `/forgot-pass/otp`
      ) {
        await forgotResendVerifyTrigger(
          {
            email: userCredential?.email as string,
          },
          {
            onSuccess: (res) => {
              showMessage({
                message: res?.data?.data?.message,
                severity: SEVERITY.SUCCESS,
              });
              setOtp(new Array(6).fill(''));
            },
            onError: (error) => {
              showMessage({
                message: error.response.data.message,
                severity: SEVERITY.ERROR,
              });
            },
          }
        );
      } else {
      }
    } catch (error) {
      console.log('error sending OTP', error);
    } finally {
    }
  };

  return (
    <div className="  bg-[#E0F2FE]  min-h-screen">
      <Nav />
      <div className="lg:bg-[#F0F9FF]  overflow-auto h-full pt-10 pb-10 md:pt-20 md:pb-20">
        <div className="flex flex-col justify-center  mx-auto bg-white rounded-lg lg:px-10  lg:shadow-sm w-[95%] md:w-[35%] pt-6 pb-10">
          <Image
            src={`/images/${isError === 'success' ? 'verify-otp.svg' : 'send_message.svg'}`}
            width={50}
            height={50}
            alt="/images/send_message"
            className="mx-auto"
          />

          <Text className="text-md font-semibold text-center mt-5">
            {isError === 'success' ? 'Verified!' : 'Enter the 6-digit Code'}
          </Text>
          <Text className="text-sm  text-center text-[#475467] font-[400] mt-4 mb-10">
            {isError === 'success'
              ? 'You have successfully verified the account.'
              : `We sent a verification link to ${serachpararms.get('email') || ''}`}
          </Text>

          <OtpInput otp={otp} setOtp={setOtp} isError={isError} />

          {/* <div className='mx-3 md:mx-0 md:px-2'>
           <PrimaryButton
            onClick={handleConfim}
            className={`bg-[#197CC0] text-white text-sm font-semibold px-4 py-3 justify-center w-full md:w-full mx-auto mt-5`}
          >
            Confirm
          </PrimaryButton>
         </div> */}

          {isError === 'success' ? null : (
            <>
              <Text className="text-[#475467] text-center mt-10 text-sm">
                Didn’t receive the email? &nbsp;
                <span className="text-primary cursor-pointer" onClick={handeResend}>
                  Click to resend
                </span>
              </Text>

              <div
                className="flex justify-center items-center gap-x-3 mt-5  cursor-pointer"
                onClick={() => {
                  router.push(`/${currentLocale}/login`);
                }}
              >
                <Image src="/icons/left-arrow.svg" alt="icons-left-arrow" width={16} height={16} />

                <Text className="text-[#475467] text-sm ">Back to Log in</Text>
              </div>
            </>
          )}
        </div>
      </div>

      <LoadingDialog isLoading={isMutating || isMutating2} />
    </div>
  );
};

export default RegisterOtp;
