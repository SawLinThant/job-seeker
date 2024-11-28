'use client';
import { useQueryString } from '@/hooks/useQueryString';
import { cn } from '@/utils/cn';
import { Box } from '@mui/material';
import React from 'react';
import { Search } from 'lucide-react';
import { atom, useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

const menuInbox = [
  {
    label: 'inbox',
    quantity: 0,
  },
  {
    label: 'un-read',
    quantity: 0,
  },
   {
    label: 'read',
    quantity: 0,
  },
  {
    label: 'starred',
    quantity: 0,
  },
  {
    label: 'send',
    quantity: 0,
  },
 
];

const TAB_BTNATO = atom<{ label: string; quantity: number }[]>(menuInbox);
const TabGroup = ({
  inbox,
  unRead,
  starred,
  read,
  send,
  searchText,
setSearchText
}: {
  inbox: number;
  unRead: number;
  starred: number;
  read: number;
  send: number;
  searchText: string;
  setSearchText:any
}) => {
  const { updateQueryString, searchParams } = useQueryString();
  const tabbtn = useAtomValue(TAB_BTNATO);
  const router =useRouter()
  return (
    <Box className="px-5">
      <Box className="flex items-center border border-gray-200 py-2 px-2 rounded-md mt-4">
        <input
          type="text"
          name=""
          value={searchText}
          className="w-full text-sm outline-none focus:outline-none"
          placeholder="Search"
          onChange={(e:any)=>{
            setSearchText(e.target.value)
          }}
        />
        <Search className="w-4 h-4" />
      </Box>
      <Box className="grid grid-cols-4 gap-1 mt-5">
        {tabbtn.map((_d, i) => (
          <Button
            key={i}
            className={cn(
              'w-fit h-fit !flex !items-center capitalize bg-transparent hover:bg-blue-50 text-sm gap-1 text-nowrap ',
              searchParams.get('studentlist') === _d.label.toLowerCase()
                ? 'bg-blue-50 text-primary'
                : 'text-gray_500',
              !searchParams.get('studentlist') && _d.label === 'all' && 'bg-blue-50'
            )}
            onClick={() => {

                if(_d.label.toLowerCase() ==="inbox"){
router.push("/inbox")
                }else{
                    updateQueryString('studentlist',_d.label === "un-read"? "unread":_d.label.toLowerCase());
                }
              
            }}
          >
            <p>{_d.label}</p>
            
            <p
              className={cn(
                'rounded-lg center text-sm  bg-blue-50 drop-shadow-sm',
                searchParams.get('studentlist') === _d.label.toLowerCase()
                  ? 'text-primary bg-blue-50'
                  : 'bg-grey-100'
              )}
            >
              {_d.label === 'inbox' && inbox}
              {_d.label === 'starred' && starred}
              {_d.label === 'read' &&   read}
              {_d.label === 'un-read' && unRead}
              {_d.label === 'send' && send}
            </p>
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default TabGroup;
