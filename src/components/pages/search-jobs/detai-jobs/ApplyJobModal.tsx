'use client'
import { useState } from 'react'

import Image from 'next/image'
import Modal from '@/components/ui/modal'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import SecondaryButton from '@/components/ui/button/SecondaryButton'

const ApplyJobModal:React.FC<any> = ({ currentJob, setIsJobApplied }) => {
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null)

    return (
        <div className="max-md:hidden">
            {currentJob.timeSlot === null ? (
                <Modal className="w-full md:max-w-[800px]">
                    <div className="p-6 md:p-10">
                        <Image alt="check-icon" width={18} height={18}  src="/icons/check-icon.svg" className="my-8" />

                        <h1 className="font-semibold text-2xl lg:text-3xl text-[#101828] mb-3">
                            Successful!
                        </h1>
                        <p className="text-base text-[#475467] text-center mb-8">
                            Your application has been sent successfully to JPlus
                            Job Portal. The employer will contact you if you are
                            in short-listed. Thank you and good luck in your
                            application.
                        </p>
                        <PrimaryButton
                            onClick={() => setIsJobApplied(false)}
                            className={`bg-[#197CC0] text-white text-sm font-semibold px-10 py-2.5`}>
                            Done
                        </PrimaryButton>
                    </div>
                </Modal>
            ) : (
                <Modal className="md:max-w-[800px]">
                    <div className="p-6 md:p-10">
                        <div className="flex items-center justify-between w-full mx-5 mb-6">
                            <Image alt="check-icon" width={18} height={18} src="/icons/check-icon.svg" />
                            <Image 
                            alt="close icon"
                            width={18}
                            height={18}
                                onClick={() => setIsJobApplied(false)}
                                src="/icons/close-icon.svg"
                                className="cursor-pointer"
                            />
                        </div>

                        <h1 className="font-semibold text-xl lg:text-2xl text-[#101828] mb-5">
                            Your application has been sent successfully to JPlus
                            Job Portal!
                        </h1>
                        <p className="text-sm text-[#475467] text-center mb-8">
                            Please pick a possible time slot for the interview
                            with your job owner soon.
                        </p>

                        <div className="gap-8 flex-row w-full">
                            {currentJob.timeSlot?.map((data:any, index:number) => (
                                <div
                                    onClick={() => setSelectedTimeSlot(data)}
                                    key={index}
                                    className={`w-full ${
                                        selectedTimeSlot?.id === data?.id
                                            ? 'bg-[#197CC0] text-white'
                                            : 'bg-[#F3F4F6]'
                                    } hover:bg-[#197CC0] hover:text-white rounded-md px-10 md:px-5 py-10 flex gap-2 ${
                                        index == 1
                                            ? 'flex-col-reverse'
                                            : 'flex-col'
                                    }`}>
                                    <p className="text-xl font-medium lg:text-3xl">
                                        {data.time}
                                    </p>
                                    <p>{data.date}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex w-full gap-2 mt-6">
                            <SecondaryButton
                                onClick={() => setIsJobApplied(false)}
                                className={`text-[#344054] border border-[#D0D5DD] font-semibold px-4 py-2.5 gap-2 w-full`}>
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton
                                onClick={() => setIsJobApplied(false)}
                                className={`bg-[#197CC0] text-white text-sm font-semibold px-4 py-2.5 w-full flex justify-center`}>
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default ApplyJobModal
