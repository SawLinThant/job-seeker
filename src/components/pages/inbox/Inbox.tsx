'use client';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { InboxEmailCard } from './InboxEmailCard';
import TabGroup from './TabGroup';
import InboxHeader from './InboxHeader';
import InboxSelected from './InboxSelected';
import { atom, useAtom } from 'jotai';
import { useInView } from 'react-intersection-observer';
import NotSelectedInbox from './NotSelected';
import { cn } from '@/utils/cn';
import { Button } from '@/components/ui/button';
import { useQueryString } from '@/hooks/useQueryString';
import { emailProps, useGetInboxLists, useGetNotiLists } from '@/services/inbox';

export const selecedInboxAtom = atom<string | null>(null);

const PAGE_SIZE = 10;
const Inbox = () => {

    const {data:notiLists} =useGetNotiLists();
    console.log("notiLists",notiLists)
    const [searchText,setSearchText]=useState("")
      const { updateQueryString, searchParams } = useQueryString();

  const { ref: fetchRef, inView, entry } = useInView();
  const { data, isLoading, isValidating, setSize, mutate } = useGetInboxLists(searchText,searchParams.get("studentlist") || "");
  const [selectedEmail, setSelectedEmail] = useAtom(selecedInboxAtom);

  React.useMemo(() => {
    if (inView && !isValidating) {
      setSize((prev:any) => prev + 1);
    }
  }, [inView, isValidating]);
  const issues = data ? data.flatMap((item:any) => item.data) : [];
  const isReachingEnd = data && data[data.length - 1].data?.length < PAGE_SIZE;

  return (
    <Stack direction="row">
      <Box className="w-full lg:w-[35%] min-h-screen pt-5 px-2 border-r bg-white border-gray-200">
        <InboxHeader totalMessage={issues?.length} />
        <TabGroup
        searchText={searchText}
        setSearchText={setSearchText}
          inbox={data?.[0]?.inbox || 0}
          read={data?.[0]?.read || 0}
          send={data?.[0]?.send || 0}
          unRead={data?.[0]?.un_read || 0}
          starred={data?.[0]?.starred || 0}
        />
        {data && issues?.length>0 ? (
          <>
            <Stack mt={2} gap={2} className="h-[70vh] w-full py-2 overflow-y-scroll pr-2 ">
              {issues.map((mail: emailProps) => (
                <InboxEmailCard key={mail.id} {...mail} mutate={mutate} />
              ))}
              <div ref={fetchRef} className={cn(isReachingEnd ? 'hidden' : 'block')} />
              <div
                className={cn(
                  'justify-center items-center mt-4',
                  isReachingEnd ? 'hidden' : 'flex'
                )}
              >
                <div className="size-6 bg-primary rounded-full animate-ping" />
              </div>
            </Stack>
          </>
        ) : (

            <div>
            {
                typeof data !=="undefined" ? <p className="text-center mt-10">No email</p>:<div></div>
            }
            </div>
          
        )}
      </Box>
      <Box
        className={cn(
          'w-[65%]  lg:relative h-screens z-50 flex justify-center items-center absolute lg:bg-transparent bg-black/35  duration-100 ease-in',
          selectedEmail && 'translate-x-0 bg-white'
        )}
      >
        {selectedEmail ? (
          <div className="w-full center flex-col">
            <Button
              onClick={() => setSelectedEmail(null)}
              className=" text-white mt-20  lg:hidden ml-auto"
            >
              Close Inbox
            </Button>
            <InboxSelected id={selectedEmail} />
          </div>
        ) : (
          <Box justifyContent="center" alignItems="center" className="w-full px-4">
           <NotSelectedInbox/>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Inbox;
