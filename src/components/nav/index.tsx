'use client';

// import { AuthProvider } from '../auth/login/AuthProvider'
// import NavBar from './NavBar'

import React, { useEffect, useState, useRef, useContext, startTransition } from 'react';
import Link from 'next/link';
import ApplicationLogo from '../icons/ApplicationLogo';
import { Icons } from '../icons';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Text from '../ui/typo';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../../i18nConfig';
import { AuthContext } from '@/context/authContext';
import { removeStorage } from '@/lib/localStoragelib';
import { FlashOnOutlined } from '@mui/icons-material';
import { FiLogOut, FiMoreVertical, FiSettings, FiUser, FiX } from 'react-icons/fi';
import { TbBriefcase2 } from 'react-icons/tb';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import useGetStudentId from '@/hooks/useGetStudentData';
import { useSessionLogout } from '@/lib/session';
import { useAtom } from 'jotai';
import { showSidebarAtom } from '../atoms/atoms';
import { Box } from '@mui/material';
import BlurDialog from '../ui/dialog/BlurDialog';
import { MdOutlineSettings } from 'react-icons/md';
import { cn } from '@/lib/utils';
import NotificationsBlurModal from './notifications/NotificationsBlurModal';

// import ApplicationLogo from "@/components/ApplicationLogo";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/contexts/AuthProvider";
// import { Icons } from "@/components/Icons";

const navLink = [
  {
    id: 1,
    link: 'home_lbl',
    href: '/',
  },
  {
    id: 2,
    link: 'job_lists_lbl',
    href: 'Job Lists',
  },
  {
    id: 3,
    link: 'journey_lbl',
    href: 'Journey',
  },
  {
    id: 4,
    link: 'blogs_lbl',
    href: 'Blogs',
  },
  {
    id: 5,
    link: 'about_us_lbl',
    href: 'About Us',
  },
  {
    id: 6,
    link: 'faq_lbl',
    href: 'FAQ',
  },
];
const Nav = () => {
  const [notiType, setNotiType] = useState('All');

  const [openNotification, setOpenNotification] = useState(false);
  const { studentId } = useGetStudentId();

  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [showSideBar, setShowSideBar] = useAtom(showSidebarAtom);

  const { trigger: logoutTrigger } = useSessionLogout();

  const { i18n, t } = useTranslation();
  const currentPathname = usePathname();

  const currentLocale = i18n.language;
  const router = useRouter();
  const [Language, setLanguage] = useState('English');
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [blog, setBlog] = useState(false);
  const [profile, setProfile] = useState(false);

  const [closeBtn, setCloseBtn] = useState(false);
  // const pathName = usePathname()
  const dropdownRef = useRef<any>(null);
  // const { authenticated, logout } = useAuth();

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setIsOpen(false);

    const newLocale = language === 'English' ? 'en' : language === 'မြန်မာ' ? 'my' : '';
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    // router.refresh();
  };

  const handleClick = (link: string) => {
    setActiveLink(link);
    router.replace(link);
  };
  const accountSetUp = () => {
    setShowSideBar(true);

    router.push(`/${currentLocale}/account-setup/personal-information`);
  };
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };
  const handleClickOutSide = () => {
    setOpen(false);
  };
  const handleRef = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current?.contains(event.target as any)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleRef);
    return () => {
      document.removeEventListener('mousedown', handleRef);
    };
  }, []);

  return (
    <>
      <main className="sticky inset-x-0 top-0 bg-white z-[100]">
        {!closeBtn && (
          <div className="flex justify-center items-start md:items-center bg-[#FEDF89] py-3 gap-x-3 px-3">
            <Text className="text-[#29292D] text-xs md:text-base">
              Find your dream, explore jobs, and set up build your personal profile. So, apply for
              jobs effortlessly with our intuitive JPlus app.
            </Text>

            <Image
              src="/icons/close-btn.svg"
              alt="gg"
              width={15}
              height={15}
              onClick={() => {
                setCloseBtn(true);
              }}
              className="cursor-pointer"
            />
          </div>
        )}

        <nav className="flex items-center justify-between lg:px-5 xl:px-10 md:px-8 px-5 py-3 border border-[#F2F4F7] sticky">
          <div className="flex items-center">
            <Link href="/" className="flex items-center lg:hidden md:hidden">
              {open ? (
                <>
                  <h1 className="text-lg font-medium">Menu</h1>
                </>
              ) : (
                <>
                  <ApplicationLogo className="block w-auto h-10 mr-1 text-gray-600 fill-current" />
                  <h1 className="text-2xl font-medium">JPlus</h1>
                </>
              )}
            </Link>
            <Link href="/" className="items-center hidden lg:flex md:flex">
              <ApplicationLogo className="block w-auto h-10 mr-1 text-gray-600 fill-current" />
              <h1 className="text-2xl font-medium">JPlus</h1>
            </Link>

            {studentId && (
              <div className="hidden pl-12 md:hidden lg:block xl:block">
                <ul className="flex transition-all duration-75 lg:gap-5 xl:gap-8 md:gap-4">
                  {navLink.map((i) => {
                    return (
                      <li key={i.id}>
                        <Link
                          className={` hover:text-[#197CC0] font-medium text-base leading-6 ${
                            activeLink === i.link ? 'text-[#197CC0]' : 'text-[#475467]'
                          }`}
                          onClick={() => handleClick(i.link)}
                          href={`/#${i.href}`}
                        >
                          {t(i.link)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 md:gap-6 lg:gap-4 z-[100]">
            <div className="relative lg:flex hidden md:hidden z-[10000]">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`text-[#475467] focus:outline-none focus:ring-0 font-semibold leading-6 text-base md:text-base lg:text-base flex items-center gap-2`}
              >
                <Image src="/images/Icon (2).svg" alt="Icons (2).svg" width={20} height={20} />
                <div>
                  <p>
                    {currentPathname === `/en`
                      ? 'English'
                      : currentPathname === `/my`
                        ? 'မြန်မာ'
                        : Language}
                  </p>
                </div>
                <div
                  //href={`/connects`}
                  className="cursor-pointer"
                >
                  <svg
                    className={`w-2.5 h-2.5 ms-2.5 ${isOpen ? 'transform rotate-180' : ''}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`absolute w-full overflow-hidden mt-2 transition-all duration-150 bg-white  rounded-md shadow-lg z-10000 top-full ${
                  isOpen ? 'max-h-[40rem]' : 'max-h-0'
                }`}
              >
                <ul>
                  <li
                    onClick={() => handleLanguageChange('English')}
                    className="px-5 py-2 cursor-pointer hover:bg-gray-100 text-[#475467] "
                  >
                    English
                  </li>

                  <hr className="px-3" />
                  <li
                    onClick={() => handleLanguageChange('မြန်မာ')}
                    className="px-5 py-2 cursor-pointer hover:bg-gray-100 text-[#475467] "
                  >
                    မြန်မာ
                  </li>
                </ul>
              </div>
            </div>

            <>
              {typeof studentId !== 'undefined' && (
                <>
                  {studentId ? (
                    <div className="items-center hidden gap-6 ml-4 lg:flex md:hidden cursor-pointer">
                      <Image
                        src="/icons/message.svg"
                        width={30}
                        height={30}
                        alt="message"
                        onClick={() => {
                          router.push(`/${currentLocale}/connects`);
                        }}
                      />
                      <Image
                        src="/icons/send-nav.svg"
                        width={30}
                        height={30}
                        alt="send"
                        onClick={() => {
                          router.push(`/${currentLocale}/inbox`);
                        }}
                      />

                      <Image
                        src="/icons/noti.svg"
                        width={30}
                        height={30}
                        alt="noti"
                        onClick={() => {
                          setOpenNotification(true);
                        }}
                      />

                      <div
                        onClick={() => setProfile(!profile)}
                        className="cursor-pointer select-none relative"
                      >
                        <Image src="/icons/profile.svg" width={30} height={30} alt="profile" />
                        <div
                          className={`absolute overflow-hidden  transition-all duration-150 bg-white rounded-md shadow-lg z-10000  whitespace-nowrap -left-14 top-10    ${
                            profile ? 'max-h-[40rem]' : 'max-h-0'
                          }`}
                        >
                          <ul>
                            <li
                              onClick={accountSetUp}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[#475467] "
                            >
                              View Profile
                            </li>

                            <Link href={`/${currentLocale}/my-jobs`}>
                              <li className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[#475467] ">
                                My Job
                              </li>
                            </Link>
                            <li className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[#475467] ">
                              Settings
                            </li>
                            <hr className="px-3" />
                            <li
                              className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[#475467] "
                              onClick={() => {
                                setAuthenticated(false);
                                logoutTrigger().then(() => {
                                  setOpen(false);
                                  router.push(`/${currentLocale}/login`);
                                  router.refresh();
                                });
                              }}
                            >
                              Log out
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="items-center hidden gap-2 lg:flex md:block whitespace-nowrap">
                      <Box
                        onClick={() => {
                          if (currentPathname !== `/${currentLocale}/login`) {
                            router.push(`/${currentLocale}/login`);
                          }
                        }}
                        className="text-base py-2 px-[18px] rounded-lg font-semibold   border-primary text-primary  border-[1.5px] cursor-pointer"
                      >
                        {t('login_lbl')}
                      </Box>
                      <Box
                        onClick={() => {
                          if (currentPathname !== `/${currentLocale}/register`) {
                            router.push(`/${currentLocale}/register`);
                          }
                        }}
                        className=" text-center text-base  py-2 px-[18px] rounded-lg font-semibold bg-[#197CC0]  text-white cursor-pointer"
                      >
                        {t('sign_up_lbl')}
                      </Box>
                    </div>
                  )}
                </>
              )}
            </>

            <div className="flex items-center md:hidden lg:hidden">
              <>
                {typeof studentId !== 'undefined' && (
                  <>
                    {studentId ? (
                      <Image width={30} height={30} src="/icons/profile.svg" alt="user" />
                    ) : (
                      // <Link
                      //     className="items-center text-sm rounded-lg font-semibold bg-[#197CC0] gap-x-2 sm:my-6  text-white px-[14px] py-[10px]"
                      //     href="/createaccount">
                      //     User
                      // </Link>
                      <>
                        <Box
                          onClick={() => {
                            if (currentPathname !== `/${currentLocale}/login`) {
                              router.push(`/${currentLocale}/login`);
                            }
                          }}
                          className="pr-3 text-[#101828] font-semibold cursor-pointer"
                        >
                          {t('login_lbl')}
                        </Box>
                        <Box
                          onClick={() => {
                            if (currentPathname !== `/${currentLocale}/register`) {
                              router.push(`/${currentLocale}/register`);
                            }
                          }}
                          className="items-center text-sm rounded-lg font-semibold bg-[#197CC0] gap-x-2 sm:my-6  text-white px-[14px] py-[10px]"
                        >
                          {t('sign_up_lbl')}
                        </Box>
                      </>
                    )}
                  </>
                )}
              </>
            </div>
            <div className="relative lg:hidden" onClick={toggleMenu}>
              <div>
                <div
                  className={`w-6 h-[1.8px] bg-gray-500 my-1 transition-transform duration-300 transform origin-center ${
                    open ? 'rotate-45 translate-y-1' : ''
                  }`}
                >
                  {}
                </div>
                <div
                  className={`w-6 h-[1.8px] bg-gray-500 my-1 transition-opacity duration-300 ${
                    open && 'opacity-0'
                  }`}
                >
                  {}
                </div>
                <div
                  className={`w-6 h-[1.8px] bg-gray-500 my-1 transition-transform duration-300 transform origin-center ${
                    open ? '-rotate-45 -translate-y-2' : ''
                  }`}
                >
                  {}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div
          className={`w-full absolute  scroll-smooth overflow-y-auto duration-700 ease-in-out -z-[1] bg-white rounded-b-lg xs:px-10 sm:hidden md:block lg:hidden ${
            open ? 'min-h-screen' : 'max-h-0 '
          }`}
        >
          {typeof studentId !== 'undefined' && (
            <>
              {studentId ? (
                <div className="pt-20">
                  <Box onClick={accountSetUp} className="flex items-center gap-3 px-5 py-5">
                    <FiUser className="text-[#344054] text-[25px]" />

                    <p className="text-[#101828] font-semibold leading-4 text-sm">View Profile</p>
                  </Box>
                  <Link
                    href={`/${currentLocale}/my-jobs`}
                    className="flex items-center gap-3 px-5 py-5"
                  >
                    <TbBriefcase2 className="text-[#344054] text-[25px]" />

                    <p className="text-[#101828] font-semibold leading-4 text-sm">My Job</p>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-5 py-5">
                    <FiSettings className="text-[#344054] text-[25px]" />

                    <p className="text-[#101828] font-semibold leading-4 text-sm">Setting</p>
                  </Link>
                  <Link href="#" className="flex items-center gap-3 px-5 py-5">
                    <IoMdHelpCircleOutline className="text-[#344054] text-[25px]" />

                    <p className="text-[#101828] font-semibold leading-4 text-sm">Support</p>
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-8 px-5 py-5">
                  {navLink.map((i) => {
                    return (
                      <li key={i.id}>
                        <Link
                          className={`text-[#101828] font-semibold text-base leading-6`}
                          onClick={() => {
                            handleClick(i.link);
                            toggleMenu();
                          }}
                          href={`#${i.href}`}
                        >
                          {i.link}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}

          <hr className={`sm:hidden md:block lg:hidden my-1 w-full`} />

          {typeof studentId !== 'undefined' && (
            <>
              {studentId ? (
                <div
                  className="flex items-center gap-3 px-5 py-5"
                  onClick={() => {
                    setAuthenticated(false);
                    logoutTrigger().then(() => {
                      startTransition(() => {
                        setOpen(false);
                        router.push(`/${currentLocale}/login`);
                        router.refresh();
                      });
                    });
                  }}
                >
                  <FiLogOut className="text-[24px] text-[#197CC0]" />

                  <p className="text-[#101828] font-semibold leading-4 text-sm">Log Out</p>
                </div>
              ) : (
                <div
                  onClick={() => setBlog(!blog)}
                  className={`flex items-center justify-between px-5 `}
                >
                  <p className="text-[#101828] font-semibold text-base leading-6 py-5">Blog</p>
                  <div>
                    <svg
                      className={`w-2.5 h-2.5 ms-2.5 ${blog ? 'transform rotate-180' : ''}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </>
          )}

          <div className={`pt-3 ${blog ? 'max-h-[40rem]' : 'max-h-0 hidden'}`}>
            <div className="flex items-center gap-2 px-6">
              <Image width={20} height={20} src="/images/news.png" alt="News" className="px-2" />
              <div>
                <p className="text-[#101828] font-semibold text-base leading-6">News</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-6 pt-8 pb-5">
              <div className="px-2">
                <Image width={20} height={20} src="/images/idea.png" alt="idea" />
              </div>
              <div>
                <p className="text-[#101828] font-semibold text-base leading-6">Career Advice</p>
              </div>
            </div>
          </div>
          <hr className={`sm:hidden md:block lg:hidden my-1 w-full`} />
          <div onClick={() => setIsOpen(!isOpen)} className={`${false ? 'hidden' : ''}`}>
            <h1 className="px-5 py-5 text-[#101828] font-semibold text-base leading-6">
              Choose Language
            </h1>
            <div className="flex items-center justify-between px-5 ">
              <div className="flex items-center gap-3">
                {Language === 'English' ? (
                  <Image src="/images/en-m.svg" alt="English" width={25} height={25} priority />
                ) : Language === 'Japanese' ? (
                  <Image src="/images/ja.png" alt="Japanese" width={25} height={25} priority />
                ) : (
                  <Image src="/images/mm-m.svg" alt="မြန်မာ" width={25} height={25} priority />
                )}

                <p className="text-[#101828] font-semibold text-base leading-6 py-5">{Language}</p>
              </div>
              <div>
                <svg
                  className={`w-2.5 h-2.5 ms-2.5 ${isOpen ? 'transform rotate-180' : ''}`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="px-5">
            <div
              className={`w-full overflow-hidden px-4 mt-1 mb-5 transition-all duration-150 border border-[#F2F4F7] bg-white shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08)] z-10000 top-full rounded-lg ${
                isOpen ? 'max-h-[40rem]' : 'max-h-0 hidden'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div>
                  <div
                    onClick={() => handleLanguageChange('English')}
                    className={`flex justify-between items-center mt-2 px-3 mb-2 ${
                      Language === 'English' ? 'bg-[#EFF4FF]' : ''
                    } rounded-md`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <Image src="/images/en-m.svg" alt="english" width={25} height={25} />
                      </div>
                      <p className="text-[#101828] font-semibold text-base leading-6 py-5">
                        English
                      </p>
                    </div>
                    {Language === 'English' && (
                      <div>
                        <Image
                          src="/images/check (1).png"
                          alt="Check Mark"
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  onClick={() => handleLanguageChange('မြန်မာ')}
                  className={`flex justify-between items-center mt-2 px-3 mb-2  rounded-md ${
                    Language === 'မြန်မာ' ? 'bg-[#EFF4FF]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <Image src="/images/mm-m.svg" width={25} height={25} alt="mm-log" />
                    </div>
                    <p className="text-[#101828] font-semibold text-base leading-6 py-5">မြန်မာ</p>
                  </div>
                  {Language === 'မြန်မာ' && (
                    <div>
                      <Image src="/images/check (1).png" width={25} height={25} alt="check" />
                    </div>
                  )}
                </div>
                <div
                  onClick={() => handleLanguageChange('Japanese')}
                  className={`flex justify-between items-center mt-2 px-3 mb-2  rounded-md ${
                    Language === 'Japanese' ? 'bg-[#EFF4FF]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <Image src="/images/ja.png" width={25} height={25} alt="mm-log" />
                    </div>
                    <p className="text-[#101828] font-semibold text-base leading-6 py-5">
                      Japanese
                    </p>
                  </div>
                  {Language === 'Japanese' && (
                    <div>
                      <Image src="/images/check (1).png" width={25} height={25} alt="check" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <hr className={`sm:hidden md:block lg:hidden my-1 w-full`} />
          <div
            className={`sm:hidden md:flex lg:hidden flex items-start gap-4 justify-start mt-10 px-5`}
          >
            <div>
              <Image
                src="/images/Icon (3).png"
                alt="Icon"
                width={12}
                height={12}
                className="w-9 h-7 md:w-8 md:h-8"
              />
            </div>
            <div>
              <h1 className="font-semibold text-[#101828] text-base">Job Owner Mobile App</h1>
              <p className="text-[#475467] text-sm font-normal">
                Discover JPlus on Mobile for a Seamless Full Feature Experience in Job Management!
              </p>
            </div>
          </div>
          <div className="flex justify-center w-full gap-4 px-5 pb-5 mt-5 lg:hidden md:hidden">
            <Link
              className="items-center text-center text-base w-full py-3 rounded-lg font-semibold bg-[#197CC0] gap-x-2 sm:my-6 sm:ps-6 text-white px-14"
              href="#"
            >
              Mobile Download App
            </Link>
          </div>
        </div>
        <div
          onClick={handleClickOutSide}
          className={` ${
            open ? 'visible' : 'hidden'
          } w-full  -z-[10] absolute min-h-screen  bg-gray-900 bg-opacity-50 hs-dropdown hs-collapse  hs-overlay-backdrop lg:hidden`}
        >
          <></>
        </div>
        {typeof studentId !== 'undefined' && studentId && (
          <div className="flex lg:hidden md:hidden xl:hidden bg-[#E0F2FE] px-6 py-3 justify-around">
            <Link href={`/${currentLocale}/connects`} className="cursor-pointer select-none">
              <Image width={30} height={30} alt="connect" src="/icons/message.svg" />
            </Link>
            <Image
              width={30}
              height={30}
              alt="connect"
              src="/icons/send-nav.svg"
              onClick={() => {
                router.push(`/${currentLocale}/inbox`);
              }}
            />
            <Image
              width={30}
              height={30}
              alt="notification"
              src="/icons/noti.svg"
              onClick={() => {
                setOpenNotification(true);
              }}
            />
          </div>
        )}
      </main>

      <NotificationsBlurModal
        openNotification={openNotification}
        notiType={notiType}
        setNotiType={setNotiType}
        setOpenNotification={setOpenNotification}
      />
    </>
  );
};

export default Nav;
