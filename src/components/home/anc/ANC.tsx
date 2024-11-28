'use client';
import Link from 'next/link';
import { useState } from 'react';
import AncResponsive from './ANC.responsive';
import Image from 'next/image';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
const ANC = () => {

    const {t:translate}=useTranslation()
  //State for tracking the hover state of the divs
  const [hover, setHover] = useState<any>(null);
  // ###

  // Function to handle hover events
  const handleHover = (id: any) => {
    setHover(id);
  };
  //###

  // Function to determine the border radius based on the div's id
  const getBorderRadius = (id: number) => {
    // Map of id values to corresponding border radius values
    const borderRadiusMap: any = {
      // Top-left and bottom-left corners have a radius of 6px
      1: 'rounded-tl-[20px] rounded-bl-[20px]',
      // No border radius for the second div
      2: 'rounded-0',
      // Top-right and bottom-right corners have a radius of 6px
      3: 'rounded-tr-[20px] rounded-br-[20px]',
    };

    // Return the border radius value for the given id, or an empty string if not found
    return borderRadiusMap?.[id] || '';
  };

  // Function to determine the background color based on the div's id
  const bgColor = (id: any) => {
    if (id === 1) {
      return 'bg-[#197CC0]';
    } else if (id === 2) {
      return 'bg-[#344054]';
    } else if (id === 3) {
      return 'bg-[#A10D1B]';
    }
  };

  //###

  //Function to adjust the background color when hovering over the div

  const adjustColor = (id: number) => {
    if (id === 1) {
      return 'hover:bg-white shadow-md border';
    } else if (id === 2) {
      return 'hover:bg-white shadow-md border';
    } else if (id === 3) {
      return 'hover:bg-white shadow-md border';
    }
  };
  // ###

  //  Function to calculate the width based on the hover state
  const calculateWidth = (id: any) => {
    if (id === hover) {
      // Expanded width when the div is being hovered
      return ' w-[966.4px]';
    } else if (hover !== null) {
      // Reduced width for non-hovered divs when any div is being hovered
      return 'w-[156.8px]';
    }
    // Default width when no div is being hovered
    return 'w-[426px]';
  };

  // ###
  const sliderItem = [
    {
      id: 1,
      title: 'about_us_lbl',
      description: 'empownering_your_carer_jonery_lbl',
      image: '/images/Frame 1000004454 (1).png',
    },
    {
      id: 2,
      title: 'news_lbl',
      description: 'stay_updated_with_the_latest_news_lbl',
      image: '/images/Frame 1000004454 (2).png',
    },
    {
      id: 3,
      title: 'career_advice_lbl',
      description: 'guiding_your_path_to_success_lbl',
      image: '/images/Frame 1000004454 (3).png',
    },
  ];
  const itemCard = [
    {
      id: 1,
      cardTitle: '日本と本文とおり者',
      cardImg: '/images/unsplash_376KN_ISplE (1).png',
      cardDescription:
        ' 著作-考え方にさで引用そのままクリエイティブ・コモンズ・ライセンス技術補足いいウィキペディア前記なさ19回避が日本GFDL た性れを編集、の機。 ',
      button: '/images/arrow-circle-right (1).png',
    },
    {
      id: 2,
      cardTitle: '日本と本文とおり者',
      cardImg: '/images/unsplash_376KN_ISplE (2).png',
      cardDescription:
        ' 著作-考え方にさで引用そのままクリエイティブ・コモンズ・ライセンス技術補足いいウィキペディア前記なさ19回避が日本GFDL た性れを編集、の機。 ',
      button: '/images/arrow-circle-right (1).png',
    },
    {
      id: 3,
      cardTitle: '日本と本文とおり者',
      cardImg: '/images/unsplash_n95VMLxqM2I.png',
      cardDescription:
        ' 著作-考え方にさで引用そのままクリエイティブ・コモンズ・ライセンス技術補足いいウィキペディア前記なさ19回避が日本GFDL た性れを編集、の機。 ',
      button: '/images/arrow-circle-right (1).png',
    },
    {
      id: 4,
      cardTitle: '日本と本文とおり者',
      cardImg: '/images/unsplash_376KN_ISplE.png',
      cardDescription:
        ' 著作-考え方にさで引用そのままクリエイティブ・コモンズ・ライセンス技術補足いいウィキペディア前記なさ19回避が日本GFDL た性れを編集、の機。 ',
      button: '/images/arrow-circle-right (1).png',
    },
  ];
  return (
    <>
      <div id="About Us" className="block my-20 md:block xl:hidden lg:block">
        <AncResponsive />
      </div>

      <main id="About Us" className="hidden my-20 md:hidden xl:block lg:hidden">
        {/* Render a section for desktop view */}
        <div className="justify-center hidden my-24 lg:flex">
          <div className="container flex justify-center mx-auto overflow-hidden ">
            {sliderItem.map(
              (i, index) =>
                i.id !== 4 && (
                  <div key={index}>
                    {/* Single card with dynamic styling based on state and properties */}
                    <div
                      onMouseEnter={() => handleHover(i.id)}
                      onMouseLeave={() => handleHover(null)}
                      className={`${calculateWidth(i.id)} ${bgColor(i.id)} ${
                        hover === i.id ? adjustColor(i.id) : ''
                      } ${getBorderRadius(
                        i.id
                      )} flex-col justify-item-center w-[full] h-[750px] transition-width ease-linear duration-150`}
                    >
                      {/* Hidden content revealed on hover */}
                      <div
                        className={`${
                          hover === i.id ? 'visible' : 'hidden'
                        } items-center py-8 flex justify-center overflow-hidden`}
                      >
                        <div className="flex-col w-[780px] h-[750px] items-center justify-items-center">
                          <div className="pb-10 px-14">
                            <div>
                              {/* Dynamic text color based on the card's id */}
                              <h1
                                className={`${
                                  i.id === 1
                                    ? 'text-[#197CC0]'
                                    : i.id === 2
                                      ? 'text-[#344054]'
                                      : 'text-[#A10D1B]'
                                } text-4xl font-semibold`}
                              >
                                {translate(i.title)}
                              </h1>
                            </div>
                            <div>
                              <p
                                className={`${
                                  i.id === 1
                                    ? 'text-[#197CC0]'
                                    : i.id === 2
                                      ? 'text-[#344054]'
                                      : 'text-[#A10D1B]'
                                } py-4 text-h3 leading-2`}
                              >
                                {translate(i.description)}
                              </p>
                            </div>
                          </div>
                          <div
                            key={i.id}
                            className="grid grid-cols-2 gap-5 px-10 pb-10 justify-items-center"
                          >
                            {/* Dynamic background color and card items based on the card's id */}
                            {itemCard.map((item) => (
                              <div
                                key={item.id}
                                className={`w-[320px] h-[257px] flex justify-between ${
                                  i.id === 1
                                    ? 'bg-[#197CC0]'
                                    : i.id === 2
                                      ? 'bg-[#344054]'
                                      : 'bg-[#A10D1B]'
                                } rounded-lg`}
                              >
                                <div className="flex items-center justify-center pl-5 text-center">
                                  <div className="flex">
                                    <p className={`w-6 text-sm leading-5 text-white`}>
                                      {item.cardTitle.split('').map((char, index) => (
                                        <span key={index}>{char} </span>
                                      ))}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex flex-col self-start ">
                                  <div>
                                    {' '}
                                    <Image
                                      alt={item.cardImg}
                                      src={item.cardImg}
                                      width={200}
                                      height={200}
                                      className="w-[256px] "
                                    />
                                  </div>
                                  <div className=" w-[249px] py-5 ">
                                    <p className="text-xs text-white ">{item.cardDescription}</p>
                                    <div className="flex justify-end ">
                                      <Link href={'/jobseeker/blogdetails'}>
                                        <Image
                                          alt={item.button}
                                          src={item.button}
                                          width={300}
                                          height={300}
                                          className=" w-7 h-7"
                                        />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Hidden content for rotated text */}
                      <div
                        className={`relative top-[480px] ${
                          calculateWidth(i.id) === 'w-[156.8px]' ? 'visible' : 'hidden'
                        } `}
                      >
                        {/* Rotated text content revealed on hover */}
                        <div
                          className={`-rotate-90 text-center flex-col transition-all ease-linear duration-1000`}
                        >
                          <div className={`w-96`}>
                            <h1 className="text-white font-ComfortaaSemiBold text-h3">{translate(i.title)}</h1>
                          </div>
                          <div className={` w-96`}>
                            <p className="text-white font-ComfortaaMedium">{translate(i.description)}</p>
                          </div>
                        </div>
                      </div>
                      {/* Visible content for non-hovered state */}
                      <div
                        className={`flex-col justify-items-center pt-44 ${
                          calculateWidth(i.id) === ' w-[966.4px]' ||
                          calculateWidth(i.id) === 'w-[156.8px]'
                            ? 'hidden'
                            : 'visible'
                        }  `}
                      >
                        <div className={`text-center flex-col pt-10`}>
                          <div>
                            <h1 className="text-3xl font-semibold text-white">{translate(i.title)}</h1>
                          </div>
                          <div className="pt-4">
                            <p className="text-base font-medium leading-6 text-white">
                              {translate(i.description)}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-center mt-5">
                          <div
                            className={`${
                              hover == i.id ? 'hidden' : 'visible'
                            } w-[200px] h-[200px] transition-all ease-out duration-700 delay-150 mt-10 overflow-hidden rotate-45 rounded-2xl`}
                          >
                            <Image
                              alt={i.image}
                              src={i.image}
                              width={300}
                              height={300}
                              className="object-cover -mt-10 -ml-10 -rotate-45 min-w-[300px] min-h-[320px] "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ANC;
