import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

function AboutJplus() {
  const { t } = useTranslation();
  return (
    <div
      id="About Us"
      className="w-full  py-10 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: 'url("/images/webp/Abous JPlus Bg.webp")',
      }}
    >
      <p className="text-2xl text-white text-center">{t('about_jplus_lbl')}</p>
      <p className="text-md text-white text-center my-6">
        {t('about_jplus_position_and_future_plans_lbl')}
      </p>

      <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 mb-10">
        {[
          {
            icon: 'about_icon_1.webp',
            title: 'about_title_1_lbl',
            desc: 'about_desc_1_lbl',
          },
          {
            icon: 'about_icon_2.webp',
            title: 'about_title_2_lbl',
            desc: 'about_desc_2_lbl',
          },
          {
            icon: 'about_icon_3.webp',
            title: 'about_title_3_lbl',
            desc: 'about_desc_3_lbl',
          },
        ].map((_t) => (
          <div key={_t?.icon} className="bg-white p-5 rounded-lg">
            <Image
              src={`/images/webp/${_t?.icon}`}
              alt={_t?.icon}
              width={160}
              height={160}
              className="mx-auto"
            />
            <p className="text-center my-5 text-text-950">{t(_t?.title)}</p>
            <p className="text-center text-text-700">{t(_t?.desc)}</p>
          </div>
        ))}
      </div>

      {/* <div className="mt-10 mb-5 w-[300px] md:w-[400px] mx-auto h-[40px] bg-white text-primary flex justify-center items-center rounded-md gap-x-4">
        <p>{t('learn_more_about_us_lbl')}</p>

        <FaArrowRight className="text-primary text-md" />
      </div> */}
    </div>
  );
}

export default AboutJplus;
