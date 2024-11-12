import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

export interface IRole {
  id: number;
  name: string;
}
interface IUser {
  id: number;
  email: string;
  fullName: string;
  teacherCode: string;
  createAt: string;
  updateAt: string;
  permissions: string[];
}

interface IAuthenticateStore {
  user: IUser;
  isAuth: boolean;
}

const initialState: IAuthenticateStore = {
  user: {
    email: '',
    createAt: '',
    teacherCode: '',
    updateAt: '',
    fullName: '',
    id: 0,
    permissions: [],
  },
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, actions: PayloadAction<{ user: IUser }>) => {
      return {
        ...state,
        user: actions?.payload.user,
        isAuth: true,
      };
    },
    setLogout: () => {
      localStorage.removeItem('persist:root');
      return {
        user: {
          email: '',
          createAt: '',
          teacherCode: '',
          updateAt: '',
          fullName: '',
          id: 0,
          permissions: [],
        },
        isAuth: false,
      };
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;

export const getUser = (state: RootState) => {
  const { permissions, ...user } = state.auth.user;
  return user;
};
export const getAuth = (state: RootState) => state.auth.isAuth;
export const getPermissions = (state: RootState) => state.auth.user.permissions;

export default authSlice.reducer;
