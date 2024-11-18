
export interface IFormValue {
    token: string;
    new_password: string;
    confirm_password: string;
}

export interface IResetPasswordForm {
    setIndex: React.Dispatch<React.SetStateAction<number>>
}