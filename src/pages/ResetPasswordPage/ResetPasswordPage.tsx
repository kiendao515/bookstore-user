import * as yup from 'yup';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from "react-query";
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from "react-router-dom"
import { IFormValue } from './interface';
import { resetPassword } from '@/api/auth';

const ResetPasswordPage = () => {
    let [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const schema = yup.object().shape({
        new_password: yup
            .string()
            .trim()
            .required('This field is required.')
            .max(100, 'New password must be less than 100 characters.'),
        token: yup
            .string()
            .trim()
            .required('This field is required.')
    });

    const formMethod = useForm<IFormValue>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            token: token || '',
        }
    });

    const { mutate, isLoading } = useMutation(resetPassword, {
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.message);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        },
        onError: (error: any) => {
            toast.error(error?.response.data.message);
        }
    })

    const onHandlerSubmit = async (values: IFormValue) => {
        mutate(values);
    }

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-fulll h-[637px] flex justify-center items-center '>
                <div className="xl:w-[1274px] lg:w-[800px] md:w-[637px] w-full h-full flex flex-col justify-center items-center bg-gray-100 p-20">
                    <div>
                        <h1 className="text-2xl font-bold">Reset Password</h1>
                    </div>
                    <form onSubmit={formMethod.handleSubmit(onHandlerSubmit)} className="mt-10">
                        <div className="space-y-6 text-[19px]">
                            <div className="grid grid-cols-7 gap-3">
                                <div className="col-span-1 flex items-center justify-end">
                                    <p>new password</p>
                                </div>
                                <div className="col-span-6">
                                    <input
                                        id="new_password"
                                        className="lining-nums border-[1px] h-[14px]  bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-[19px]"
                                        type="new_password"
                                        {...formMethod.register('new_password')}
                                    />
                                    {formMethod.formState.errors.new_password && (<p>{formMethod.formState.errors.new_password.message}</p>)}
                                </div>
                                <input type={'hidden'} value={token ?? ""} {...formMethod.register('token')} />
                            </div>
                            <div className="flex justify-end" >
                                <button type="submit" className="bg-yellow-600  border-[1px] text-white h-[30px] w-32">
                                    Send
                                </button>
                            </div>
                        </div >
                    </form >
                </div >
            </div>

        </div>
    )
}

export default ResetPasswordPage