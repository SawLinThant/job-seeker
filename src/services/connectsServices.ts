import appAxios from '@/lib/axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
export const useGetConversationList = () => {
  return useSWR(`/student/conversation-list`);
};
export const useGetConversationById = (id: string) => {
  return useSWR(`/student/message/${id}`);
};

export const useMutateSendMessage = () => {
  return useSWRMutation(
    `/student/message`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          message?: string;
          conversation_id?: string;
        };
      }
    ) => {
      return appAxios.post(`${url}`, arg);
    }
  );
};
