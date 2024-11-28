'use client';
import Image from 'next/image';
import CircularMotion from './circularmotion';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import { FiSearch } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroResponsive: React.FC<any> = ({ expandedDiv, handleExpand, rotatation }) => {
  return (
    <>
      <div className="mt-20 ">
        <CircularMotion
          expandedDiv={expandedDiv}
          handleExpand={handleExpand}
          rotatation={rotatation}
        />
      </div>
     <SlideFadeComponent expandedDiv={handleExpand}/>
    </>
  );
};


const SlideFadeComponent = ({expandedDiv}:{expandedDiv:(id:number)=>void}) => {
  const [visibleItemIndex, setVisibleItemIndex] = useState(0);

  const items = [
    <SlideItem key={1} title="Label-1" description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを." />,
    <SlideItem key={2} title="Label-2" description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."/>,
    <SlideItem key={3} title="Label-3" description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."/>,
    <SlideItem key={4} title="Label-4" description="れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを."/>,
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
         expandedDiv(each + 1)
         return each
      }); // Cycle through items
      
    }, 4000); // Change item every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [items.length]);

  return (
    <div className=''>
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

const SlideItem = ({title,description}:{title:string,description:string}) => {
  


  return (
    <div className="py-6 text-center">
    <h1 className="text-[#197CC0] font-semibold text-2xl md:text-2xl lg:text-4xl leading-10">
      れをから作成とい
    </h1>
    <p className="text-[#197CC0] text-sm md:text-xl lg:text-xl font-medium leading-7  py-4 px-5">
      れをから作成というを独自場合れ物にならのを10物2文書が記事文ばい引用がさを.
    </p>
    <div className="relative flex items-center justify-center">
      <PrimaryButton
        className={`px-4 py-2 flex gap-2 rounded-lg transition-opacity duration-75 mt-5`}
      >
       <FiSearch />

        <p className={`transition-all duration-75 ease-linear text-white`}>れをから作成.</p>
      </PrimaryButton>
      <div className="absolute justify-end hidden lg:flex right-12 ">
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

export default HeroResponsive;
