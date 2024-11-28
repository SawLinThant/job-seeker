import PrimaryButtonWhite from '@/components/ui/button/PrimaryButtonWhite';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const { t, i18n } = useTranslation();
  const currentPathname = usePathname();

  return (
    <section className="bg-[#0086C9] max-md:p-6">
      <div className="flex flex-col-reverse items-center gap-10 px-8 pt-5 md:flex-row md:justify-center md:gap-0 md:px-0 md:py-10 lg:py-16 md:container">
        <div className="text-center md:text-start md:mr-10 lg:pr-20">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold mb-2.5 md:mb-5">
            {/* {t('ready_to_recruit_lbl')}  */}
            {t('are_you_a_job_owner_lbl')}
          </h1>
          <p className="text-[#FCFCFD] text-sm md:text-base lg:text-xl font-medium mb-5 lg:pr-20">
            {/* {"Start posting your jobs and it's ideal for small teams and startups."} */}

            {/* {t("let_begin_your_hiring_journey_lbl")} */}
            {t("advertise_your_job_opportunites_in_fast_and_effective_ways_lbl")}
          </p>
          <Link href="/">
            <PrimaryButtonWhite className="px-[14px] py-2 lg:px-5 lg:py-3 gap-2">
             
              <p className="text-sm lg:text-base text-[#197CC0]">
                {/* {t("visit_the_owner_website_lbl")} */}
                {/* {"Get me to the Owner's website"} */}
               {t("get_me_to_owners_website_lbl")}
              </p>
               <Image
                width={15}
                height={15}
                src="/images/arrow-left-blue.svg"
                alt="left-arrow"
                className="rotate-180"
              />
            </PrimaryButtonWhite>
          </Link>
        </div>
        <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[220px] lg:h-[220px] rounded-2xl rotate-45 flex overflow-hidden">
          <Image
            width={250}
            height={250}
            alt="banner-img"
            src="/images/banner-hero.svg"
            className="max-md:hidden min-w-[250px] min-h-[250px] lg:min-w-[300px] lg:min-h-[300px] object-cover -rotate-45 -mt-10 -ml-10"
          />
          <Image
            width={250}
            height={250}
            alt="banner-img"
            src="/images/banner-hero.svg"
            className="md:hidden -rotate-45 min-w-[170px] min-h-[170px] -mt-6 -ml-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
