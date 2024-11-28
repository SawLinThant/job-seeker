import { t } from 'i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const CTA = () => {
    const {t}=useTranslation()
  return (
    <section id="CTA" className="bg-[#197CC0] pt-6 md:pt-10 md:my-12 md:px-8 overflow-hidden">
      <div className="flex flex-col w-full gap-20 max-md:items-center md:container md:flex-row md:gap-8 lg:gap-0">
        <div className="md:pb-10 max-md:container max-md:mb-10">
          <h1 className="pb-2 text-2xl font-semibold text-white capitalize lg:text-4xl lg:pb-5 max-md:text-center">
            {
                t("job_search_simplified_and_results_expanded_lbl")
            }
          </h1>
          <p className="text-sm lg:text-xl font-medium text-[#FCFCFD] pb-8 lg:pb-12 max-md:text-center">
            {
                t("start_your_job_search_journey_today_for_free_lbl")
            }
          </p>
          <div className="flex gap-3 max-md:justify-center">
            <Link href="/">
              <img
                width={120}
                height={120}
                alt="appStore"
                src="/images/appstore-badge.png"
                className="max-lg:w-[120px] max-lg:h-10"
              />
            </Link>
            <Link href="/">
              <img
                width={120}
                height={120}
                alt="appStore"
                src="/images/googleplay-badge.png"
                className="max-lg:w-[135px] max-lg:h-10"
              />
            </Link>
          </div>
        </div>
        <div className="flex items-end justify-center  relative mx-auto max-w-[20%] lg:w-auto">
          <Image
            width={150}
            height={150}
            alt="appStore"
            src="/images/iPhone12ProMockup.png"
            className="z-30 -ml-8 max-md:min-w-[172px]"
          />
          <Image
            width={150}
            height={150}
            alt="appStore"
            src="/images/JobSeekerApp1.png"
            className="z-20 -ml-12 max-md:min-w-[170px]"
          />
          <div className="min-w-[350px] h-[350px] md:min-w-[200px] md:h-[200px] lg:min-w-[300px] lg:h-[300px] bg-white rounded-2xl rotate-45 absolute top-8 md:top-16 lg:top-8 z-10">
            {''}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
