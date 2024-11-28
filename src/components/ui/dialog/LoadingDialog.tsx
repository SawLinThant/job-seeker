import { Dialog } from '@mui/material'
import React from 'react'
import Loading from '../loading/Loading'

const LoadingDialog:React.FC<{isLoading:boolean}> = ({isLoading}) => {
  return (

   <>
   
   {
    isLoading &&  <div className='fixed top-0 right-0 w-screen  h-screen flex justify-center items-center bg-[#000]/50 pointer-events-none z-[100000]'>
     <div className='w-[120px] h-[80px] flex justify-center items-center rounded-lg bg-white '>

        <Loading color='#197CC0'/>
     </div>



    </div>
   }
   </>
  )
}

export default LoadingDialog