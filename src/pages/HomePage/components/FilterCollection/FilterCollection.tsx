import React, { useMemo, useState } from 'react';
import BookCard from "../../../../ui/BookCard";
import Pagination from "../../../../ui/Pagination/Pagination";
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
        created_at:"",
        updated_at:""
    });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { books } = useBooks({ ...bookParams });

    const { categories } = useCategories({});
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = [];
        categories?.data?.map((category) => {
            result.push({
                id: category.id,
                label: category.name,
                quantity: category.num_of_books
            });
        });
        return result;
    }, [categories]);

    const newBooks = useMemo(() => {
        return books?.data?.map(book => {
            const { minPrice, type } = (book?.book_inventories?.length > 0
                ? book.book_inventories.reduce((acc, reality) => {
                    if (reality.price != null && reality.price < acc.minPrice) {
                        return { minPrice: reality.price, type: reality.type };
                    }
                    return acc;
                }, { minPrice: Number.MAX_VALUE, type: "OLD" })
                : { minPrice: 0, type: "OLD" });

            return {
                link: `/book-detail/${book?.id}`,
                name: book?.name,
                price: minPrice,
                type: type,
                quantity: book?.number_of_books,
                description: book?.description || '',
                author: book?.author_name || '',
                image: book?.cover_image || '',
                id: book?.id,
                soldCount: book?.sold_quantity
            };
        }) || [];
    }, [books]);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(categoryId);
        setBookParams(prev => ({
            ...prev,
            category_id: categoryId, // Assuming the API accepts a `category` parameter
            page: 0 // Reset to the first page when the category changes
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
                                link = {book.link}
                                key={book.id}
                                image={book.image}
                                title={book.name}
                                author={book.author}
                                price={book.price}
                                soldCount={book.soldCount}
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
