export interface ILoginParams {
  email: string;
  password: string;
}

export interface IRegisterParams {
  email: string;
  password: string;
  full_name: string;
}

export interface ISendResetPwdParams {
  email: string;
}

export interface IResetPasswordParams {
  new_password: string;
  token: string;
}

export interface IChangePasswordParams {
  new_password: string;
  old_password: string;
}

export interface IUpdateUserParams {
  date_of_birth: string;
  full_name: string;
  phone_number: string;
  point?: number;
}

export interface IConfirmRegistrationParams {
  token: string | null;
}

export interface ILogin {
  user: IUserProfile;
  token: string;
}

export interface IRegisterResponse {
  reason: string,
  result: boolean;
}

export interface ILoginResponse {
  data: IUserProfile,
  result: boolean;
  reason: string;
}

export interface IUserProfile {
  user: IUser,
  token: string
}
export interface IUserProfileResponse {
  data: IUser;
  result: boolean;
}

export interface IUserSummaryResponse {
  data: {
    totalUser: number;
    totalComputer: number;
    totalRoom: number;
    totalSubject: number;
  };
  message: string;
  status: number;
}

export interface IUser {
  id: string;
  email: string;
  name: string;
  date_of_birth: string;
  phone_number: string;
  role: string;
  point: number;
}
