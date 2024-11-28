import appAxios from '@/lib/axios';
import { Post } from '@/types/posts';
import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation from 'swr/mutation';
export const useGetNotifications = () => useSWR(`/student/notification`);
