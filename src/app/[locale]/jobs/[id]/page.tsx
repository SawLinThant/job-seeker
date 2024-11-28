'use client';
import AirPlane from '@/components/icons/airplane';
import BackIcon from '@/components/icons/back';
import BigStar from '@/components/icons/big-star';
import Book from '@/components/icons/book';
import ChecksIcon from '@/components/icons/checks';
import EditorIcon from '@/components/icons/editIcon';
import Education from '@/components/icons/education';
import Eye from '@/components/icons/eye';
import EyeOutline from '@/components/icons/eye-outline';
import Facebook from '@/components/icons/facebook';
import FirstLogo from '@/components/icons/firstLogo';
import Human from '@/components/icons/human';
import Instgram from '@/components/icons/instgram';
import JobIcon from '@/components/icons/job';
import Joblevel from '@/components/icons/job-level';
import JplusLogo from '@/components/icons/JplusLogo';
import LikeIcon from '@/components/icons/likeIcon';
import Line from '@/components/icons/Line';
import LocationIcon from '@/components/icons/location';
import Lotting from '@/components/icons/lotting';
import ManyUser from '@/components/icons/Manyuser';
import OutStar from '@/components/icons/outline-star';
import OutlineStar from '@/components/icons/outlineStar';
import ReplyIcon from '@/components/icons/replyIcon';
import RightArr from '@/components/icons/rightArr';
import Saveicon from '@/components/icons/Saveicon';
import SecondLogo from '@/components/icons/second';
import SendIcon from '@/components/icons/sendIcon';
import Star from '@/components/icons/star';
import TimingIcon from '@/components/icons/timing';
import TwitterIcon from '@/components/icons/TwitterIcon';
import Nav from '@/components/nav';
import DetailJob from '@/components/pages/search-jobs/detai-jobs/DetailJob';
import PrimaryButton from '@/components/ui/button/PrimaryButton';
import SecondaryButton from '@/components/ui/button/SecondaryButton';
import { Calendar } from 'lucide-react';
import React from 'react';
import JobType from './components/job-type';
import JobCategory from './components/job-category';
import JobRequirment from './components/job-requirment';
import CommentBox from './components/commentBox';
import PopluarJobCard from './components/popular-job-card';
import DetailFooter from './components/detail-footer';
import { useParams } from 'next/navigation';
import { useGetJobDetailsId } from '@/services/jobService';

const JobDetailPage = () => {

    const {id}=useParams();
    const {data,mutate}=useGetJobDetailsId(id as string || "");
    console.log("data",data)
  return (
    <>
      <Nav />
      {
        data &&  <div className="">
        <div className="">
          <div className='md:max-w-[1150px] flex flex-col gap-3 lg:container px-3 mx-auto pt-7'>
          <JobType props={data} mutate={mutate}/>
          <JobCategory props={data}/>
         <JobRequirment props={data}/>
         <CommentBox props={data}/>
          </div>
           <PopluarJobCard/>
          <DetailFooter/>
           <div className="py-2 bg-primary">
              <div className="flex flex-col  md:flex md:flex-row items-center gap-3 text-white justify-center">
                    <p>Privacy policy</p>
                    <p>Terms and conditions</p>
                    <p>Copyright © 2023 JPlus </p>
              </div>
           </div>
        </div>
      </div>
      }

     
    </>
  );
};

export default JobDetailPage;
