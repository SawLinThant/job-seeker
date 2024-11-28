import appAxios from '@/lib/axios';
import { Post } from '@/types/posts';
import axios from 'axios';
import useSWR, { SWRConfiguration } from 'swr';
import useSWRMutation from 'swr/mutation';

export const useMutationCheckEmail = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/check/email`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );
export const useMutationCheckPhone = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/check/phone`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          phone: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
export const useMutationCheckToVerifyEmail = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/check/email`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
export const useMutationRegister = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/register`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          name: string;
          email: string;
          password: string;
          password_confirmation: string;
          request_id: string;
          code: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );
export const useMutationLogin = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/login`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email: string;
          password: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );

export const useMutationVerifyOtpForForgotPassword = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/verify/mail`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
          request_id?: string;
          code?: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );
export const useMutationVerifyOtpForAccountEmail = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/student-email`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          _method?: string;
          email?: string;
          request_id?: string;
          code?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
export const useMutationVerifyOtpForAccount = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/student-phone`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          _method?: string;
          phone?: string;
          request_id?: string;
          code?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
export const useMutationForgotPassword = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/password/reset/verify`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );
export const useMutationForgotPasswordNewPassword = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/password/change`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
          password?: string;
          password_confirmation?: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );

export const useMutationSendVerifyMail = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/send/verify/mail`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );
export const useMutationSendVerifyPhone = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/send/verify/phone`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          phone?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
export const useMutationSendVerifyEmail = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/send/verify/email`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
export const useMutationForgotResendVerifyMail = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/resend/verify/mail`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
        };
      }
    ) => {
      return axios.post<any>(url, arg);
    }
  );

export const useGetPersonInformation = () => {
  return useSWR(`/student/personal/information`);
};

export const useMutationPersonalInformation = () =>
  useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/student/personal/information`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          email?: string;
          name?: string;
          phone?: string;
          birth_date?: string;
          gender?: string;
          address?: string;
          current_country_id?: string;
          township_id?: string;
          region_id?: string;
          education_level?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );

export const useMutateVideoUpload = () => {
  return useSWRMutation(
    `/student/personal/self-intro-video`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          data: any;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg.data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
    }
  );
};
export const useMutateProfileUpload = () => {
  return useSWRMutation(
    `/student/personal/profile-upload`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          data: any;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg.data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
    }
  );
};

export const useGetStudentPersonalUploadVideo = () => {
  return useSWR(`/student/personal/self-intro-video`);
};

export const useMutateProfileUploadCVResume = () => {
  return useSWRMutation(
    `/student/personal/resume/upload`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          data: any;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg.data, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
    }
  );
};

export const useGetStudentPersonalUploadResumes = () => {
  return useSWR(`/student/personal/resumes`);
};
export const useGetJapanRegion = () => {
  return useSWR(`/list/japan-region`);
};
export const useGetVisaType = () => {
  return useSWR(`/list/visa-type`);
};
export const useGetPersonalAdditional = () => {
  return useSWR(`/student/personal/additional`);
};
export const useGetAccountSetUpProcess = () => {
  return useSWR(`/student/personal/setup-process`);
};

export const useMutateAdditional = () => {
  return useSWRMutation(
    `/student/personal/additional`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          expected_salary_start?: number;
          expected_salary_end?: number;
          preferred_location_one_id?: string;
          preferred_location_two_id?: string;
          visa_type_id?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
};

export const useGetSkillList = () => {
  return useSWR(`/list/skill`);
};
export const useGetAccountSkillList = () => {
  return useSWR(`/student/personal/skills`);
};
export const useMutateSkill = () => {
  return useSWRMutation(
    `/student/personal/skills`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          skills?: string[];
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
};

export const fileUploadFun = async (fileR: any) => {
  return await appAxios.post('/file-upload', fileR, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};
export const fileUploadMultipleFun = async (fileR: any) => {
  return await appAxios.post('/file-upload', fileR, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};

export const useGetStudentPersonalEducation = () => {
  return useSWR(`/student/personal/educations`);
};
export const useGetStudentPersonalWorkExperience = () => {
  return useSWR(`/student/personal/work-experiences`);
};

export const useMutateEducation = () => {
  return useSWRMutation(
    `/student/personal/educations`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          attended_school?: string;
          field_of_study?: string;
          start_date?: string;
          end_date?: string;
          description?: string;
          file_id?: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
};
export const useMutateWorkExperience = () => {
  return useSWRMutation(
    `/student/personal/work-experiences`,
    (
      url,
      {
        arg,
      }: {
        arg: any;
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
};

export const useGetTypeCertifications = (isJPType: boolean) => {
  return useSWR(`/list/certificate-type?is_japanese_level=${isJPType}`);
};
export const useGetJapaneseLevel = (japanese_level_type_id: string) => {
  return useSWR(
    japanese_level_type_id
      ? `/list/japanese-level?japanese_level_type_id=${japanese_level_type_id}
`
      : null
  );
};

export const useMutateExpertCertificates = () => {
  return useSWRMutation(
    `/student/personal/expert-certificates`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          certification_type_id: string;
          japanese_level_id: string;
          description: string;
          file_id: string;
        };
      }
    ) => {
      return appAxios.post<any>(url, arg);
    }
  );
};

export const useGetTypeExpertCertification = (is_japanese_level?: boolean | string) => {
  return useSWR(`/student/personal/expert-certificates?is_japanese_level=${is_japanese_level}
`);
};

export const useMutateDeleteSelfIntroVideo = () => {
  return useSWRMutation(
    `/student/personal/self-intro-video`,
    (
      url,
      {
        arg,
      }: {
        arg: any;
      }
    ) => {
      return appAxios.delete<any>(url);
    }
  );
};
