'use client';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import SecondaryButton from '@/components/ui/button/SecondaryButton';
import Input from '@/components/ui/inputs/Input';
import Modal from '@/components/ui/modal';
import { t } from 'i18next';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const GetInTouch = () => {

    const {t}=useTranslation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timeout: any;

    if (isSubmitted) {
      timeout = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isSubmitted]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsModalOpen(false);
    setIsSubmitted(true);
  };

  return (
    <div className="container mx-auto flex flex-col items-center bg-[#FCFCFD] pt-10 pb-16 lg:pt-16 lg:pb-[88px]">
      <div className="flex items-end mb-2.5 md:mb-6">
        <Image
          src="/images/avatar1.png"
          alt="/images/avatar1.png"
          width={100}
          height={100}
          className="z-0 w-12 h-12 -mr-5"
        />
        <Image
          width={100}
          height={100}
          alt="/images/avatar2.png"
          src="/images/avatar2.png"
          className="z-10 w-14 h-14"
        />
        <Image
          width={100}
          height={100}
          alt="/images/avatar3.png"
          src="/images/avatar3.png"
          className="z-0 w-12 h-12 -ml-5"
        />
      </div>
      <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-[#1D2939] text-center mb-2">
       {t("still_have_question_lbl")}
      </h2>
      <p className="text-sm md:text-md lg:text-xl font-medium text-[#475467] text-center mb-5 md:mb-6">
                        {t("still_desc_lbl")}

      </p>
      <PrimaryButton
        onClick={() => setIsModalOpen(true)}
        className={`bg-[#197CC0] text-white text-sm font-semibold px-4 py-2 justify-center`}
      >
       {t("get_in_touch_lbl")}
      </PrimaryButton>

      {isModalOpen && (
        <div className="z-40 backdrop">
          <div className="modal z-50 max-w-[340px] md:max-w-[500px]">
            <div className="modal-content">
              <form className="flex flex-col px-6 pt-5" onSubmit={handleSubmit}>
                <div className="flex justify-end w-full">
                  <Image
                    width={20}
                    height={20}
                    src="/icons/close-icon.svg"
                    alt="/icons/close-icon.svg"
                    className="w-6 cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>

                <h1 className="text-lg text-[#101828] font-semibold text-start mb-3">
                  {t("get_in_touch_lbl")}
                </h1>
                <p className="text-sm text-[#475467] text-start mb-12">
                  {t("get_in_touch_modal_desc")}
                </p>

                <Input
                  placeholder={t('enter_your_name_lbl')}
                  className="w-full mb-5 border focus-visible:ring-0"
                  required
                />
                <Input
                  placeholder={t('enter_a_valid_email_address_lbl')}
                  className="w-full mb-5 border focus-visible:ring-0"
                  required
                />
                <textarea
                  placeholder={t('enter_your_message_lbl')}
                  className="rounded-md shadow-sm w-full h-[156px] border border-gray-300 focus:border-gray-500 focus:ring-4 focus:ring-gray-300 focus:outline-none px-3 py-2 md:px-4 md:py-3 text-base text-[#667085] resize-none focus-visible:ring-0"
                  required
                />

                <div className="flex gap-3 my-6">
                  <SecondaryButton
                    className={`text-base text-[#344054] font-semibold px-[18px] py-2.5 justify-center  w-full`}
                    onClick={() => setIsModalOpen(false)}
                  >
                    {t("cancel_lbl")}
                  </SecondaryButton>
                  <PrimaryButton
                    className={`bg-[#197CC0] text-white text-base font-semibold px-[18px] py-2.5 justify-center w-full`}
                  >
                    {t("save_lbl")}
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isSubmitted && (
        <Modal className="md:max-w-[340px]">
          <div className="p-6 md:p-10">
            <Image
              alt="/icons/check-icons.svg"
              src="/icons/check-icon.svg"
              width={50}
              height={50}
              className="my-8 mx-auto"
            />
            <h1 className="font-bold text-lg text-[#101828] mb-5">{t("success_lbl")}</h1>
            <p className="text-sm text-[#475467]">{t("your_submitting_was_received_lbl")}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GetInTouch;
