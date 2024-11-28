'use server';
import { getIronSession } from 'iron-session';
import { sessionOptions } from './session-options';
import { cookies } from 'next/headers';

export const getToken = async () => {
  return getIronSession<any>(cookies(), sessionOptions).then((data) => data?.token);
};

export const getStudentData = async () => {
  return getIronSession<any>(cookies(), sessionOptions).then((data) => data?.student);
};
