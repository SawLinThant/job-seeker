export interface Student {
  id: string;
  email: string;
  name: string;
}

export interface StudentInfoData {
  student: Student;
  token: string;
}

export interface LoginResponse {
  status: string;
  msg: string;
  data: StudentInfoData;
}
