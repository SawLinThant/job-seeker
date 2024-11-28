import BlurDialog from '@/components/ui/dialog/BlurDialog';
import Text from '@/components/ui/typo';
import { cn } from '@/lib/utils';
import { useGetNotifications } from '@/services/notificationService';
import { Box } from '@mui/material';
import React from 'react';
import { FiMoreVertical, FiX } from 'react-icons/fi';
import { MdOutlineSettings } from 'react-icons/md';

function NotificationsBlurModal({
  openNotification,
  notiType,
  setNotiType,
  setOpenNotification,
}: any) {
  const { data } = useGetNotifications();
  //console.log("Data",data)
  return (
    <BlurDialog open={openNotification} setOpen={() => {}}>
      <Box className="w-[30%] py-5 bg-white fixed right-0 top-0 h-screen rounded-tl-lg rounded-bl-lg	overflow-y-auto ">
        <Box className="flex justify-between items-center  px-2">
          <Box className="flex justify-start items-center">
            <Box className="flex justify-center items-center gap-2">
              <MdOutlineSettings />
              <Text className="font-bold">Notifications</Text>
            </Box>
            <Box className="flex items-center gap-2 ml-5">
              {['All', 'Unread'].map((_) => (
                <Box
                  className={cn(
                    'bg-gray-100 px-2 rounded-full  text-black',
                    _ === notiType && 'bg-primary text-white'
                  )}
                  key={_}
                  onClick={() => {
                    setNotiType(_);
                  }}
                >
                  {_}
                </Box>
              ))}
            </Box>
          </Box>
          <FiX
            className="cursor-pointer"
            onClick={() => {
              setOpenNotification(false);
            }}
          />
        </Box>
        <Text className="font-bold !my-5 !ml-2">New</Text>

        <Box>
          {['1', '2', '3', '4', '5'].map((_) => (
            <Box
              className={cn(
                'flex p-2 justify-between items-center mb-5 bg-blue-50',
                ['2', '4'].includes(_.toString()) && 'bg-white'
              )}
              key={_}
            >
              <Box className="w-full flex gap-x-3  items-center ">
                {['2', '4'].includes(_.toString()) ? (
                  <Box className="w-2 h-2 bg-transparent rounded-full "></Box>
                ) : (
                  <Box className="w-2 h-2 bg-primary rounded-full "></Box>
                )}

                <Box className="flex items-center">
                  <Box className="w-[30px] h-[30px] rounded-full bg-gray-500 flex justify-center items-center text-white">
                    Z
                  </Box>
                  <Box className="ml-2">
                    <Text className="!text-sm font-bold">Hiring Process Initiation </Text>
                    <Text className="!text-sm">Job ID #TK-001122022</Text>
                  </Box>
                </Box>
              </Box>
              <FiMoreVertical />
            </Box>
          ))}
        </Box>
      </Box>
    </BlurDialog>
  );
}

export default NotificationsBlurModal;
