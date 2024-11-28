'use client';

import { userCredentialAtom } from '@/components/atoms/atoms';
import LoadingDialog from '@/components/ui/dialog/LoadingDialog';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import {
  useGetPersonInformation,
  useMutationRegister,
  useMutationVerifyOtpForAccount,
  useMutationVerifyOtpForAccountEmail,
  useMutationVerifyOtpForForgotPassword,
} from '@/services/authService';
import { cn } from '@/utils/cn';
import { useAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

let currentOTPIndex: number = 0;
interface OTPFieldI {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  isError?: string;
}
const OtpInput: React.FC<OTPFieldI> = ({ otp, setOtp }) => {
  const [userCredential, setUserCredential] = useAtom(userCredentialAtom);

  const router = useRouter();

  const { showMessage } = useSnackbar();

  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const serachpararms = useSearchParams();
  const pathname = usePathname();
  const [isError, setError] = React.useState<string>('');

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const { data: personInformation, mutate } = useGetPersonInformation();

  const inputRef = useRef<HTMLInputElement>(null);
  const { trigger: verifyOtpForgotpassword, isMutating } = useMutationVerifyOtpForForgotPassword();
  const { trigger: toVerifyTrigger, isMutating: isMutating3 } = useMutationVerifyOtpForAccount();
  const { trigger: toVerifyEmailTrigger, isMutating: isMutating4 } =
    useMutationVerifyOtpForAccountEmail();
  const { trigger: registerTrigger, isMutating: isMutating2 } = useMutationRegister();
 
  const handleOnChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    newOTP[currentOTPIndex] = value.substring(value.length - 1);

    if (!value) setActiveOTPIndex(currentOTPIndex - 1);
    else setActiveOTPIndex(currentOTPIndex + 1);

    setOtp(newOTP);

    if (newOTP.map((x) => x?.toString()).join('')?.length === 6) {
      if (pathname === `/${currentLocale}/register/otp` || pathname === `/register/otp`) {
        await registerTrigger(
          {
            name: userCredential?.name as string,
            email: userCredential?.email as string,
            request_id: userCredential?.request_id?.toString() as string,
            password: userCredential?.password as string,
            password_confirmation: userCredential?.password as string,
            code: newOTP.map((x) => x?.toString()).join(''),
          },
          {
            onSuccess: (res) => {
              setError('success');

              showMessage({
                message: res?.data?.data?.message,
                severity: SEVERITY.SUCCESS,
              });
              setUserCredential(null);

              router.push(`/${currentLocale}/login`);
              setOtp(new Array(6).fill(''));
            },
            onError: (error) => {
              setError('error');
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
        await verifyOtpForgotpassword(
          {
            email: userCredential?.email as string,
            request_id: userCredential?.request_id?.toString() as string,

            code: newOTP.map((x) => x?.toString()).join(''),
          },
          {
            onSuccess: (res) => {
              setError('success');

              showMessage({
                message: res?.data?.data?.message,
                severity: SEVERITY.SUCCESS,
              });

              router.push(`/${currentLocale}/forgot-pass/new-password`);
              setOtp(new Array(6).fill(''));
            },
            onError: (error) => {
              setError('error');
              showMessage({
                message: error.response.data.message,
                severity: SEVERITY.ERROR,
              });
            },
          }
        );
      } else if (
        pathname === `/${currentLocale}/account-setup/to-verify/fill-phone/otp` ||
        pathname === `/account-setup/to-verify/fill-phone/otp`
      ) {
        await toVerifyTrigger(
          {
            _method: 'PUT',
            phone: userCredential?.phone as string,
            request_id: userCredential?.request_id?.toString() as string,

            code: newOTP.map((x) => x?.toString()).join(''),
          },
          {
            onSuccess: (res) => {
              setError('success');

              showMessage({
                message: res?.data?.data?.message,
                severity: SEVERITY.SUCCESS,
              });
              setUserCredential(null);

              router.push(`/${currentLocale}/account-setup/personal-information`);
              setOtp(new Array(6).fill(''));
              mutate();
            },
            onError: (error) => {
              setError('error');
              showMessage({
                message: error.response.data.message,
                severity: SEVERITY.ERROR,
              });
            },
          }
        );
      } else if (
        pathname === `/${currentLocale}/account-setup/to-verify/fill-email/otp` ||
        pathname === `/account-setup/to-verify/fill-email/otp`
      ) {
        await toVerifyEmailTrigger(
          {
            _method: 'PUT',
            email: userCredential?.email as string,
            request_id: userCredential?.request_id?.toString() as string,

            code: newOTP.map((x) => x?.toString()).join(''),
          },
          {
            onSuccess: (res) => {
              setError('success');

              showMessage({
                message: res?.data?.data?.message,
                severity: SEVERITY.SUCCESS,
              });
              setUserCredential(null);

              router.push(`/${currentLocale}/account-setup/personal-information`);
              setOtp(new Array(6).fill(''));
              mutate();
            },
            onError: (error) => {
              setError('error');
              showMessage({
                message: error.response.data.message,
                severity: SEVERITY.ERROR,
              });
            },
          }
        );
      } else {
      }
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    currentOTPIndex = index;
    if (e.key === 'Backspace') setActiveOTPIndex(currentOTPIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  return (
    <div className={'flex gap-x-2   relative mx-auto '}>
      {otp.map((_, index) => {
        return (
          <div key={index} className="flex items-center">
            {index === 3 && <div className="mx-5 text-[#EAECF0]">-</div>}
            <input
              ref={activeOTPIndex === index ? inputRef : null}
              type="number"
              className={cn(
                ' outline-none border-[1px] rounded-[8px] border-[#D0D5DD] w-[35px] h-[35px] md:w-[46px] md:h-[46px]    text-center  transition text-[26px] text-[#197CC0]',
                (activeOTPIndex === index || otp[index] !== '') &&
                  'text-[#197CC0] border border-[#197CC0]',
                isError === 'success' && 'text-[#12B76A] border border-[#12B76A]',
                isError === 'error' && 'text-error border border-error'
              )}
              onChange={handleOnChange}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
            />
          </div>
        );
      })}

      <LoadingDialog isLoading={isMutating || isMutating2 || isMutating3 || isMutating4} />
    </div>
  );
};

export default OtpInput;
