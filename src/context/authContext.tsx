import useGetStudentId from '@/hooks/useGetStudentData';
import { getStudentData } from '@/lib/getToken';
import { getFromStorage } from '@/lib/localStoragelib';
import { createContext, useState, ReactNode, useEffect } from 'react';

type Props = {
  children?: ReactNode;
};
type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: (newState: boolean) => void;
  //   superAdmin: boolean;
  //   setSuperAdmin: (newState: boolean) => void;
  //   permissionIds: any;
  user: any;

  setUser: React.Dispatch<React.SetStateAction<any>>;
  //   setPermissionIds: React.Dispatch<React.SetStateAction<any>>;
};
const initialValue = {
  authenticated: false,
  setAuthenticated: () => {},
  //   superAdmin: false,
  //   setSuperAdmin: () => {},
  //   permissionIds: undefined,
  user: undefined,

  setUser: () => {},
  setPermissionIds: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialValue);

export const AuthContextProvider = ({ children }: Props) => {
  const { studentId } = useGetStudentId();
  const [authenticated, setAuthenticated] = useState(studentId ? true : initialValue.authenticated);
  useEffect(() => {
    const fun = async () => {
      const studentData = await getStudentData();
      if (studentData?.student?.id) {
        setAuthenticated(true);
      }
    };
    fun();
  }, []);
  const [user, setUser] = useState(
    getFromStorage('user_info') ? getFromStorage('user_info') : initialValue.user
  );
  //   const [permissionIds, setPermissionIds] = useState(
  //     localStorage.getItem("permission")
  //       ? localStorage.getItem("permission")
  //       : initialValue.permissionIds
  //   );

  //   const [superAdmin, setSuperAdmin] = useState(
  //     localStorage.getItem("super_admin") ? true : initialValue.superAdmin
  //   );

  useEffect(() => {
    //   if (localStorage.getItem("jls")) {
    //       setTimeout(() => {
    //           setAccessToken('');
    //       }, 60 * 60 * 1000); // 60 minutes in milliseconds
    //   }
  }, []);
  //use Memo

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        // setSuperAdmin,
        // superAdmin,
        user,
        setUser,
        // permissionIds,
        // setPermissionIds,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
