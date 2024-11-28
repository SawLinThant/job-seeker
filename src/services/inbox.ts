import appAxios from '@/lib/axios';
import useSWR, { SWRResponse } from 'swr';
import useSWRMutation from 'swr/mutation';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@/lib/fetcher';

export type emailProps = {
  id: string;
  subject: string;
  to: string;
  cc: string;
  sender: string;
  bcc: string;
  student_id: string;
  sent_at: string;
  description: string;
  is_favorite: boolean;
  image?:{
    path?:string;
  };
};

export const useGetInboxLists = (search:string,type:string) => {
  return useSWRInfinite<{
    data: emailProps[];
    total: number;
    inbox: number;
    draft: number;
    starred: number;
    read:number;
send:number;
un_read:number;
  }>(
    (index) => `/student/inbox-list?tab=${type}&&search=${search}&&page=${index + 1}&limit=10`,
    (url) => fetcher(url)
  );
};
export const useSentInbox = () => {
  return useSWRMutation(
    '/student/send-inbox',
    (
      url,
      {
        arg,
      }: {
        arg: {
          to: string;
          cc: string;
          bcc: string;
          subject: string;
          student_id: string;
          description: string;
          paper_work_id: string;
          file_id: string[];
        };
      }
    ) => appAxios.post(url, { ...arg })
  );
};

export const useGetUserLists = () => useSWR(`/student/user-list`);
export const useGetOwnerLists = () => useSWR(`/student/owner-list`);
export const useGetStudentsLists = () => useSWR(`/student/student-list`);
export const useGetNotiLists = () => useSWR(`/admin/notification`);

export const useGetInbox = (id: string | null) => useSWR(id && `/student/inbox/${id}`);

export const useFileUploadMutation = () =>
  useSWRMutation(
    '/file-upload',
    (
      url,
      {
        arg: { file },
      }: {
        arg: {
          file: any;
        };
      }
    ) => {
      return appAxios.post(
        url,
        {
          file,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    }
  );

export const usePutFavourite = (id: string) =>
  useSWRMutation(`/student/star-inbox/${id}`, (url) => appAxios.put(url));

export const useDeleteInbox = (id: string) =>
  useSWRMutation(`/student/delete-inbox/${id}`, (url) => appAxios.delete(url));

export const usePutBindPaperWork = (id: string | null) =>
  useSWRMutation(
    `/student/inbox-bind-paper-work/${id}`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          paper_work_id: string;
        };
      }
    ) => appAxios.put(url, arg)
  );
