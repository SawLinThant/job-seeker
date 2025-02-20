'use client';
import { useState, useEffect } from 'react';
import Input from '@/components/ui/inputs/Input';
import SecondaryButton from '@/components/ui/button/SecondaryButton';
import Modal from '@/components/ui/modal';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { DialerSip } from '@mui/icons-material';
import DiamonLeft from '@/components/icons/DiamonLeft';
import DiamondRight from '@/components/icons/arrow-right';
import { useMutateSubscribe } from '@/services/subscribe';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import React from 'react';
import Loading from '@/components/ui/loading/Loading';

const NewsLetter = () => {
  const [email, setEmail] = useState<string>('');
  const {showMessage} = useSnackbar();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const {t}=useTranslation();
   const { trigger: subscribeTrigger, isMutating } = useMutateSubscribe();

   const handleSubmit = async (e: any) => {
    console.log("subscribe function called")
    //e.preventDefault();
    setIsLoading(true);
    
    try {
      await subscribeTrigger({ email });
      setIsSubmitted(true);
    } catch (error: any) {
      showMessage({
        message: error?.response?.data?.message || t("error_occurred"),
        severity: SEVERITY.ERROR,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let timeout: any;

    if (isSubmitted) {
      timeout = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }

    console.log(isLoading)

    return () => {
      clearTimeout(timeout);
    };
  }, [isSubmitted]);

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   setIsSubmitted(true);
  // };
  return (
    <section className="bg-[#197CC0] overflow-hidden relative md:my-12 py-10 max-md:px-8 max-md:pt-20 md:py-6 lg:py-16">
      <div className='absolute left-0 top-0'>
          <DiamonLeft/>
      </div>
      <div className='absolute right-0 top-0'>
         <DiamondRight/>
      </div>
      <div className="md:container">
        <div className="flex flex-col items-center gap-10 md:flex-row md:justify-center md:gap-28">
          <div className="w-[150px] h-[150px]  lg:w-[220px] lg:h-[220px] rounded-2xl rotate-45 flex overflow-hidden">
            <Image
              width={300}
              height={300}
              alt="new letter"
              src="/images/newsletter.svg"
              className="min-w-[220px] min-h-[220px] lg:min-w-[300px] lg:min-h-[300px] object-cover -rotate-45 -mt-10 -ml-10"
            />
          </div>

          <div className="flex flex-col justify-center md:py-6 lg:py-0">
            <h1 className="mb-2 text-2xl font-semibold text-white lg:text-4xl lg:mb-5">
             {t("subscribe_lbl_header")}
            </h1>
            <p className="text-sm md:text-md lg:text-xl font-medium text-[#FCFCFD] mb-8 lg:mb-12">
            {/* {t("subscribe_for_exclusive_career_insights_lbl")} */}
            {
                t("we_will_keep_you_update_lbl")
            }
            </p>

            <form
              className="flex flex-col w-full gap-4 md:flex-row md:gap-5"
              onSubmit={handleSubmit}
            >
              <Input
                placeholder={t("enter_your_email_lbl")}
                className="w-full  bg-[#4796CD] focus-visible:ring-0 placeholder:text-white"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                required
              />
              <SecondaryButton
                className={`text-sm font-semibold text-primary whitespace-nowrap px-10 py-2 md:px-4 md:py-2.5 justify-center w-fit`}
              >
              {isLoading ? <Loading /> : t("to_subscribe_lbl")}   
              </SecondaryButton>
            </form>
          </div>
        </div>

        {isSubmitted && (
          <Modal className="md:max-w-[340px]">
            <div className="p-6 md:p-10">
              <Image
                width={20}
                height={20}
                alt="icons-check-icon.svg"
                src="/icons/check-icon.svg"
                className="mx-auto my-8"
              />
              <h1 className="font-bold text-lg text-[#101828] mb-5">Thank you for subscribing!</h1>
              <p className="text-sm text-[#475467]">You have successfully subscribed to our list</p>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};

export default NewsLetter;
