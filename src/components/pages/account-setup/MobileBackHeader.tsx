import { showSidebarAtom } from '@/components/atoms/atoms'
import { Box } from '@mui/material'
import { useAtom } from 'jotai'
import Image from 'next/image'
import React from 'react'

const MobileBackHeader:React.FC<{title:string}> = ({title}) => {

    const [showSideBar,setShowSideBar]=useAtom(showSidebarAtom)
  return (
     <Box className="flex items-center justify-start gap-5 pb-4 lg:justify-center p-5 md:hidden ">
              <Image alt="personal info" src="/images/arrow-left-blue.svg" className='lg:hidden'  width={18} height={18} onClick={()=>{
                setShowSideBar(!showSideBar)
              }} />
            <h1 className="text-[#1D2939] font-medium text-lg leading-7 lg:font-semibold lg:text-xl lg:leading-8 lg:text-center">
            {title}
            </h1>
          </Box>
  )
}

export default MobileBackHeader