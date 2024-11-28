import appAxios from '@/lib/axios';
import useSWRInfinite from 'swr/infinite';
const fetcher = (url: string) => appAxios.get(url).then((res) => res.data.data);

export const usePagination = <T>(url: string, searchP: any) => {
  const queryString = `title=${searchP?.title || ''}&job_type_ids=${(searchP.job_type_ids?.length as any) > 0 ? JSON.stringify(searchP.job_type_ids) : ''}&&salary_range_start=${searchP.salary_range_start.toString() || ''}&&salary_range_end=${searchP.salary_range_end.toString() || ''}&&job_level_ids=${(searchP.job_level_ids.length as any > 0)?JSON.stringify(searchP.job_level_ids):''}&&visa_type_ids=${(searchP.visa_type_ids).length as any > 0 ? JSON.stringify(searchP.visa_type_ids):''}&&posted_date=${searchP.posted_date || ''}&&expire_date=${searchP.expire_date || ''}&&region_ids${searchP.region_ids || []}`;

  const PAGE_SIZE = 5;
  const getKey = (pageIndex: number, previousPageData: T[]) => {
    pageIndex = pageIndex + 1;

    if (previousPageData && !previousPageData.length) return null;
    return `${url}?page=${pageIndex}&limit=${PAGE_SIZE}&${queryString}`;
 // return url
  };

  const { data: jobs, size, setSize, error, mutate } = useSWRInfinite(getKey, fetcher);

  const paginatedData: T[] | undefined = jobs?.flat();

  const isReachedEnd = jobs && jobs[jobs.length - 1]?.length < PAGE_SIZE;

  const loadingMOre = jobs && typeof jobs[size - 1] === 'undefined';

  return {
    paginatedData,
    isReachedEnd,
    loadingMOre,
    size,
    setSize,
    error,
    mutate,
  };
};
