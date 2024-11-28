'use client';
import React from 'react';
import Text from '@/components/ui/typo';
import { Stack } from '@mui/material';
import { Icons } from '@/components/ui/images/Icons';
import Card from '@/components/card';

const NotSelectedInbox = () => {
  return (
    <Card className="bg-transparent shadow-none">
      <Stack justifyContent="center" alignItems="center" px={8} rowGap={2}>
        <div className="bg-[#F9FAFB] w-12 h-12 p-0.5 rounded-full center">
          <div className="bg-gray_100 w-[80%] h-[80%] rounded-full center">
            <Icons.warning className="font-bold text-gray_600 text-2xl" />
          </div>
        </div>
        <Text className="text-center font-medium">No Inbox Selected</Text>
        {/* <Text className="text-md text-gray_600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut aliquam a sed sit modi magni
          alias numquam, voluptatem dicta voluptatum!
        </Text> */}
      </Stack>
    </Card>
  );
};

export default NotSelectedInbox;
