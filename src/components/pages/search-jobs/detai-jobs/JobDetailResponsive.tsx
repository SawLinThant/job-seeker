"use client";
import { useState, useEffect } from "react";

import Image from "next/image";
import StarRating from "@/components/home/jobs/StarRating";
import SecondaryButton from "@/components/ui/button/SecondaryButton";
import PrimaryButton from "@/components/ui/button/PrimaryButton";
import RatingAndReview from "./RatingAndReview";
import ApplyJobOffcanvas from "./ApplyJobOffcanvas";
import decode from 'html-entities-decoder';

const JobDetailResponsive:React.FC<any> = ({ currentJob }) => {
  const [showHeader, setShowHeader] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  // const { permission } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
    });
  }, []);
  const [showJobDescription, setShowJobDescription] = useState(true);

  const handleJobApply = () => {
    // if (!!permission) {
    //   setIsOffcanvasOpen(true);
    // } else {
    //   window.alert("Permission Required!");
    // }
  };
  return (
    <div className="md:hidden">
      {/* header while scrolling */}
      {showHeader && (
        <div className="sticky  top-0 z-30 flex justify-between gap-4 px-4 py-4 bg-white rounded-md shadow shadow-gray-300">
            <Image alt="arrow" width={30} height={30} src="/icons/arrow-btn.svg" />
          <div>
            <h1 className="text-sm font-medium text-[#101828] mb-2">
              {currentJob?.title?.length > 40
                ? currentJob?.title.slice(0, 40) + "..."
                : currentJob?.title}
            </h1>
            <div className="flex items-center gap-2">
              <Image width={20} height={20} src={currentJob?.companyLogo} alt="company logo" />
              <p className="text-xs font-medium text-[#101828] mb-2">
                {currentJob?.company?.length > 17
                  ? currentJob?.company.slice(0, 17) + "..."
                  : currentJob?.company}
              </p>
            </div>
          </div>
          {/* <Image alt="share" width={20} height={20} src="/icons/share.svg" /> */}
        </div>
      )}
      {/* header while scrolling end*/}

      <div className="relative h-screen">
        <div className="h-[100%] overflow-y-scroll pb-20 no-scrollbar">
          <div className="flex justify-between px-6 py-4">
              <Image alt="t" width={23} height={23} src="/icons/arrow-btn.svg" />
            {/* <Image alt="g" width={23} height={23} src="/icons/share.svg" /> */}
          </div>
          <div>
            <div className="px-6">
              <div className="flex flex-col justify-between w-full gap-4 px-6 py-4 mb-6 bg-white rounded-lg shadow">
                <h1 className="text-base font-medium text-[#101828]">
                  {currentJob?.title}
                </h1>

                <div className="flex gap-2">
                  <Image
                  width={20}
                  height={20}
                    className="w-12 h-12"
                    src={currentJob?.companyLogo}
                    alt="company logo"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#101828] mb-2">
                      {currentJob?.company}
                    </p>
                    <div className="flex items-center gap-2">
                      <Image alt="gg" width={20} height={20} src="/images/location.svg" />
                      <p className="text-sm font-medium text-[#344054]">
                        {currentJob?.location?.region}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 text-sm font-medium">
                    {/* <p className="text-[#175CD3] bg-blue-50 p-2 rounded-full">
                      {currentJob?.workEnvironment}
                    </p> */}
                    <p
                      className={`${
                        currentJob?.jobType == "part time"
                          ? "text-[#B93815] bg-red-50"
                          : "text-[#175CD3] bg-blue-50"
                      } p-2 rounded-full capitalize`}
                    >
                      {currentJob?.jobType}
                    </p>
                  </div>
                  <p className="text-[#197CC0] text-sm font-medium">
                    {currentJob?.salary?.start} ~ {currentJob?.salary?.end}
                    /m
                  </p>
                </div>

                <div className="flex justify-between">
                  <div className="text-[text-[#344054] font-medium">
                    <div className="flex items-center gap-2">
                      <Image alt="eye" width={18} height={18} src="/images/eye.svg" />
                      <p className="text-xs">{currentJob?.views} Views</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image alt="user" width={18} height={18} src="/images/user.svg" />
                      <p className="text-sm">
                        {currentJob?.applicants} Applicants
                      </p>
                    </div>
                  </div>
                  {/* <div>
                    <p className="text-xs text-[#344054] font-medium text-end">
                      +4 comments
                    </p>
                    <StarRating
                      className="w-6"
                      rating={currentJob?.rating}
                      disabled={true}
                    />
                  </div> */}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <p className=" text-[#101828]">
                    Posted on :{currentJob?.date}
                  </p>
                  <p
                    className={`${
                      currentJob?.lastApplyDate == "Today"
                        ? "text-[#B42318]"
                        : "text-[#475467]"
                    } font-medium`}
                  >
                    Last Apply : {currentJob?.lastApplyDate}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6">
              <div className="flex text-center">
                <div className="w-full">
                  <h1
                    onClick={() => setShowJobDescription(true)}
                    className={`pt-2.5 pb-2 text-sm font-semibold ${
                      showJobDescription ? "text-[#197CC0]" : "text-[#98A2B3]"
                    }`}
                  >
                    Job Description
                  </h1>
                  <hr
                    className={`${
                      showJobDescription
                        ? "border-2 border-[#197CC0] rounded-t-md"
                        : "border-2 border-transparent"
                    }`}
                  />
                  <hr className="w-full border border-gray-300" />
                </div>
                {/* <div className="w-[50%]">
                  <h1
                    onClick={() => setShowJobDescription(false)}
                    className={`pt-2.5 pb-2 text-sm font-semibold ${
                      showJobDescription ? "text-[#98A2B3]" : "text-[#197CC0]"
                    }`}
                  >
                    Job Requirements
                  </h1>
                  <hr
                    className={`${
                      showJobDescription
                        ? "border-2 border-transparent"
                        : "border-2 border-[#197CC0] rounded-t-md"
                    }`}
                  />
                  <hr className="w-full border border-gray-300" />
                </div> */}
              </div>

              <div className="w-full my-6">
                {showJobDescription ? (
                  <div>
                    <h1 className="text-[#101828] text-lg font-medium mb-6">
                      Job Description
                    </h1>
                    <p className="text-sm text-[#1D2939]">
                      {currentJob?.description}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-[#101828] text-lg font-medium mb-6">
                      Job Requirements
                    </h1>
                    <ul className="ml-6 list-disc">
                      {currentJob?.requirements?.map((data:any, index:number) => (
                        <li key={index} className="text-sm text-[#1D2939] my-4">
                          {data}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
             <div
                    className="py-2  text-gray_700"
                    dangerouslySetInnerHTML={{
                      __html: currentJob?.job_description
                        ? decode(currentJob?.job_description)
                        : decode(''),
                    }}
                  />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full px-6">
          <div className=" flex items-center w-full gap-4 py-4 bg-white">
            <SecondaryButton className={`w-full py-2.5 gap-2`}>
              <Image alt="gdg" width={18} height={18} src="/images/bookmarkIcon.svg" />
              Save
            </SecondaryButton>

            <PrimaryButton
              onClick={handleJobApply}
              className={`text-sm font-semibold w-full py-2.5 gap-2`}
            >
              <Image  alt="gdg" width={18} height={18} src="/images/briefcaseIcon.svg" />
              Apply
            </PrimaryButton>
          </div>
        </div>
        <ApplyJobOffcanvas
          currentJob={currentJob}
          isOffcanvasOpen={isOffcanvasOpen}
          setIsOffcanvasOpen={setIsOffcanvasOpen}
        />
      </div>

      {/* <RatingAndReview /> */}
    </div>
  );
};

export default JobDetailResponsive;
