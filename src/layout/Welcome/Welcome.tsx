
import { SearchOutlined } from '@ant-design/icons';
import { Carousel, Input } from 'antd';
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
interface IFormValue {
    book_name?: string;
}

const WelcomeSection: React.FC = () => {
    const schema = yup.object().shape({
        book_name: yup.string().optional(),
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
            <div className="flex flex-col items-center mt-[52px] mb-[84px]">
                <form
                    onSubmit={formMethod.handleSubmit(onHandleSubmit)}
                    className="flex items-center w-full justify-center"
                >
                    <Controller
                        name="book_name"
                        control={formMethod.control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Nhập tên sách"
                                prefix={
                                    <SearchOutlined
                                        className="cursor-pointer text-blue-500"
                                        onClick={() => formMethod.handleSubmit(onHandleSubmit)()}
                                    />
                                }
                                className="w-1/2 p-2 border border-gray-300 rounded-lg"
                                onPressEnter={formMethod.handleSubmit(onHandleSubmit)}
                            />
                        )}
                    />
                </form>
            </div>
            <Carousel autoplay dotPosition="bottom" className="w-full mb-2">
                <div>
                    <img src="./assets/images/1.png" alt="Book 1" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div>
                    <img src="./assets/images/4.png" alt="Book 2" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div>
                    <img src="https://via.placeholder.com/1500x500?text=Book+3" alt="Book 3" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
            </Carousel>
        </section>
    );
};

export default WelcomeSection;
