'use client';
import { Box, Stack } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import Text from '@/components/ui/typo';
import Input from '@/components/ui/inputs/Input';
import { Icons } from '@/components/ui/images/Icons';
import { Icons as RIcon } from '@/components/ui/icons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useDeleteInbox, useGetInbox, useGetInboxLists, usePutBindPaperWork } from '@/services/inbox';
import { formatDate } from '@/utils';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';
import { mutate } from 'swr';
import { useSetAtom } from 'jotai';
import { selecedInboxAtom } from './Inbox';
import { useQueryString } from '@/hooks/useQueryString';
import MailIcon from '@mui/icons-material/Mail';
import Dialog from '@/components/ui/dialog';
import { cn } from '@/utils/cn';

const InboxSelected = ({ id }: { id: string }) => {

    const [show,setShow]=useState(false)

    const toggle=()=> setShow(!show);
  const [paperWorkId, setPaperWorkId] = React.useState<string | null>(null);
  const selectedEmail = useSetAtom(selecedInboxAtom);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const { data, isLoading, error } = useGetInbox(id);
  const { trigger } = usePutBindPaperWork(id);
  const { trigger: deleteTrigger } = useDeleteInbox(id);
  const { showMessage } = useSnackbar();
      const { updateQueryString, searchParams } = useQueryString();

   const {  mutate } = useGetInboxLists("",searchParams.get("studentlist") || "");

  const handleBindPaperWork = async () => {
    if (paperWorkId) {
      await trigger(
        {
          paper_work_id: paperWorkId,
        },
        {
          onSuccess: () => {
            showMessage({
              message: 'Paper Workd has been binded',
              severity: SEVERITY.SUCCESS,
            });
            const input = inputRef.current!;
            if (input) input.value = '';
          },
        }
      );
    }
  };

  const handleDelete = async (): Promise<void> => {
    await deleteTrigger().then(() => {
      showMessage({
        message: 'Inbox has been deleted',
        severity: SEVERITY.SUCCESS,
      });
      selectedEmail(null);
      mutate();
      toggle()
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaperWorkId(e.target.value);
  };

  if (isLoading) {
    return (
      <></>
    );
  }

  console.log("data?.data",data?.data)
  return (
    <Stack gap={2} className="w-full min-h-screen p-6">
      <Button
        onClick={toggle}
        className="w-fit h-fit bg-transparent block ml-auto text-2xl hover:bg-transparent"
      >
        <RIcon.trash />
      </Button>

      <Box className="w-full bg-blue-50 p-3 flex items-start gap-1">

        {
            data?.data?.image?.path ? <Image
          src={data?.data?.image?.path}
          alt="emailStar"
          width={80}
          height={80}
          className="size-9 aspect-square mr-2 object-cover  rounded-full"
        />:<Box className="w-[80px] h-[80px] bg-gray-400 rounded-full flex justify-center items-center border aspect-square">{data?.data?.sender?.[0]}</Box>
        }
        
        
        <Stack gap={0.5} flexGrow={1}>
          <Box className="flex justify-between">
            <Text variant="h6" className="!text-md">
              {data?.data?.sender}
            </Text>
            <Text className="!text-md">{formatDate(data?.data?.sent_at, 'hh:mm A')}</Text>
          </Box>
          <Box className="flex gap-8">
            <Text  className="!text-md">To: {data?.data?.to}</Text>
            <Text  className="!text-md">cc: {data?.data?.cc}</Text>
          </Box>
        </Stack>
      </Box>

      <Text variant="h6" className="text-gray_700">
        {data?.data.subject}
      </Text>

      <div
        dangerouslySetInnerHTML={{
          __html: data?.data.description,
        }}
      />
      {data?.data.image && (
        <Text className="text-purple flex gap-2 items-center">
          <RIcon.attachement />
          {data?.data.image.title}
        </Text>
      )}

      <Box className="w-full bg-grey-100 rounded-lg p-3 flex items-start gap-1">
       
        {
            data?.data?.image?.path ? <Image
          src={data?.data?.image?.path}
          alt="emailStar"
          width={80}
          height={80}
          className="size-9 aspect-square object-cover  rounded-full"
        />:<Box className="w-[80px] h-[80px] bg-gray-400 rounded-full flex justify-center items-center border aspect-square">{data?.data?.sender?.[0]}</Box>
        }
        {/* <Image
          src="/images/inboxProfile.svg"
          alt="emailStar"
          width={80}
          height={80}
          className="size-9"
        /> */}
        <Stack gap={0.5} flexGrow={1} ml={2}>
          <Text>Related Student</Text>
          <Text>
            <span className="font-semibold"> {data?.data?.student_name}</span>
            <span className="text-primary ml-2">#{data?.data?.student_id}</span>
          </Text>
        </Stack>
      </Box>

      <Stack direction="row" alignItems="center" gap={2}>
        <Input
          containerClassName="bg-white rounded-lg overflow-hidden"
          name="search"
          className="bg-transparent"
          placeholder="Enter Paper ID"
          onChange={handleChange}
          ref={inputRef}
        />
        <Button
          onClick={handleBindPaperWork}
          className="normal-case center gap-2 text-sm bg-primary h-9 px-4 rounded-lg text-white block"
        >
          <Icons.attachement className="text-2xl" />
          Bind
        </Button>
      </Stack>

      <Stack direction="row" alignItems="center" gap={4}>
        <Button className="normal-case center gap-2 text-sm bg-white h-9 px-4 rounded-lg text-black border-gray_600 drop-shadow hover:text-white">
          {/* <Icons.undo className="text-2xl" /> */}
          Forward
        </Button>
        <Button className="normal-case center gap-2 text-sm bg-primary h-9 px-4 rounded-lg text-white block">
          {/* <Icons.redo className="text-2xl" /> */}
          Reply
        </Button>
      </Stack>

         <Dialog open={show} setOpen={toggle}>
        <Stack direction="row" gap={2}>
          <div className={cn('rounded-full p-2 bg-yellow-50/45')}>
            <div
              className={cn(
                'rounded-full p-2 bg-yellow-50 text-red'
              )}
            >
                <Icons.warning className="text-2xl" />
            </div>
          </div>
          <Stack direction="row" alignItems="start" gap={2}>
            <Box>
              <Text fontWeight={500} className="text-red">
                Would you like to
                remove this
                Mail?
              </Text>
              <Text>
               You can delete the mail.
              </Text>
            </Box>

            <button onClick={toggle} className="text-2xl hover:bg-gray-300/40 rounded-full p-1">
              <Icons.times />
            </button>
          </Stack>
        </Stack>

        <Stack justifyContent="center" className="text-center capitalize" my={2} gap={1}>
        
        </Stack>

        <Stack direction="row" gap={2} justifyContent="space-between">
          <Button onClick={toggle} variant="outline" className="w-1/2">
            Cancel
          </Button>

          <Button onClick={handleDelete} className="w-1/2 bg-red text-white">
              Delete
            </Button>
        </Stack>
      </Dialog>
    </Stack>
  );
};

export default InboxSelected;
