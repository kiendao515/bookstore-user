import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { IUser } from '@/api/auth';


interface IAuthenticateStore {
  user: IUser;
  isAuth: boolean;
}

const initialState: IAuthenticateStore = {
  user: {
    id: "",
    email: '',
    full_name: '',
    role: "",
    date_of_birth: '',
    phone_number: '',
    point: 0
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
          id: "",
          email: '',
          full_name: '',
          role: "",
          date_of_birth: '',
          phone_number: '',
          point: 0
        },
        isAuth: false,
      };
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;

export const getUser = (state: RootState) => {
  const { role, ...user } = state.auth.user;
  return user;
};
export const getAuth = (state: RootState) => state.auth.isAuth;
export const getRoles = (state: RootState) => state.auth.user.role;

export default authSlice.reducer;
