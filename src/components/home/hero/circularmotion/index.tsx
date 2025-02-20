'use client';
import Image from 'next/image';
import { useState } from 'react';

const CircularMotion: React.FC<any> = ({ expandedDiv, handleExpand, rotatation }) => {
  return (
    <div className="flex justify-center items-center gap-5 mx-auto transition-all duration-400 h-[200px] -mt-10">
      <div
        className={`flex flex-col gap-2 ${rotatation()} transition-transform duration-700 ease-in-out`}
      >
        <div className={`flex gap-3 ${expandedDiv === 3 ? 'justify-end' : 'items-center'}`}>
          <div
            onClick={() => handleExpand(1)}
            className={`transition-transform  duration-700 ease-in-out ${
              expandedDiv === 1
                ? 'w-[170px] h-[170px] lg:w-[290px] lg:h-[290px]'
                : 'rotate-90 w-[90px] h-[90px] lg:w-[160px] lg:h-[160px]'
            } ${expandedDiv === 4 ? 'rotate-[180deg]' : ''} ${
              expandedDiv === 3 ? '-rotate-[90deg]' : ''
            }

                                 ease-in rounded-lg lg:rounded-xl overflow-hidden `}
          >
            <Image
              width={40}
              height={40}
              src="/images/hero-circle-1.svg"
              alt="frame"
              className={`object-contain lg:hidden md:hidden block rotate-45 ${
                expandedDiv === 1
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-14 lg:-ml-10 lg:-mt-20'
                  : 'min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10 lg:-mt-10 lg:-ml-10'
              }`}
            />
            <Image
              width={40}
              height={40}
              src="/images/hero-circle-1.svg"
              alt="hero"
              className={`object-contain hidden  md:block  lg:block rotate-45 ${
                expandedDiv === 1
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-14 lg:-ml-20 lg:-mt-'
                  : 'min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10 lg:-mt-10 lg:-ml-10'
              }`}
            />
          </div>
          <div
            onClick={() => handleExpand(2)}
            className={`transition-transform overflow-hidden duration-700 ease-in-out ${
              expandedDiv === 2
                ? ' rotate-90 w-[170px] h-[170px] lg:w-[290px] lg:h-[290px]'
                : 'w-[90px] h-[90px] lg:w-[160px] lg:h-[160px]'
            } ${expandedDiv === 4 ? 'rotate-180' : ''} ${
              expandedDiv === 3 ? '-rotate-90' : ''
            }  rounded-lg`}
          >
            <Image
              src="/images/hero-circle-2.svg"
              alt="frame 2"
              width={40}
              height={40}
              className={`object-contain lg:hidden md:hidden block rotate-45 ${
                expandedDiv === 2
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-28 lg:-ml-10 lg:-mt-20'
                  : 'min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10 lg:-mt-10 lg:-ml-10'
              }`}
            />
            <Image
              width={40}
              height={40}
              src="/images/hero-circle-2.svg"
              alt="hero 2"
              className={`object-contain lg:block md:block hidden rotate-45 ${
                expandedDiv === 2
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-28 lg:-ml-20 lg:-mt-10'
                  : 'min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10 lg:-mt-10 lg:-ml-14'
              }`}
            />
          </div>
        </div>
        <div className={`flex gap-3 ${expandedDiv === 1 ? 'justify-end' : ''}`}>
          <div
            onClick={() => handleExpand(3)}
            className={`${
              expandedDiv === 3
                ? '-rotate-90 w-[170px] h-[170px] lg:w-[290px] lg:h-[290px]'
                : 'w-[90px] h-[90px] lg:w-[160px] lg:h-[160px]'
            } ${expandedDiv === 2 ? 'rotate-90' : ''} ${
              expandedDiv === 4 ? 'rotate-180' : ''
            } transition-transform duration-700 ease-in-out rounded-lg overflow-hidden`}
          >
            <Image
              src="/images/hero-circle-3.svg"
              alt="ff55"
              width={40}
              height={40}
              className={`object-contain rotate-45 lg:hidden md:hidden block ${
                expandedDiv === 3
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-5 lg:-mt-10 '
                  : 'min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10 lg:-mt-10'
              }`}
            />
            <Image
              width={100}
              height={100}
              src="/images/hero-circle-3.svg"
              alt="frame 49"
              className={`object-contain rotate-45 lg:block md:block hidden ${
                expandedDiv === 3
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-5 lg:-mt-10 '
                  : 'min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10 lg:-mt-10'
              }`}
            />
          </div>
          <div
            onClick={() => handleExpand(4)}
            className={`${
              expandedDiv === 4
                ? 'rotate-180 w-[170px] h-[170px] lg:w-[290px] lg:h-[290px]'
                : 'w-[90px] h-[90px] lg:w-[160px] lg:h-[160px]'
            } ${expandedDiv === 3 ? '-rotate-90' : ''} ${
              expandedDiv === 2 ? 'rotate-90' : ''
            } transition-transform duration-700 ease-in-out  overflow-hidden rounded-lg`}
          >
            <Image
              width={40}
              height={40}
              src="/images/hero-circle-4.svg"
              alt="frame 49"
              className={`lg:hidden md:hidden block ${
                expandedDiv === 4
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-10 lg:-mt-10'
                  : ' min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-10'
              } object-contain rotate-45`}
            />
            <Image
              width={40}
              height={40}
              src="/images/hero-circle-4.svg"
              alt="hero5"
              className={`lg:block md:block hidden ${
                expandedDiv === 4
                  ? 'min-w-[290px] min-h-[290px] lg:min-w-[420px] lg:min-h-[420px] -ml-20 -mt-28 lg:-mt-28 '
                  : ' min-w-[160px] min-h-[160px] lg:min-w-[290px] lg:min-h-[290px] -ml-10 -mt-20'
              } object-contain rotate-45`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularMotion;
