import React, { useEffect, useMemo, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { IReqParams, useBooks } from '@/api/books';
import { useCategories } from '@/api/category';
import { IFilterValue } from '@/ui/FilterBar/interface';

import { useNavigate, useSearchParams } from 'react-router-dom';
import BookCollection from '@/ui/BookCollection';

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
            const validInventories = book?.book_inventories?.filter(inventory => inventory.price > 0) || [];

            // Find the minimum price and its type
            const { minPrice, type } = validInventories.length > 0
                ? validInventories.reduce((acc, inventory) => {
                    if (inventory.price < acc.minPrice) {
                        return { minPrice: inventory.price, type: inventory.type };
                    }
                    return acc;
                }, { minPrice: Number.MAX_VALUE, type: "UNKNOWN" }) // Default type if none is found
                : { minPrice: 0, type: "UNKNOWN" }; // Default values if no valid inventory exists  
            return {
                link: `/book-detail/${book?.id}`,
                name: book?.name,
                price: minPrice,
                type: type,
                bookInventory: book?.book_inventories,
                quantity: book?.number_of_books,
                description: book?.description || '',
                authorName: book?.author_name || '',
                image: book?.cover_image || '',
                id: book?.id,
                soldCount: book?.sold_quantity
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
                books={newBooks}
                setBookParams={setBookParams}
                bookParams={bookParams}
                filterValues={filterValues}
                totalElements={books?.total_elements}
                showFilter={true}
            />
        </div>
    );
};

export default FilterCollection;
