import React from 'react';
import BookCard from "../../../../ui/BookCard";
import Pagination from "../../../../ui/Pagination/Pagination";
import { RightOutlined } from '@ant-design/icons';

interface IFilterCollectionProps {
    title: string;
}

const FilterCollection: React.FC<IFilterCollectionProps> = ({ title }) => {
    return (
        <div className="p-8">
            <section className="flex items-center justify-between bg-gray-100 p-4 mb-[64px]">
                <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                <a href="#more" className="flex items-center text-blue-600 hover:text-blue-800">
                    Xem thêm <RightOutlined className="ml-1" />
                </a>
            </section>

            <div className="grid grid-cols-4 gap-8">
                {/* Categories List */}
                <div className="col-span-1">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="space-y-2 text-gray-700">
                            {["Văn học (2531)", "Triết học (120)", "Lịch sử (55)", "Nghệ thuật (2258)", "Người văn (1251)", "Cổ tích (68)", "Thiếu nhi (325)", "Tôn giáo (213)", "Kiến trúc (204)", "Báo chí (253)", "Âm nhạc (21)", "Khoa học (581)", "Kịch (558)", "Thơ (48)", "Tiểu thuyết (42)"].map((category, index) => (
                                <div key={index} className="p-2 hover:bg-blue-100 cursor-pointer rounded">
                                    {category}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="col-span-3">
                    <div className="grid grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <BookCard
                                key={i}
                                image="assets/images/book.png"
                                title="Người vợ cô đơn"
                                author="(Francois-Mauriac)"
                                price="700.000"
                                rating={4.5}
                            />
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-end mt-8">
                        <Pagination />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCollection;
