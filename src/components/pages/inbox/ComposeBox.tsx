import { Box, Stack } from '@mui/material';
import Dialog from '@/components/ui/dialog';
import { Icons, Icons as RIcons } from '@/components/ui/images/Icons';
import Image from 'next/image';
import Text from '@/components/ui/typo';
import Input from '@/components/ui/inputs/Input';
import React, { ChangeEvent, ReactHTMLElement, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormField } from '@/components/ui/form';
import TextEditor from './TextEditor';

import Select from './RSelect';
import { OptionProps } from 'react-select';
import { SEVERITY, useSnackbar } from '@/components/ui/snackbar/SnackbarContext';

import { FiX } from 'react-icons/fi';
import Loading from '@/components/ui/loading/Loading';
import { ToggleReturnType, useToggle } from '@/hooks/useToggle';
import { useFileUploadMutation, useGetInboxLists, useGetOwnerLists, useGetStudentsLists, useGetUserLists, useSentInbox } from '@/services/inbox';
import { useQueryString } from '@/hooks/useQueryString';
import { fileUploadFun } from '@/services/authService';
import { Button } from '@/components/ui/button';

import { Icons as RRIcons } from '@/components/ui/icons';
import useGetStudentId from '@/hooks/useGetStudentData';

const ComposeBox = () => {

    const {studentId}=useGetStudentId()

    
    const [openImagePreview,setOpenImagePreview]=useState(false);

    const toggleImagePreview=()=>setOpenImagePreview(!openImagePreview);
  const [show, { toggle, handleClose, handleOpen }] = useToggle(false) as ToggleReturnType;
  const [value, setValue] = React.useState<string>('');
  const [options, setOptions] = React.useState<Array<OptionProps['options']>>([]);
  const [studentOptions, setstudetnOptions] = React.useState<Array<OptionProps['options']>>([]);
  const [file, setFile] = React.useState<File | null>(null);
  const [imageMultipleA,setImageMultipleA]=useState<any>();

  const form = useForm();
  const { formState } = form;
  const { data, error, trigger } = useFileUploadMutation();
  const { trigger: sendEmailTrigger, reset,isMutating } = useSentInbox();
  const { data: userLists, isLoading } = useGetOwnerLists()
  console.log("userLists",userLists)
//   const { data: studentLists } = useGetStudentsLists();
  const { showMessage } = useSnackbar();
    const { updateQueryString, searchParams } = useQueryString();

   const {  mutate } = useGetInboxLists("",searchParams.get("studentlist") || "");
  const handleSubmit: SubmitHandler<any> = async (e) => {
    if (imageMultipleA?.length > 0) {

        const fileIds=imageMultipleA?.map((_:any)=>_?.id)

        
        await sendEmailTrigger(
              {
                to: e.to.value,
                cc: e.to.value,
                bcc: e.to.value,
                subject: e.subject,
                student_id: studentId || '',
                description: value,
                paper_work_id: '',
                file_id: fileIds,
              },
              {
                onSuccess: () => {
                  showMessage({
                    message: 'Email sent Successfully',
                    severity: SEVERITY.SUCCESS,
                  });

                  setImageMultipleA([])
                  handleClose();
                  reset();
                  form.reset()
                  mutate()
                  setValue("")
                },
              }
            );
    } else {
      await sendEmailTrigger(
        {
          to: e.to.value,
          cc: e.to.value,
          bcc: e.to.value,
          subject: e.subject,
          student_id: studentId||"",
          description: value,
          paper_work_id: '',
          file_id: [],
        },
        {
          onSuccess: () => {
            showMessage({
              message: 'Email sent Successfully',
              severity: SEVERITY.SUCCESS,
            });
            handleClose();
            reset();
                              form.reset()

                              mutate()

          },
        }
      );
    }
  };

  const handleChangeFile = async(e: any) =>{


//     if( e?.target?.files ){


//                   const formData = new FormData();

//                             formData.append('file',e?.target?.files?.[0] as unknown as Blob);

//           let res = await fileUploadFun(formData);


// // setFile(e.target.files[0])
//     }

if(e?.target?.files){
  try {
      const multipleA = await Promise.all(
       [...e.target.files].map(async (_: any) => {
          const formData = new FormData();

          formData.append('file', _);
          

          let res = await fileUploadFun(formData);


          return {
            id: res?.data?.data?.id,
            title: res?.data?.data?.title,
            path: res?.data?.data?.path,
            size: res?.data?.data?.size,
            file_format: res?.data?.data?.file_format,
            created_at: res?.data?.data?.created_at,
            updated_at: res?.data?.data?.updated_at,
          };
        })
      );



      setImageMultipleA(multipleA)
    } catch (error) {

      // Only runs when there is an error/exception
    } finally {
    }

}




  }

  React.useMemo(() => {
    if (userLists && userLists.data) {
      setOptions(
        userLists.data.map((list: { id: string; name: string }) => ({
          label: list.name,
          value: list.id,
        }))
      );
    }
  }, [userLists, isLoading]);

//   React.useMemo(() => {
//     if (studentLists && studentLists.data) {
//       setstudetnOptions(
//         studentLists.data.map((list: { id: string; name: string }) => ({
//           label: list.name,
//           value: list.id,
//         }))
//       );
//     }
//   }, [studentLists]);

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center bg-primary text-white font-semibold text-sm center gap-2 rounded-lg px-2 py-2"
      >
        <Image
          src="/images/mail-white.svg"
          alt="/images/mail-white.svg"
          width={0}
          height={0}
          className="w-4 h-4"
        />
        Compose
      </button>
      <Dialog
        open={show}
        setOpen={toggle}
        fullWidth
        maxWidth="lg"
        sx={{
          '&.MuiDialog-paper': {
            backgroundColor: 'red',
          },
        }}
      >
        <Stack gap={2} className='px-10'>
          <button className="ml-auto" onClick={handleClose}>
            <RIcons.times />
          </button>
          <Text>Compose a message</Text>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <Stack gap={2}>
                <FormField
                  name="to"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => <Select placeholder="To" options={options} {...field} />}
                />

                <FormField
                  name="cc"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => <Select placeholder="CC" options={options} {...field} />}
                />

                <FormField
                  name="bcc"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => <Select options={options} {...field} />}
                />

                <FormField
                  name="subject"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input
                      containerClassName="bg-white rounded-lg overflow-hidden drop-shadow"
                      className="bg-transparent"
                      placeholder="subject"
                      {...field}
                    />
                  )}
                />

                {/* <FormField
                  name="student_id"
                  control={form.control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select placeholder="Student" options={studentOptions} {...field} />
                  )}
                /> */}

                <TextEditor value={value} setValue={setValue} />

                <label
                  htmlFor="attach_file"
                  
                  className="w-fit cursor-pointer ml-auto text-primary flex gap-1 font-semibold items-center"
                >
                  <Icons.attachement />
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="attach_file"
                    value=""
                    onChange={handleChangeFile}
                  />
                  Attach File
                </label>

                <Box className="flex flex-wrap gap-x-5 my-3">

                    {
                        imageMultipleA?.map((_t:any,i:number)=>(
                           <Box key={i} className="relative">
                             <p onClick={toggleImagePreview}  className="hover:underline text-primary cursor-pointer">{
                                _t?.title
                            }</p>

                            <Dialog open={openImagePreview} setOpen={()=>{}}>

                                <Box className="relative">

                                    <FiX className="text-primary absolute -top-7 -right-4 cursor-pointer text-lg" onClick={toggleImagePreview}/>

                                    <Image src={_t?.path} alt={_t?.path} width={400} height={400} className='my-5' />

                                </Box>

                            </Dialog>
                            <FiX className='absolute -top-2 -right-2 text-red-500 cursor-pointer' onClick={()=>{

                                const filerA=imageMultipleA?.filter((_:any)=> (
                                    _?.id !==_t?.id

                                ))

                                setImageMultipleA(filerA)
                            }}/>
                           </Box>
                        ))
                    }
                </Box>


               

                <Stack
                  direction="row"
                  sx={{
                    width: 'fit-content',
                    marginLeft: 'auto',
                  }}
                  gap={2}
                  justifyContent="space-between"
                >
                  <Button type="button" onClick={handleClose} variant="outline" className="w-1/2">
                    Cancel
                  </Button>

                  <Button  disabled={isMutating} type="submit" className="w-1/2 gap-2 text-white">

                  {
                    isMutating ?<Loading /> :<> <RRIcons.save />
                    Send</>
                  }
                   
                  </Button>
                </Stack>


              </Stack>
            </form>
          </Form>
        </Stack>
      </Dialog>
    </>
  );
};



export default ComposeBox;
