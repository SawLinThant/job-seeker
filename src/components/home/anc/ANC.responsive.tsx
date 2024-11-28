'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
const AncResponsive = () => {
  const [isExpanded, setIsExpanded] = useState(1);

  const handleClick = (i: any) => {
    // Toggles the isExpanded state when the component is clicked
    setIsExpanded(i);
  };
  return (
    <>
      <main className="my-10 ">
        {/* 1st Div */}
        <div
          // onMouseEnter={handleLeave}
          onClick={() => handleClick(1)}
          className={`${
            isExpanded === 1 ? 'h-[29rem]' : 'h-[6rem]'
          }  bg-[#197CC0] flex flex-col py-2 gap-16 justify-center transition-height duration-700 ease-in-out overflow-hidden`}
        >
          <div className={`text-center`}>
            <h1 className={`text-white text-2xl leading-8 font-medium`}>About Us</h1>
            <h1 className={`text-white text-sm py-2 leading-5 font-medium`}>
              れをから作成といをから作成という作成という
            </h1>
          </div>

          <div
            className={`flex justify-center ${
              isExpanded === 1 ? ' visible' : ' hidden'
            }  transition-all duration-1000 ease-in-out overflow-hidden w-[180px] h-[180px] rotate-45 mx-auto rounded-lg`}
          >
            <Image
              width={200}
              height={200}
              src={'/images/Frame 1000004454 (1).png'}
              alt=""
              className="object-cover -mt-10 ml-2 -rotate-45 min-w-[300px] min-h-[320px]"
            />
          </div>
          <div
            className={`flex justify-center ${
              isExpanded === 1 ? ' visible ' : ' hidden'
            } transition-all duration-1000 ease-in-out`}
          >
            <Link href="/jobseeker/blogdetails/aboutus">
              <button className="flex items-center gap-3 px-5 py-2 text-[#344054] align-middle bg-white rounded-lg text-sm font-semibold">
                Details All
                <Image width={10} height={10} src="/images/Icon (7).png" alt="" />
              </button>
            </Link>
          </div>
        </div>
        {/* ##### */}

        {/* Second Div */}
        <div
          onClick={() => handleClick(2)}
          className={`${
            isExpanded === 2 ? 'h-[29rem]' : 'h-[6rem]'
          }  bg-[#344054]  flex flex-col justify-center py-2 gap-16 transition-height duration-700 ease-in-out overflow-hidden`}
        >
          <div className={`text-center `}>
            <h1 className={`text-white text-2xl leading-8 font-medium`}>News</h1>
            <h1 className={`text-white text-sm py-2 leading-5 font-medium`}>
              れをから作成といをから作成という作成という
            </h1>
          </div>
          <div
            className={`flex justify-center ${
              isExpanded === 2 ? ' visible' : ' hidden'
            } w-[180px] h-[180px] mx-auto rounded-lg  transition-opacity duration-1000 ease-in-out rotate-45 overflow-hidden`}
          >
            <Image
              width={200}
              height={200}
              src="/images/Frame 1000004454 (2).png"
              alt=""
              className="object-cover -mt-10 ml-2 -rotate-45 min-w-[300px] min-h-[320px]"
            />
          </div>
          <div
            className={`flex justify-center ${
              isExpanded === 2 ? ' visible' : ' hidden'
            } transition-opacity  ease-in-out delay-1000`}
          >
            <Link href="/jobseeker/blogdetails/aboutus">
              <button className="flex items-center gap-3 px-5 py-2 text-[#344054] align-middle bg-white rounded-lg text-sm font-semibold">
                Details All
                <Image width={10} height={10} src="/images/Icon (7).png" alt="" />
              </button>
            </Link>
          </div>
        </div>
        {/* ##### */}
        {/* 3rd Div */}
        <div
          onClick={() => handleClick(3)}
          className={`${
            isExpanded === 3 ? 'h-[29rem]' : 'h-[6rem]'
          } bg-[#A10D1B] flex flex-col justify-center py-2 gap-16 transition-height duration-700 ease-in-out overflow-hidden`}
        >
          <div className={`text-center`}>
            <h1 className={`text-white text-2xl leading-8 font-medium`}>Career Advice</h1>
            <h1 className={`text-white text-sm py-2 leading-5 font-medium`}>
              れをから作成といをから作成という作成という
            </h1>
          </div>

          <div
            className={`flex justify-center ${
              isExpanded === 3 ? 'visible' : 'hidden'
            } w-[180px] h-[180px] mx-auto rounded-lg  transition-opacity duration-1000 ease-in-out rotate-45 overflow-hidden`}
          >
            {' '}
            <Image
              width={200}
              height={200}
              src="/images/Frame 1000004454 (3).png"
              alt="/images/Frame 1000004454 (3).png"
              className="object-cover -mt-10 ml-2 -rotate-45 min-w-[300px] min-h-[320px]"
            />
          </div>
          <div
            className={`flex justify-center  ${
              isExpanded === 3 ? 'visible' : 'hidden'
            } transition-opacity ease-linear  duration-2000 delay-300`}
          >
            <Link href="#">
              <button className="flex items-center gap-3 px-5 py-2 text-[#344054] align-middle bg-white rounded-lg text-sm font-semibold">
                Details All
                <Image width={10} height={10} src="/images/Icon (7).png" alt="" />
              </button>
            </Link>
          </div>
        </div>
        {/* ##### */}
      </main>
    </>
  );
};

export default AncResponsive;
