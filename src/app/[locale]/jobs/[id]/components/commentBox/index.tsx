import OutStar from '@/components/icons/outline-star'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import SecondaryButton from '@/components/ui/button/SecondaryButton'
import { useGetJobDetailsId, useMutateReview } from '@/services/jobService'
import { JobDetailTypeI } from '@/types/jobDetail'
import { SendIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaRegStar,FaStar } from 'react-icons/fa6'
import { cn } from '@/utils/cn';

const CommentBox :React.FC<{props:JobDetailTypeI}> = ({props}) => {
        const {trigger}=useMutateReview(props?.data?.id)
            const {id}=useParams();

const {data,mutate}=useGetJobDetailsId(id as string || "");
const [rating,setRating]=useState(0)

        const [reviewText,setReviewText]=useState("")


  return (
    <div className="bg-[#FCFCFD] py-8">
    <p className='mb-5 text-xl font-semibold text-center'>Select stars to rate</p>
    <div className="flex gap-2 justify-center my-5">

        {
            [1,2,3,4,5].map((j,i)=>(
                <div key={i} onClick={()=>{

                    if(rating === j){
                                                                    setRating(j-1)


                    }else{
                                            setRating(j)

                    }
                    
                }}>

                    {
                        rating >=j ? <FaStar className="text-yellow-500 text-2xl" />: <FaRegStar className={cn(" text-2xl")} />
                    }
                    

                    
 

                </div>
            ))
        }
      {/* <OutStar />
      <OutStar />
      <OutStar />
      <OutStar />
      <OutStar /> */}
    </div>
    <div>
      <p className='mb-3'>Glad to hear it! Have any comment to share?</p>
    </div>
    <div className='border rounded-md p-2 mb-3 bg-white'>
      <textarea value={reviewText} onChange={(e)=>{
        setReviewText(e.target.value)
      }} className='h-[100px] w-full text-sm outline-none' placeholder='Leave your review here...' />
    </div>
    <div className='flex justify-end'>
      <div className='flex items-center  gap-2'>
        <SecondaryButton className="px-5 py-2">
          Cancel
        </SecondaryButton>
        <PrimaryButton disabled={reviewText ==="" || data?.data?.is_can_review} onClick={()=>{
            trigger({
                review:reviewText,
                rating:rating
            },{
                onSuccess:(d)=>{
                    toast.success("Reviewed")
                    mutate()
                    setReviewText("")
                },
                onError:(d)=>{
                    toast.error("Reviewed failed.")
                }
            })
        }} className="px-5 flex items-center gap-1 py-2">
          <SendIcon /> <span>Submit</span>
        </PrimaryButton>
      </div>
    </div>
  </div>
  )
}

export default CommentBox
