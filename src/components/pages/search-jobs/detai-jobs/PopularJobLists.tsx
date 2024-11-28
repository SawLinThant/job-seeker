'use client'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Card from '@/components/home/jobs/Card'

const PopularJobList:React.FC<any> = ({ jobLists, className }) => {
    return (
        <div className={`${className} z-10`}>
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={false}
                pagination={{
                    clickable: true,
                }}
                initialSlide={0}
                className="flex justify-center mySwiper">
                {jobLists?.map((data:any, index:number) => (
                    <SwiperSlide
                        key={index}
                        className="max-w-[95%] md:max-w-[580px] mr-4 md:mr-6">
                         <Card jobData={data} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default PopularJobList
