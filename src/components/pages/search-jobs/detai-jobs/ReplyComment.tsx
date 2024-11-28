'use client'


import PrimaryButton from '@/components/ui/button/PrimaryButton'
import Input from '@/components/ui/inputs/Input'
import Image from 'next/image'

const ReplyComment = () => {
    return (
        <div className="flex items-center gap-4 pt-10">
            {/* TODO: replace the following profile img and username with the actual user data */}
            <div className="flex items-center gap-2">
                <Image alt="gg" width={30} height={30} src="/images/jobdetails/Avatar4.png" />
                <h1 className="text-base font-semibold text-[#344054]">
                    Ana Marie
                </h1>
            </div>
            <Input placeholder="Enter reply"        className="border focus-visible:ring-0 placeholder:text-[#667085]" />
            <PrimaryButton className="px-[14px] py-2 text-sm gap-2">
                <Image alt="gg" width={30} height={30} src="/icons/send.svg" />
                Reply
            </PrimaryButton>
        </div>
    )
}

export default ReplyComment
