'use client';
import Image from 'next/image';
import HeroResponsive from './Hero.responsive';
import CircularMotion from './circularmotion';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import HomeSectionDiamond from '@/components/icons/HomeSectionDiamond';
import DiamondOne from '@/components/icons/diamondOne';
import JobOwnerDia from '@/components/icons/JobOwnerDia';
import { Link } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const { t } = useTranslation();

  let initialText = {
    title: 'discover_your_future_lbl',
    desc: 'explore_exciting_opportunities_lbl',
  };

  const [expandedDiv, setExpandedDiv] = useState(1);
  const [selectedText, setSelectedText] = useState(initialText);
  const handleExpand = (id: number) => {
    setExpandedDiv(id);
  };

  const rotatation = () => {
    if (expandedDiv === 1) {
      return '-rotate-45';
    } else if (expandedDiv === 2) {
      return '-rotate-[135deg]';
    } else if (expandedDiv === 3) {
      return 'rotate-45';
    } else if (expandedDiv === 4) {
      return '-rotate-[223deg]';
    } else {
      return 'rotate-45';
    }
  };

  useEffect(() => {
    if (expandedDiv === 2) {
      setSelectedText({
        title: 'discover_your_future_lbl',
        desc: 'explore_exciting_opportunities_lbl',
      });
    } else if (expandedDiv === 3) {
      setSelectedText({
        title: 'discover_your_future_lbl',
        desc: 'explore_exciting_opportunities_lbl',
      });
    } else if (expandedDiv === 4) {
      setSelectedText({
        title: 'discover_your_future_lbl',
        desc: 'explore_exciting_opportunities_lbl',
      });
    } else {
      setSelectedText(initialText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandedDiv]);

  return (
    <>
      <section className="block lg:hidden">
        <HeroResponsive
          expandedDiv={expandedDiv}
          handleExpand={handleExpand}
          rotatation={rotatation}
        />
      </section>
      <section className="hidden h-screen md:hidden lg:flex">
        <main className="flex flex-col justify-between">
          <div className="hidden md:block lg:block">
            {/* <Image
              src="/images/background-vector.svg"
              alt="background-vector"
              width={150}
              height={150}
            /> */}
            <HomeSectionDiamond />
          </div>
          <div className="mt-[-55px] hidden md:block lg:block">
            <JobOwnerDia />
          </div>
        </main>
        <main className="container relative flex items-center justify-center gap-32 -ml-24">
          <div className="absolute -rotate-45 top-52 left-[580px] hidden md:block lg:block">
            <div className="absolute top-12">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.81813 0.00035945C11.9992 -0.0251761 15.2313 1.30986 16.9853 3.99691C18.604 6.47667 18.0509 9.71315 16.9593 12.4724C16.0767 14.7036 14.0271 16.0065 11.8529 16.9713C9.80584 17.8796 7.56271 18.44 5.50604 17.5544C3.33492 16.6195 1.93818 14.6147 1.15095 12.3629C0.198208 9.63765 -0.706645 6.57501 0.811763 4.12674C2.48722 1.42524 5.66755 0.0256499 8.81813 0.00035945Z"
                  fill="#197CC0"
                />
              </svg>
            </div>
            <div className="absolute -top-14">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.81813 0.00035945C11.9992 -0.0251761 15.2313 1.30986 16.9853 3.99691C18.604 6.47667 18.0509 9.71315 16.9593 12.4724C16.0767 14.7036 14.0271 16.0065 11.8529 16.9713C9.80584 17.8796 7.56271 18.44 5.50604 17.5544C3.33492 16.6195 1.93818 14.6147 1.15095 12.3629C0.198208 9.63765 -0.706645 6.57501 0.811763 4.12674C2.48722 1.42524 5.66755 0.0256499 8.81813 0.00035945Z"
                  fill="#197CC0"
                />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[-30px] right-[5px]">
            <DiamondOne />
          </div>
          <SlideFadeComponent expandedDiv={handleExpand} />
          <CircularMotion
            expandedDiv={expandedDiv}
            handleExpand={handleExpand}
            rotatation={rotatation}
          />
        </main>
      </section>
    </>
  );
};

const SlideFadeComponent = ({ expandedDiv }: { expandedDiv: (id: number) => void }) => {
  const [visibleItemIndex, setVisibleItemIndex] = useState(0);

  const items = [
    <SlideItem
      key={1}
      title="hero_lbl_one"
      description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."
    />,
    <SlideItem
      key={2}
      title="hero_lbl_two"
      description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."
    />,
    <SlideItem
      key={3}
      title="hero_lbl_three"
      description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."
    />,
    <SlideItem
      key={4}
      title="hero_lbl_four"
      description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."
    />,
  ];

  // Variants for the vertical slide and fade effect
  const variants = {
    hidden: { opacity: 0, y: 200 }, // Initial state: hidden (above and transparent)
    visible: { opacity: 1, y: 0 }, // Visible state: no vertical offset, fully opaque
    exit: { opacity: 0, y: -200 }, // Exit state: slides down and fades out
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleItemIndex((prevIndex) => {
        const each = (prevIndex + 1) % items.length;
        expandedDiv(each + 1);
        return each;
      }); // Cycle through items
    }, 4000); // Change item every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [items.length]);

  return (
    <div className="-ml-[200px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={visibleItemIndex} // Unique key to trigger re-mounting and animation
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          style={{
            width: '380px',
            height: '300px',
            margin: '20px auto',
            borderRadius: '5px',
          }}
        >
          {items[visibleItemIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SlideItem = ({ title, description }: { title: string; description: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="max-w-sm relative text-center lg:max-w-md">
      <h1 className="text-[#197CC0] font-semibold text-2xl md:text-2xl lg:text-3xl leading-10">
        {t(title)}
      </h1>
      <p className=" text-sm md:text-lg lg:text-lg font-medium leading-7  py-4">{description}</p>
      <div className="relative flex items-center justify-center mt-4">
        <PrimaryButton
        onClick={() => router.push("/#Job Lists")}
          className={`px-8 py-4 flex gap-2 rounded-lg transition-opacity duration-75 `}
        >
          <Image src="/images/Icon (5).png" alt="icon 5" width={20} height={20} />
          <p
           // href="/#Job Lists"
            className={`transition-all duration-75 ease-linear w-full text-white`}
          >
           {t('search_your_dream_job_lbl')} 
          </p>
        </PrimaryButton>
        <div className="absolute justify-end hidden lg:flex right-2 ">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.81813 0.00035945C11.9992 -0.0251761 15.2313 1.30986 16.9853 3.99691C18.604 6.47667 18.0509 9.71315 16.9593 12.4724C16.0767 14.7036 14.0271 16.0065 11.8529 16.9713C9.80584 17.8796 7.56271 18.44 5.50604 17.5544C3.33492 16.6195 1.93818 14.6147 1.15095 12.3629C0.198208 9.63765 -0.706645 6.57501 0.811763 4.12674C2.48722 1.42524 5.66755 0.0256499 8.81813 0.00035945Z"
              fill="#197CC0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
