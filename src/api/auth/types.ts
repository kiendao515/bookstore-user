export interface ILoginParams {
    email: string;
    password: string;
  }
  
  export interface ILogin {
    user: IUserProfile;
    token: string;
  }
  export interface ILoginResponse {
    data: ILogin;
    message: string;
    status: number;
  }
  
  export interface IUserProfile {
    id: number;
    email: string;
    fullName: string;
    teacherCode: string;
    createAt: string;
    updateAt: string;
    permissions: string[];
  }
  export interface IUserProfileResponse {
    data: IUserProfile;
    message: string;
    status: number;
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