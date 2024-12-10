import React, { useEffect, useMemo, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { IReqParams, useBooks } from '@/api/books';
import { useCategories } from '@/api/category';
import { IFilterValue } from '@/ui/FilterBar/interface';
import BookCollection from '@/ui/BookCollection';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IFilterCollectionProps {
    title: string;
}

const FilterCollection: React.FC<IFilterCollectionProps> = ({ title }) => {
    const [searchParams] = useSearchParams();
    const { categories } = useCategories({ sort_by: "numOfBooks", order_by: "DESC" });
    const navigate = useNavigate();


    const filterValues = useMemo(() => {
        const result: IFilterValue[] = []
        categories?.data.map((category) => {
            result.push({
                id: category.id,
                label: category.name,
                quantity: category.num_of_books
            })
        })
        return result;
    }, [categories]);


    const [bookParams, setBookParams] = useState<IReqParams>({
        page: parseInt(searchParams.get("page") || "0"),
        size: 12,
    });

    useEffect(() => {
        const page = searchParams.get("page");
        if (page) {
            setBookParams(prevParams => ({
                ...prevParams,
                page: Number(page)
            }));
        }

    }, [searchParams.get("page")])

    const { books } = useBooks({ ...bookParams });

    const newBooks = useMemo(() => {
        return books?.data?.map(book => {
            let bookInventories = book?.book_inventories || [];

            let bookInventory = bookInventories
                .filter(bookInventory => bookInventory.quantity > 0)
                .reduce((min, current) => current.price < min.price ? current : min, { price: Number.MAX_VALUE, type: '', quantity: 0 });

            return {
                link: `/book-detail/${book?.id}`,
                name: book?.name,
                price: bookInventory.price != Number.MAX_VALUE ? bookInventory.price : 0,
                type: bookInventory.type || '',
                authorName: book?.author_name,
                quantity: bookInventory.quantity,
                description: book?.description || '',
                image: book?.cover_image || '',
                id: book?.id,
                soldCount: book.sold_quantity || 0
            };
        }) || [];
    }, [books]);

    return (
        <div className="p-8">
            <section className="flex items-center justify-between bg-gray-100 p-4 mb-[64px]">
                <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                <div onClick={() => navigate("/category?page=0")} className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
                    Xem thêm <RightOutlined className="ml-1" />
                </div>
            </section>
            <BookCollection
                filterValues={filterValues}
                setBookParams={setBookParams}
                bookParams={bookParams}
                books={newBooks}
                hasFilter ={true}
                hasHeader={false}
                searchField="category_id"
                totalElement={books?.total_elements || 0}
            />
        </div>
    );
};

export default FilterCollection;
