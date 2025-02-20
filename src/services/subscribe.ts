import appAxios from "@/lib/axios";
import useSWRMutation from "swr/mutation";

export const useMutateSubscribe = () => {
    return useSWRMutation(
      `/subscriber-store`, 
      async (url, { arg }: { arg: { email: string } }) => {
        return appAxios.post(url, { email: arg.email });
      }
    );
  };