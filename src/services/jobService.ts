import appAxios from '@/lib/axios';
import { EmployeeDetailI, JobDetailTypeI } from '@/types/jobDetail';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
export const useGetJobTypeList = () => {
  return useSWR(`/list/job-type-list`);
};
export const useGetJobList = (
  pagination: { pageIndex: number; pageSize: number },
  title?: string,
  job_type_ids?: string[],
  salary_range_start?: number,
  salary_range_end?: number,
  job_level_ids?: string[],
  visa_type_ids?: string[],
  posted_date?: string,
  expire_date?: string,
  region_ids?: string[]
) => {
  return useSWR(
    `/student/job-feed?page=${pagination?.pageIndex + 1}&limit=${pagination.pageSize}&title=${title || ''}&job_type_ids=${(job_type_ids?.length as any) > 0 ? JSON.stringify(job_type_ids) : ''}&&salary_range_start=${salary_range_start || ''}&&salary_range_end=${salary_range_end || ''}&&job_level_ids=${job_level_ids || []}&&visa_type_ids=${visa_type_ids || []}&&posted_date=${posted_date || ''}&&expire_date=${expire_date || ''}&&region_ids=${region_ids || []}`
  );
};

export const useMutateJobApply = () => {
  return useSWRMutation(
    `/student/personal/apply-job
`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id: string;
        };
      }
    ) => {
      return appAxios.put(`${url}/${arg.id}`);
    }
  );
};

export const useGetSalaryRange = () => {
  return useSWR(`/list/salary-range`);
};
export const useGetJobLevel = () => {
  return useSWR(`/list/job-position`);
};
export const useGetJobIndustry = () => {
  return useSWR(`/list/job-industry-list`);
};
export const useGetVisaType = () => {
  return useSWR(`/list/visa-type`);
};
export const useGetRegions = () => {
  return useSWR(`/list/region`);
};
export const useGetCompanySize = () => {
  return useSWR(`/list/company-size`);
};
export const getJobLists = async (params = {}) => {
  const searchParams = new URLSearchParams(params);
  const queryString = searchParams.toString();

  const response = await appAxios.get(`/student/job-feed?${queryString}`);
  return response.data;
};
export const getJobDetails = async (id: string) => {
  const res = await appAxios.get(`/student/job-feed/${id}`);
  return res;
};

export const useGetJobDetailsId = (id?: string) => {
  return useSWR<JobDetailTypeI>(id ? `/student/job-feed/${id}` : null);
};

export const useGetJobPopularList = () => {
  return useSWR(`/student/popular-job`);
};

export const useGetCountries = () => {
  return useSWR(`/list/country`);
};
export const useGetRegion = () => {
  return useSWR(`/list/region`);
};
export const useGetTownship = () => {
  return useSWR(`/list/township`);
};

export const useMutateSavedUnSaveJob = () => {
  return useSWRMutation(
    `/student/personal/save-job`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          id?: string;
          status?: boolean;
        };
      }
    ) => {
      return appAxios.post<any>(`${url}/${arg.id}`, {
        status: arg.status,
      });
    }
  );
};

export const useGetMyJobSaved = () => {
  return useSWR(`/student/personal/saved-job-list?page=1&
limit=100`);
};
export const useGetMyJobApplied = () => {
  return useSWR(`/student/personal/apply-job-list?page=1&
limit=100`);
};
export const useGetMyJobInterview = () => {
  return useSWR<{
    saved_jobs_count: number;
    applied_jobs_count: number;
    interview_jobs_count: number;
    data: {
      id: string;
      job_title: string;
      applied_date: string;
      business: {
        name?: string;
        image: string;
      };
      processes: {
        id: string;
        process_name: string;
        step: number;
        status: string;
      }[];
    }[];
  }>(`/student/personal/applied-interview-list?page=1&
limit=100`);
};

export const useMutateReviewLikeUnlike = () => {
  return useSWRMutation(
    `/student/personal/like-review`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          reviewId?: string;
        };
      }
    ) => {
      return appAxios.post<any>(`${url}/${arg.reviewId}`);
    }
  );
};
export const useMutateReview = (jobPostId: string) => {
  return useSWRMutation(
    `/student/personal/set-review/${jobPostId}`,
    (
      url,
      {
        arg,
      }: {
        arg: {
          review?: string;
          rating?: number;
          parent_review_id?: string | null;
        };
      }
    ) => {
      return appAxios.post<any>(`${url}`, arg);
    }
  );
};
export const useGetEmployeeDetail = (id: string) => {
  return useSWR<EmployeeDetailI>(`/student/business/${id}`);
};

export const useGetPopularJobTitle = () => {
  return useSWR(`/student/popular-job-title`);
};
