import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa";
import { cn } from '@/utils/cn';

function AdviseJplus() {
    const {t}=useTranslation()
  return (
    <div className="w-full bg-blue-100 py-10">
          <div className="mb-5">
            <p className="text-center text-3xl text-primary font-bold">{t("job_opportunities_advice_lbl")}</p>
            <p className="text-md text-text-700 text-center mt-2">{t("job_opportunities_advice_desc_lbl")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-[80%] mx-auto mt-10">

            {
                ["advice_1.webp","advice_2.webp","advice_3.webp","advice_4.webp","advice_5.webp","advice_6.webp"].map((_,i)=>(<div key={_} className="p-5 bg-white rounded-xl hover:-translate-y-[20px]">

                    <div className={cn("bg-no-repeat bg-center bg-cover w-full h-[200px] rounded-xl ")} style={{ 

                        backgroundImage:`url("/images/webp/${_}")`
                     }}>

                    </div>
                    <div>
                        <p className="text-text-950 my-2">
                            Resume or cover letter tips for better opprtunity
                        </p>
                        <p className="text-text-700 mb-5">
                            者明示にがにする）本文をようを、指す短歌実践記事の号可能許諾 SA 妨げる指摘日も公開」改変さ[をならます、、従うにおけるますする
                        </p>

                        <div className="w-[180px] h-[30px] justify-center bg-primary rounded-lg flex items-center gap-x-5">
                            <p className="text-white">{t("read_more_lbl")}</p>

                            <FaArrowRight className="text-white text-md" />
                        </div>

                    </div>


                </div>))
            }
        </div>

    </div>
  )
}

export default AdviseJplus