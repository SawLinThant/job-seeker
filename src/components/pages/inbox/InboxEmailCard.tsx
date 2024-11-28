import Text from '@/components/ui/typo';
import { Box, Stack } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { useSetAtom } from 'jotai';
import { selecedInboxAtom } from './Inbox';
import { formatDate } from '@/utils';
import { emailProps, usePutFavourite } from '@/services/inbox';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import { Icons } from '@/components/ui/icons';
import { SWRInfiniteResponse } from 'swr/infinite';

export const InboxEmailCard = ({
  sent_at,
  cc,
  sender,
  student_id,
  description,
  subject,
  id,
  is_favorite,
  image,
  mutate,
}: emailProps & {
  mutate: SWRInfiniteResponse['mutate'];
}) => {
  const setInbox = useSetAtom(selecedInboxAtom);
  const { trigger } = usePutFavourite(id);
  const { showMessage } = useSnackbar();

  const handleFavouriteTrigger = async (): Promise<void> => {
    await trigger().then((resp) => {
      showMessage({
        severity: SEVERITY.SUCCESS,
        message: resp.data.data.message,
      });
      mutate();
    });
  };

  const addDetail = () => setInbox(id);
  return (
    <Box
      component="div"
      onClick={addDetail}
      className="flex min-w-[320px] cursor-pointer  p-2 shadow border rounded-lg even:bg-gray_100"
    >
      <Box className="center h-6">
        <button onClick={handleFavouriteTrigger} className="size-6">
          {is_favorite ? <Icons.star className="text-yellow-600" /> : <Icons.star_outline />}
        </button>
      </Box>
      {/* <Box className="center h-6">
        <Box className="size-4 rounded bg-white border"></Box>
      </Box> */}

      <Box className="w-full flex items-start gap-1">

        {
image?.path? <Image
          src={image?.path}
          alt="emailStar"
          width={60}
          height={60}
          className="w-8 h-8 object-cover aspect-square rounded-full"
        /> : <Box className="w-[30px] h-[30px] bg-gray-400 rounded-full flex justify-center items-center border aspect-square">{sender?.[0]}</Box>
        }
       
        <Box className="w-full">
          <Box className="flex w-full items-center justify-between">
            <Text variant="h6">{subject}</Text>
            <Text className="!text-sm">{formatDate(sent_at, 'hh:mm A')}</Text>
          </Box>
          <Box>
            <Text className='!text-sm'>{sender}</Text>
            <Text  className='!text-sm'>cc: {cc}</Text>
          </Box>
          <Text className='!text-sm'>Related Student ID : #{student_id}</Text>
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
