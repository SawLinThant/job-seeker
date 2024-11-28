import Facebook from '@/components/icons/facebook'
import Instgram from '@/components/icons/instgram'
import JplusLogo from '@/components/icons/JplusLogo'
import Line from '@/components/icons/Line'
import TwitterIcon from '@/components/icons/TwitterIcon'

import React from 'react'
import { useTranslation } from 'react-i18next'

const DetailFooter = () => {
    const {t}=useTranslation()
  return (
    <div className='md:max-w-[1150px] lg:container px-3 pt-4 mx-auto'>
    <div className='grid grid-cols-3 lg:grid-cols-5 gap-4'>
       <div className="flex flex-col items-center ">
           <JplusLogo/>
           <p className="text-xl font-bold text-primary mt-5">JPlus</p>
           <p className='text-sm mt-2'>て（両方従でする</p>
       </div>
       <div>
         <p className="font-semibold text-base mb-5"> {
                t("resources_lbl")
              }</p>
          <p className="mb-4 text-sm">で対象、フ</p>
          <p className="mb-4 text-sm">します性。</p>
          <p className="mb-4 text-sm">しの名追加ま。</p>
          <p className='mb-4 text-sm'>が場合ユーザ。</p>
       </div>
       <div>
       <p className="font-semibold text-base mb-5">{t("company_lbl")}</p>
          <p className="mb-4 text-sm">で対象、フ</p>
          <p className="mb-4 text-sm">します性。</p>
          <p className="mb-4 text-sm">しの名追加ま。</p>
          <p className='mb-4 text-sm'>が場合ユーザ。</p>
       </div>
       <div>
       <p className="font-semibold text-base mb-5">{t("quick_links_lbl")}</p>
          <p className="mb-4 text-sm">で対象、フ</p>
          <p className="mb-4 text-sm">します性。</p>
          <p className="mb-4 text-sm">しの名追加ま。</p>
          <p className='mb-4 text-sm'>が場合ユーザ。</p>
       </div>
       <div>
          <p className='font-semibold text-base mb-5'>{t("follow_us_on_lbl")}</p>
         <div className='flex items-center gap-2'>
             <Line/>
             <Facebook/>
             <Instgram/>
             <TwitterIcon/>
         </div>
       </div>
    </div>
</div>
  )
}

export default DetailFooter
