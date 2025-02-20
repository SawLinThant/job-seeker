// import SwiperCarousel from './Swiper'

import { useTranslation } from 'react-i18next';
import Card from './Card';
import JapanOne from '@/components/icons/japone';
import JapTwo from '@/components/icons/JapTwo';
import JapThree from '@/components/icons/JapThree';

const WhyChooseUs = () => {

    const {t}=useTranslation()
  const Services = [
    {
      id: 1,
      title: 'Personalized Job Matches',
      subTitle: 'Easy & Free',
      content:
        'Find the perfect job with our AI-driven matching. We tailor opportunities to your skills, experience, and preferences.',
      img: '/images/whychooseus-image1.svg',
    },
    {
      id: 2,
      title: 'Comprehensive Resources',
      subTitle: 'Various & Plenty',

      content:
        'Boost your career with our resources, from resume tools to interview guides. We’re here to support you every step of the way.',
      img: '/images/whychooseus-image2.svg',
    },
    {
      id: 3,
      title: 'Trusted by Tops',
      subTitle: 'Seek your Dreams',

      content:
        'Join a community trusted by top companies. Our platform is a go-to for employers seeking talented candidates like you, making sure you’re seen by the best.',
      img: '/images/whychooseus-image3.svg',
    },
  ];
  return (
    <section id="Journey">
      <div className="pt-10 pb-10 mx-auto md:container max-md:px-6 lg:pt-20 md:my-12">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#197CC0] text-center md:mb-4">
         {t("why_choose_use_lbl")}
        </h1>
        <p className="text-sm md:text-lg lg:text-xl font-medium text-[#475467] text-center mb-10 lg:mb-16">
          {
            t("we_can_help_make_your_dreams_come_true_lbl")
          }
        </p>

        {/* <div className="md:hidden">
                    <SwiperCarousel Services={Services} />
                </div> */}

        {/* <div className="flex flex-col w-full gap-10 md:flex-row md:justify-between md:gap-6 lg:gap-8 lg:px-8">
          {Services.map((service, index) => (
            <Card key={index} service={service} />
          ))}
        </div> */}
      <div className='md:max-w-[1150px] flex flex-col gap-3 lg:container px-3 mx-auto'>
      <div className=''>
            <div className='flex gap-5 mb-10 flex-col md:flex-row'>
            <div className='h-[300px] w-[100%] md:w-[50%] rounded-md '>
                  <JapanOne />
                </div>
                 <div className='h-[300px] w-[100%] md:w-[50%] flex items-center border-r-2 border-primary'>
                       <div className='flex flex-col gap-4 px-3'>
                        <p className='text-sm text-primary'>{
                            t("easy_to_use_lbl")}</p>
                        <p className='text-lg font-semibold'>{t("free_job_search_lbl")}</p>
                        <p className='text-[#475467]'>{t("why_choose_us_two")}</p>
                       </div>
                 </div>
            </div>
             <div className='flex  flex-col-reverse md:flex-row gap-4 mb-10'>
             <div className='h-[300px] w-[100%] md:w-[50%]  flex items-center border-l-2 border-primary'>
                   <div className='flex flex-col gap-4 px-3'>
                    <p className='text-sm text-primary'>{t("variety_lbl")}</p>
                    <p className='text-lg font-semibold'>{t("perfection_of_jobs_lbl")}</p>
                    <p className='text-[#475467]'>{t("why_choose_us_one")}</p>
                   </div>
             </div>
             <div className='h-[300px] w-[100%] md:w-[50%] rounded-md '>
                      <JapTwo/>
                </div>
             </div>
             <div className='flex  flex-col md:flex-row gap-4 mb-10'>
             <div className='h-[300px] w-[100%] md:w-[50%] rounded-md '>
                      <JapThree/>
                </div>
                 <div className='h-[300px] w-[100%] md:w-[50%] flex items-center border-r-2 border-primary'>
                       <div className='flex flex-col gap-4 px-3'>
                        <p className='text-sm text-primary'>{t("achieving_your_dreams_lbl")}</p>
                        <p className='text-lg font-semibold'>{t("jplus_brings_your_future_dreams_to_life_lbl")}</p>
                        <p className='text-[#475467]'>{t("why_choose_us_three")}</p>
                       </div>
                 </div>
             </div>
       </div>
      </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
