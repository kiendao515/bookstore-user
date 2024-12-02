
import { SearchOutlined } from '@ant-design/icons';
import { Carousel, Input } from 'antd';
import React from 'react';

const WelcomeSection: React.FC = () => {
    return (
        <section className="items-center justify-center">
            <div className="flex flex-col items-center mt-[52px] mb-[84px]">
                <Input
                    placeholder="Nhập tên sách"
                    prefix={<SearchOutlined />}
                    className="w-1/4"
                />
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
