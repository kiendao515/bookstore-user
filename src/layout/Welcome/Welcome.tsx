
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
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
            <div className="w-full">
                {/* Replace the src with your actual image path */}
                <img src="assets/icons/Welcome picture.svg" alt="Books" className="w-full h-auto" />
            </div>
        </section>
    );
};

export default WelcomeSection;
