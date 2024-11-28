'use client';
import { t } from 'i18next';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Accordion: React.FC<any> = ({ FAQItems }) => {
  const [visibleContent, isVisibleContent] = useState([FAQItems[0].id]);

  const {t:translate}=useTranslation()

  const handleToggle = (itemId: any) => {
    isVisibleContent((prevVisible) => {
      if (prevVisible.includes(itemId)) {
        return prevVisible.filter((id) => id !== itemId);
      } else {
        return [itemId];
      }
    });
  };
  return (
    <div className='max-w-[900px] mx-auto'>
         <div className="flex  flex-col gap-2.5 lg:gap-8">
      {FAQItems.map((item: any, index: number) => (
        <div
          key={index}
          className={`${
            visibleContent.includes(item.id)
              ? 'bg-[#E0F2FE] px-7  py-8 lg:p-8'
              : 'md:border-t md:border-t-[#EAECF0] md:pt-4 m-5 '
          } rounded-2xl flex justify-between  `}
        >
          <div className="flex flex-col">
          
            <span className="text-[15px] flex gap-0 md:text-[15px] lg:text-[16px] font-medium text-start text-[#1D2939]">
              <span className='mr-3'> 0{index + 1}:{" "} </span> <span className=''>{translate(item.title)}</span>
              </span>
            <div
              className={`grid overflow-hidden transition-all duration-300 ease-in-out text-gray-700 text-base ${
                visibleContent.includes(item.id)
                  ? 'grid-rows-[1fr] opacity-100 mt-4'
                  : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div
                className="text-sm lg:text-base w-full  overflow-hidden ml-2 text-[#475467]"
                style={{ lineHeight: '1.2em' }}
              >
                <p className="text-[14px] pl-5 pr-8">{translate(item.description)}</p>
              </div>
            </div>
          </div>
          <button onClick={() => handleToggle(item.id)} className="">
              {visibleContent.includes(item.id) ? (
                <Image alt="main-blue" width={20} height={20} className='w-[20px] md:w-[25px] md:h-[55px]' src="/images/minus-blue.svg" />
              ) : (
                <Image alt="main-blue" width={20} height={20} className=' w-[20px] md:w-[25px] md:h-[25px]' src="/images/plus.svg" />
              )}
             
            </button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Accordion;
