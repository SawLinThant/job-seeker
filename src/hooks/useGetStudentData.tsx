import { getStudentData } from '@/lib/getToken';
import { useCallback, useEffect, useState } from 'react';

const useGetStudentId = () => {
  const [studentId, setStudentId] = useState<string | null>();

  useEffect(() => {
    const fetchAgentCallBack = async () => {
      const agentData = await getStudentData();

      if (agentData?.student?.id) {
        setStudentId(agentData?.student?.id);
      } else {
        setStudentId(null);
      }
    };
    fetchAgentCallBack();
  }, []);

  return { studentId };
};

export default useGetStudentId;
