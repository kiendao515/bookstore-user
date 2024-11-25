import React, { useMemo, useState } from 'react';
import BookCard from "../../../../ui/BookCard";
import { Pagination as AntPagination } from "antd";
import { RightOutlined } from '@ant-design/icons';
import { IReqParams, useBooks } from '@/api/books';
import { useCategories } from '@/api/category';

interface IFilterCollectionProps {
    title: string;
}

export interface IFilterValue {
    id: string;
    label: string;
    quantity?: number;
}

const FilterCollection: React.FC<IFilterCollectionProps> = ({ title }) => {
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 12,
        created_at: "",
        updated_at: ""
    });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { books } = useBooks({ ...bookParams });
    const { categories } = useCategories({});

    // Tạo danh sách category từ API
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = [];
        categories?.data?.forEach((category) => {
            result.push({
                id: category.id,
                label: category.name,
                quantity: category.num_of_books
            });
        });
        return result;
    }, [categories]);

    // Tạo danh sách sách từ API
    const newBooks = useMemo(() => {
        return books?.data?.map(book => ({
            link: `/book-detail/${book?.id}`,
            name: book?.name,
            price: book?.price || 0,
            quantity: book?.number_of_books,
            description: book?.description || '',
            image: book?.cover_image || '',
            id: book?.id,
            soldCount: book?.sold_quantity || 0
        })) || [];
    }, [books]);

    // Khi chọn category
    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setBookParams(prev => ({
            ...prev,
            category_id: categoryId,
            page: 0 // Reset về trang đầu tiên
        }));
    };

    // Khi thay đổi trang trong pagination
    const handlePageChange = (page: number, pageSize?: number) => {
        setBookParams(prev => ({
            ...prev,
            page: page - 1, // Ant Design pagination là 1-based, API có thể là 0-based
            size: pageSize || prev.size
        }));
    };

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
                            {filterValues.map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleCategoryClick(category.id)}
                                    className={`p-2 hover:bg-blue-100 cursor-pointer rounded ${
                                        selectedCategory === category.id
                                            ? "bg-blue-50 font-semibold border-l-4 border-blue-400"
                                            : ""
                                    }`}
                                >
                                    {category.label} ({category.quantity})
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="col-span-3">
                    <div className="grid grid-cols-3 gap-6">
                        {newBooks.map(book => (
                            <BookCard
                                link={book.link}
                                key={book.id}
                                image={book.image}
                                title={book.name}
                                price={book.price}
                                soldCount={book.soldCount}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-end mt-8">
                        <AntPagination
                            current={bookParams.page + 1} // Hiển thị trang hiện tại
                            total={books?.total_elements || 0} // Tổng số mục từ API
                            pageSize={bookParams.size} // Số mục trên mỗi trang
                            onChange={handlePageChange} // Callback khi thay đổi trang
                            showSizeChanger // Cho phép thay đổi số mục mỗi trang
                            pageSizeOptions={['6', '12', '24']} // Lựa chọn số mục mỗi trang
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterCollection;
