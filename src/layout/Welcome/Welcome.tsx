
import { SearchOutlined } from '@ant-design/icons';
import { Carousel, Input } from 'antd';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
interface IFormValue {
    book_name: string;
}

const WelcomeSection: React.FC = () => {
    const schema = yup.object().shape({
        book_name: yup.string().required("Vui lòng nhập tên sách"),
    });
    const navigate = useNavigate();
    const formMethod = useForm<IFormValue>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {}
    })
    const onHandleSubmit = async (data: IFormValue) => {
        navigate(`/book?name=${data.book_name}&search=1`);
    }
    return (
        <section className="items-center justify-center">
            <div className="flex flex-col items-center mt-[20px] mb-[20px] lg:mt-[40px] lg:mb-[40px]">
                <form
                    onSubmit={formMethod.handleSubmit(onHandleSubmit)}
                    className="flex items-center w-full justify-center"
                >
                    <Controller
                        name="book_name"
                        control={formMethod.control}
                        render={({ field }) => (
                            <div className='w-2/3 lg:w-1/2'>
                                <Input
                                    {...field}
                                    placeholder="Nhập tên sách"
                                    suffix={
                                        <SearchOutlined
                                            type='submit'
                                            className="cursor-pointer text-blue-500 w-[20px] h-[20px] self-center justify-self-center"
                                            onClick={() => formMethod.handleSubmit(onHandleSubmit)()}
                                        />
                                    }
                                    className="p-2 border border-gray-300 rounded-lg flex items-center"
                                    onPressEnter={formMethod.handleSubmit(onHandleSubmit)}
                                />
                                {formMethod.formState.errors.book_name && (<p className='text-red-600 italic text-[14px]'>{formMethod.formState.errors.book_name.message}</p>)}


                            </div>
                        )}
                    />
                </form>
            </div>
            <Carousel autoplay dotPosition="bottom" className="w-full">
                <div>
                    <img src="./assets/images/1.png" alt="Book 1" className="w-full h-auto rounded-[5px] shadow-[5px]" />
                </div>
                <div>
                    <img src="./assets/images/4.png" alt="Book 2" className="w-full h-auto rounded-[5px] shadow-[5px]" />
                </div>
            </Carousel>
        </section>
    );
};

export default WelcomeSection;
