import BigStar from '@/components/icons/big-star'
import ChecksIcon from '@/components/icons/checks'
import Eye from '@/components/icons/eye'
import Human from '@/components/icons/human'
import LikeIcon from '@/components/icons/likeIcon'
import LocationIcon from '@/components/icons/location'
import ReplyIcon from '@/components/icons/replyIcon'
import SecondLogo from '@/components/icons/second'
import Star from '@/components/icons/star'
import { useGetJobDetailsId, useMutateReviewLikeUnlike } from '@/services/jobService'
import { JobDetailTypeI } from '@/types/jobDetail'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

import React from 'react'

const JobRequirment:React.FC<{props:JobDetailTypeI}> = ({props}) => {
    const {id}=useParams();

const {data,mutate}=useGetJobDetailsId(id as string || "");
    const {trigger:triggerReview}=useMutateReviewLikeUnlike()
  const router = useRouter()
  const handleEmployeeDetails = ()=>{
        router.push(`/employee/${props?.data?.business_id}`)
  }
  return (
    <React.Fragment>
        {
            props.data.is_needed_to_upload_document && <div className=''>
            <p className='text-xl font-semibold mb-5'>Required certified documents</p>

            {
                props.data.is_needed_to_upload_document && <div className="flex items-center gap-2 mb-2">
              <ChecksIcon />
              <p>
               {props.data.is_needed_to_upload_document}
              </p>
            </div>
            }
            
            

          </div>
        }
       
          <div className='mt-3 gap-3 grid lg:grid-cols-3 items-start grid-cols-1'>
            <div className='border rounded-md p-4 min-h-[300px]' >
              <p className='mb-4 font-semibold'>Employer info</p>
              <div className='flex items-center gap-3'>
                <Image src={props?.data?.companyLogo} alt={props?.data?.companyLogo} width={50} height={50} className="rounded-full"/>
                {/* <SecondLogo /> */}
                <div>
                  <p>{props?.data?.company || ""}</p>
                  <div className='flex items-center gap-1'>
                    <LocationIcon />
                    <p className='text-sm font-semibold text-primary'>{props?.data?.location?.region}</p>
                  </div>
                </div>
              </div>

              {
                props?.data?.business_description &&   <p className='my-2'>
                {props?.data?.business_description}
              </p>
              }
            
              <p className='my-3'>Job posted : {props?.data?.business_job_post_count}</p>
              <div onClick={handleEmployeeDetails} className='rounded-md cursor-pointer  hover:bg-primary hover:text-white my-2 font-semibold border-2 flex items-center justify-center border-primary text-base text-primary py-2 w-full'>
                <span> View Details</span>
              </div>
            </div>
            <div className='col-span-2 border rounded-md'>
              <div className='p-5 border-b flex flex-col items-center justify-center'>
                <div className='flex items-center gap-2'>
                  <BigStar />
                  <p className='text-lg text-primary font-semibold'>{props?.data?.rating}</p>
                </div>
                  <p className="text-center text-black font-bold text-lg ">{props?.data?.total_review} Reviews</p>
              </div>
                            


              <div>

                {
                    props?.data?.reviews?.map((_,i)=>(
                        <div className='py-5 border-b px-4 ' key={i}>
                <div className='flex mb-4 gap-3 items-center'>
                                  <Image src={_?.image?.path} alt={_?.image?.path} width={40} height={40} className="rounded-full aspect-square"/>

                  <div className='text-sm'>
                    <p className='font-semibold'>{_?.reviewer_name}</p>
                    <p className='text-[#667085]'>{_?.reviewed_time}</p>
                  </div>
                </div>
                <div className='flex items-center mb-4 gap-2'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <p className="text-sm">{_?.rating}</p>

                </div>
                <p className='text-sm'>{_?.review}</p>
                {/* <p className="text-primary my-2">Read more...</p> */}
                <div className='mt-5 text-sm  gap-3 flex items-center cursor-pointer' >

                    {
                        !_?.is_liked_self ? <AiOutlineLike className="text-xl" onClick={()=>{
                    triggerReview({
                        reviewId:_?.id
                    },{
                        onSuccess:(e)=>{
                            mutate()
                            toast.success(!_?.is_liked_self ?  "Liked":"UnLiked");
                        },
                        onError:(e)=>{
                                                         toast.success("Fail Liked");

                        }
                    })
                }}/>:<AiFillLike className="text-xl" onClick={()=>{
                    triggerReview({
                        reviewId:_?.id
                    },{
                        onSuccess:(e)=>{
                            mutate()
                           toast.success(!_?.is_liked_self ?  "Liked":"UnLiked");
                        },
                        onError:(e)=>{
                                                         toast.success("Fail Liked");

                        }
                    })
                }}/>
                    }

                    

                 <span> {_?.total_like} </span>
                  {/* <ReplyIcon />
                  <span>Reply</span> */}
                </div>
              </div>
                    ))
                }

              </div>
              {/* <div className='py-5 border-b px-4'>
                <div className='flex mb-4 gap-3 items-center'>
                  <Human />
                  <div className='text-sm'>
                    <p className='font-semibold'>Aliah Lane</p>
                    <p className='text-[#667085]'>Jan 8 2023, 05:30 PM</p>
                  </div>
                </div>
                <div className='flex items-center mb-4 gap-2'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <p className="text-sm">5.0</p>

                </div>
                <p className='text-sm'>I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role.</p>
                <p className="text-primary my-2">Read more...</p>
                <div className='mt-5 text-sm  gap-3 flex items-center'>
                  <LikeIcon /> <span> 34 </span> <span className='w-[1px] inline-block h-[15px] bg-[#D0D5DD]' />
                  <ReplyIcon />
                  <span>Reply</span>
                </div>
              </div> */}
              {/* <div className='py-5 border-b px-4'>
                <div className='flex mb-4 gap-3 items-center'>
                  <Human />
                  <div className='text-sm'>
                    <p className='font-semibold'>Aliah Lane</p>
                    <p className='text-[#667085]'>Jan 8 2023, 05:30 PM</p>
                  </div>
                </div>
                <div className='flex items-center mb-4 gap-2'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <p className="text-sm">5.0</p>

                </div>
                <p className='text-sm'>I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role.</p>
                <p className="text-primary my-2">Read more...</p>
                <div className='mt-5 text-sm  gap-3 flex items-center'>
                  <LikeIcon /> <span> 34 </span> <span className='w-[1px] inline-block h-[15px] bg-[#D0D5DD]' />
                  <ReplyIcon />
                  <span>Reply</span>
                </div>
              </div>
              <div className='py-5 border-b px-4'>
                <div className='flex mb-4 gap-3 items-center'>
                  <Human />
                  <div className='text-sm'>
                    <p className='font-semibold'>Aliah Lane</p>
                    <p className='text-[#667085]'>Jan 8 2023, 05:30 PM</p>
                  </div>
                </div>
                <div className='flex items-center mb-4 gap-2'>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <p className="text-sm">5.0</p>

                </div>
                <p className='text-sm'>I am writing to express my deep satisfaction and appreciation for the opportunity to serve as the English Teacher at [Preschool Name], a position I discovered through [Job Website]. Having been a part of this dynamic preschool community, I am pleased to share my experiences and successes during my time in this role.</p>
                <p className="text-primary my-2">Read more...</p>
                <div className='mt-5 text-sm  gap-3 flex items-center'>
                  <LikeIcon /> <span> 34 </span> <span className='w-[1px] inline-block h-[15px] bg-[#D0D5DD]' />
                  <ReplyIcon />
                  <span>Be the First to like</span>
                </div>
              </div>
              <div className='border-t flex gap-3 items-center justify-center py-4'>
                <span className='mt-1'><Eye /></span> <p className='text-primary font-semibold'>More reviews</p>
              </div> */}
            </div>
            <div></div>
          </div>
    </React.Fragment>
  )
}

export default JobRequirment
