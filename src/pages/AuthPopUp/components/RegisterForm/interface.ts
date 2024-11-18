
export interface IFormValue {
    email: string;
    password: string;
    full_name: string;
    confirm_password: string;
    policy: boolean
}

export interface IRegisterFormProps {
    setIndex: React.Dispatch<React.SetStateAction<number>>
}