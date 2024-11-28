import React from 'react';
import Text from '@/components/ui/typo';
import { Box } from '@mui/material';
import ComposeBox from './ComposeBox';

const InboxHeader = ({ totalMessage }: { totalMessage: number }) => {
  return (
    <Box className="flex justify-between items-start px-5">
      <Box>
        <Text className="text-gray_700">Inbox</Text>
        <Text className="text-xs text-gray_700">{totalMessage} messages</Text>
      </Box>
      <ComposeBox />
    </Box>
  );
};

export default InboxHeader;
