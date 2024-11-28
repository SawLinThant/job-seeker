'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const JourneyResponsive = () => {
    const {t}=useTranslation()
   const Jlist = [
    {
      id: 1,
      num: '01',
      title: 'create_profile_lbl',
      title1: 'create_your_profile_lbl',
      part1:
        'step_title_one_lbl',
      part2:
        'step_title_two_lbl',
      part3:
        'step_title_three_lbl',
        img: '/images/jounery-img1.svg',
    },
    {
      id: 2,
      num: '02',
      title: 'explore_lbl',
      title1: 'explore_opportunities_lbl',
      part1:
        'step_two_title_one_lbl',
      part2:
        'step_two_title_two_lbl',
      part3:
        'step_two_title_three_lbl',
      img: '/images/jounery-img1.svg',
    },
    {
      id: 3,
      num: '03',
      title: 'apply_lbl',
      title1: 'apply_with_ease_lbl',
      part1:
        'step_three_title_one_lbl',
      part2:
        'step_three_title_two_lbl',
      part3:
        'step_three_title_three_lbl',
      img: '/images/jounery-img2.svg',
    },
    {
      id: 4,
      num: '04',
      title: 'interview_lbl',
      title1: 'ace_the_interview_lbl',
      part1:
        "step_four_title_one_lbl",
      part2:
        'step_four_title_two_lbl',
      part3:
        'step_four_title_three_lbl',
      img: '/images/jounery-img2.svg',
    },
  ];
  const [selectColor, setSelectColor] = useState(Jlist.length > 0 ? Jlist[0].id : null);
  const [selectedItem, setSelectedItem] = useState(Jlist.length > 0 ? Jlist[0].id : null);
  //Click function to set the color and update items
  const handleClick = (id: number) => {
    setSelectedItem(id);
    setSelectColor(id);
  };
  // ######
  return (
    <main className="flex flex-col justify-center max-w-sm py-6 mx-auto" id="Journey">
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-2xl font-semibold text-[#197CC0] leading-6">{t("four_simple_steps_lbl")}</h1>
        <p className="text-sm leading-5 text-[#475467] pt-2 font-normal">
         {t("your_job_search_journey_starts_now_lbl")}
        </p>
      </div>
      <div className="flex flex-col gap-5 px-5 mt-10">
        {Jlist.map((i) => (
          <div
            onClick={() => handleClick(i.id)}
            key={i.title}
            className={`container flex max-w-sm hover:text-[#197CC0] ${
              selectColor === i.id
                ? 'text-[#197CC0] font-bold'
                : ' text-[#98A2B3] font-medium text-base leading-8'
            }`}
          >
            <h1>{i.num}</h1>
            <p className="px-10">{t(i.title)}</p>
          </div>
        ))}
      </div>
      <div className="px-5 mx-auto mt-10">
        {selectedItem !== null && (
          <div
            className={`${
              selectedItem === 3 || selectedItem === 4
                ? ' bg-[#F7E6E9] text-black border-[2px] border-[#E02C3D]'
                : 'bg-[#E0F2FF] text-black border-[2px] border-[#197CC0]'
            } flex flex-col-reverse  items-center justify-center  rounded-[20px] px-10`}
          >
            <div className="flex w-full">
              <div className="text-[#1D2939] py-5 w-full">
                <h1 className="mb-5 text-base font-medium ">
                  {t(Jlist.find((item) => item.id === selectedItem)?.title1 as string)}
                </h1>
                <p className="text-sm">{t(Jlist.find((item) => item.id === selectedItem)?.part1 as string)}</p>
                <br className="text-sm" />
                <p>{t(Jlist.find((item) => item.id === selectedItem)?.part2 as string)}</p>
                <br />
                <p className="text-sm">{t(Jlist.find((item) => item.id === selectedItem)?.part3 as string)}</p>
              </div>
            </div>
            <div className="w-[150px] h-[150px] mb-10 rounded-2xl mt-16 flex justify-center overflow-hidden rotate-45">
              <Image
                width={200}
                height={200}
                src={Jlist.find((item) => item.id === selectedItem)?.img || ''}
                alt=""
                className="object-cover -mt-10 ml-5 -rotate-45 min-w-[300px] min-h-[320px]"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default JourneyResponsive;
