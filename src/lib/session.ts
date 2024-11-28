'use client';

import axios from 'axios';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { SessionData, defaultSession } from './session-options';
import { Student } from '@/types/auth';

export const useLoginUser = () => {
  const { ...rest } = useSWR<SessionData>(
    '/api/session',
    (url: string) => axios.get(url).then((res) => res.data),
    {
      fallbackData: defaultSession,
    }
  );
  return {
    user: rest?.data?.student,
    isLoggedIn: rest?.data?.isLoggedIn,
    tokenExpired: rest?.data?.tokenExpired,
    token: rest?.data?.token,
    ...rest,
  };
};

type PartialAuth = Partial<Student>;
type SessionLoginArgType = {
  arg: PartialAuth & { token?: string; tokenExpired: number };
};

export const useSessionLogin = () =>
  useSWRMutation('/api/session', (url: string, { arg }: SessionLoginArgType) =>
    axios.post(url, arg)
  );

export const useSessionLogout = () =>
  useSWRMutation('/api/session', (url: string) => axios.delete(url));
