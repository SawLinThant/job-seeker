'use client'
import { useState, useEffect } from 'react'
import SearchRegionDropdown from './SearchRegionDropdown'
import SecondaryButton from '@/components/ui/button/SecondaryButton'
import PrimaryButton from '@/components/ui/button/PrimaryButton'
import Input from '@/components/ui/inputs/Input'
import SelectResponsive from './SelectResponsive'
import Image from 'next/image'


const FilterResponsive:React.FC<any> = ({
    isFilterOpen,
    setIsFilterOpen,
    filterData,
    selectedData,
    setSelectedData,
    isDataUpdated,
    jobPreferences,
}) => {
    useEffect(() => {
        const handleBodyScroll = () => {
            document.body.style.overflow = isFilterOpen ? 'hidden' : 'auto'
        }

        handleBodyScroll()

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isFilterOpen])

    const titles = [
        {
            icon: 'briefcaseBlue',
            title: 'job type',
            options: filterData.jobType,
        },
        {
            icon: 'yenBlue',
            title: 'salary range',
            options: filterData.salaryRange,
        },
        {
            icon: 'barchartBlue',
            title: 'job level',
            options: filterData.jobLevel,
        },
        {
            icon: 'passportBlue',
            title: 'visa type',
            options: filterData.visaType,
        },
    ]

    const [clickedTitle, setClickedTitle] = useState('job type')

    const sortedTitles = titles.slice().sort((a, b) => {
        const aTitleLower = a.title.toLowerCase()
        const bTitleLower = b.title.toLowerCase()

        const aIsClicked = aTitleLower === clickedTitle.toLowerCase()
        const bIsClicked = bTitleLower === clickedTitle.toLowerCase()

        if (aIsClicked && !bIsClicked) {
            return -1
        } else if (!aIsClicked && bIsClicked) {
            return 1
        }
        return 0
    })

    return (
        <div>
            <div
                onClick={() => setIsFilterOpen(false)}
                className={`bg-[#475467] opacity-20 fixed w-full h-full top-0 left-0 backdrop-blur-xl ${
                    isFilterOpen ? '' : 'hidden'
                }`}>
                <></>
            </div>
            <div
                className={`bg-white w-full transition-all duration-500 fixed bottom-0 left-0 rounded-t-3xl ${
                    isFilterOpen ? 'h-screen pt-36' : 'h-0 '
                }`}>
                <div className={`h-[100%] relative`}>
                    <div
                        className={`${
                            isFilterOpen
                                ? 'h-20 shadow-md shadow-gray-300'
                                : 'h-0'
                        } transition-all duration-600 w-full bg-white absolute bottom-0 z-50 flex gap-4 items-center px-4 `}>
                        {isFilterOpen && (
                            <>
                                {isDataUpdated && (
                                    <SecondaryButton
                                        onClick={() => {
                                            setSelectedData(jobPreferences)
                                        }}
                                        className="px-[14px] py-2">
                                        Clear All
                                    </SecondaryButton>
                                )}

                                <PrimaryButton className="py-2 grow">
                                    Apply
                                </PrimaryButton>
                            </>
                        )}
                    </div>

                    <div className="bg-[#F0F9FF] py-4 px-5 rounded-t-3xl flex justify-between items-center ">
                        <h1 className="text-[#344054] text-lg font-semibold">
                            Filter
                        </h1>
                        <Image alt="x-close" width={18} height={18}
                            src="/icons/x-close-blue.svg"
                            onClick={() => setIsFilterOpen(false)}
                        />
                    </div>

                    <div className="w-full flex justify-around text-[#344054] text-xs font-medium ">
                        <div onClick={() => setClickedTitle('job type')}>
                            <h1
                                className={`py-2.5 ${
                                    clickedTitle == 'job type'
                                        ? 'font-semibold text-[#197CC0]'
                                        : ''
                                }`}>
                                Job Type
                            </h1>{' '}
                            <hr
                                className={`${
                                    clickedTitle == 'job type'
                                        ? 'border-2 border-[#197CC0] rounded-t-lg'
                                        : 'border-2 border-transparent'
                                }`}
                            />
                        </div>
                        <button onClick={() => setClickedTitle('salary range')}>
                            <h1
                                className={`py-2.5 ${
                                    clickedTitle == 'salary range'
                                        ? 'font-semibold text-[#197CC0]'
                                        : ''
                                }`}>
                                Salary Range
                            </h1>
                            <hr
                                className={`${
                                    clickedTitle == 'salary range'
                                        ? 'border-2 border-[#197CC0] rounded-t-lg'
                                        : 'border-2 border-transparent'
                                }`}
                            />
                        </button>
                        <button onClick={() => setClickedTitle('job level')}>
                            <h1
                                className={`py-2.5 ${
                                    clickedTitle == 'job level'
                                        ? 'font-semibold  text-[#197CC0]'
                                        : ''
                                }`}>
                                Job Level
                            </h1>
                            <hr
                                className={`${
                                    clickedTitle == 'job level'
                                        ? 'border-2 border-[#197CC0] rounded-t-lg'
                                        : 'border-2 border-transparent'
                                }`}
                            />
                        </button>
                        <button onClick={() => setClickedTitle('visa type')}>
                            <h1
                                className={`py-2.5 ${
                                    clickedTitle == 'visa type'
                                        ? 'font-semibold  text-[#197CC0]'
                                        : ''
                                }`}>
                                Visa Type
                            </h1>
                            <hr
                                className={`${
                                    clickedTitle == 'visa type'
                                        ? 'border-2 border-[#197CC0] rounded-t-lg'
                                        : 'border-2 border-transparent'
                                }`}
                            />
                        </button>
                    </div>
                    <div className="h-full overflow-y-scroll px-4 pb-60">
                        {sortedTitles.map((item, index) => (
                            <div key={index}>
                                <SelectResponsive
                                    icon={item.icon}
                                    title={item.title}
                                    options={item.options}
                                    selectedData={selectedData}
                                    setSelectedData={setSelectedData}
                                />
                                <hr className="border border-[#D0D5DD] my-4 w-full" />
                            </div>
                        ))}

                        <div className="my-4">
                            <div className="mb-3">
                                <label className="mb-1 text-sm text-[#344054] font-medium">
                                    Posted Date
                                </label>
                                <Input type="date" className="w-full" />
                            </div>

                            <div className="pb-4">
                                <label className="mb-1 text-sm text-[#344054] font-medium">
                                    Deadline Date
                                </label>
                                <Input type="date" className="w-full" />
                            </div>
                            <hr className="border border-[#D0D5DD] my-4 w-full" />
                        </div>

                        <div className="my-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Image alt="location" width={18} height={18} src="/icons/location.svg" />
                                <h1 className="text-lg text-[#344054] font-medium">
                                    Region
                                </h1>
                            </div>
                            <SearchRegionDropdown
                                filterData={filterData}
                                selectedData={selectedData}
                                setSelectedData={setSelectedData}
                            />
                        </div>

                        <SelectResponsive
                            icon="buildingBlue"
                            options={filterData.companySize}
                            selectedData={selectedData}
                            setSelectedData={setSelectedData}
                            title="company size"
                            isSelectDropdown={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterResponsive
