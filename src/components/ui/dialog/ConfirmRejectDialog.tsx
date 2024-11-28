import React from 'react'
import BlurDialog from './BlurDialog';
import { FiX } from 'react-icons/fi';
import Text from '../typo';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { Box } from '@mui/material';
import Loading from '../loading/Loading';

const ConfirmRejectDialog:React.FC<{
    isToggle:boolean;
    toggleModal?:any;
    imageUrl:string;
    title:string;
    desc:string;
    confirmFun:any;
    reject?:boolean;
    confirmText:string;
    isMutatingLoading?:boolean;
}> = ({toggleModal,isToggle,imageUrl,title,desc,confirmFun,reject,confirmText,isMutatingLoading}) => {
  return (
       <BlurDialog open={isToggle} setOpen={() => {}}>
        <div className="relative px-3 py-6">
          <FiX
            className="absolute cursor-pointer text-gray_500 right-3"
            onClick={toggleModal}
          />
<Box className="flex items-start">


          <Image src={imageUrl} width={50} height={50} alt={imageUrl} />

         <Box className="mt-1">

             <Text className="!text-black text-sm">{title}</Text>
          <Text className="!text-gray-700 !text-xs">
            {desc}
          </Text>
         </Box>
</Box>

          <div className="flex gap-x-5 mt-6 pt-6 border-t border-gray-200">
            {['Cancel', confirmText].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex justify-center items-center w-full py-2 border rounded-md cursor-pointer',
                  i === 1 && 'bg-primary text-white border-none',reject && i===1 && "bg-red-500 text-white"
                )}
                onClick={() => {
                  if (i === 0) {
                 toggleModal()
                  } else {
                confirmFun()
                  }
                }}
              >
                <Text
                  className={cn('!text-gray_600 !text-sm !font-bold', i === 1 && '!text-white')}
                >
                  { (i===1 && isMutatingLoading) ? <Loading/>: _}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </BlurDialog>
  )
}

export default ConfirmRejectDialog