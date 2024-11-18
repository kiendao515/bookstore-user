
export interface IFormValue {
    email: string;
    password: string;
    remember?: boolean;
}

export interface ILoginForm {
    setIndex : React.Dispatch<React.SetStateAction<number>>
}