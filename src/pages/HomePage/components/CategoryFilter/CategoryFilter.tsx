import { useEffect, useMemo, useState } from "react";
import { useCategories } from "@/api/category";
import { useSearchParams } from "react-router-dom";
import { IReqParams, useBooks } from "@/api/books";
import { IFilterValue } from "@/ui/FilterBar/interface";
import BookCollection from "@/ui/BookCollection";

const CategoryFilter = () => {
    const [searchParams] = useSearchParams();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: parseInt(searchParams.get("page") || "0"),
        size: 36
    })

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

    const { categories } = useCategories({ sort_by: "numOfBooks", order_by: "DESC" });
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = []
        categories?.data?.map((category) => {
            result.push({
                id: category.id,
                label: category.name,
                quantity: category.num_of_books
            })

        })
        return result;
    }, [categories])

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
        <div>
            <BookCollection
                title="thể loại"
                books={newBooks}
                setBookParams={setBookParams}
                bookParams={bookParams}
                havePagination={true}
                filterValues={filterValues}
                hasTitle={true}
                hasHeader={true}
                firstIndex={books?.total_elements != 0 ? (books?.page ?? 0) * (books?.size ?? 0) + 1 : 0}
                lastIndex={((books?.page ?? 0) + 1) * (books?.size ?? 0) < (books?.total_elements ?? 0) ? ((books?.page ?? 0) + 1) * (books?.size ?? 0) : (books?.total_elements ?? 0)}
                totalElement={books?.total_elements ?? 0}
                currentPage={books?.page ?? 0}
                totalPage={books?.total_pages ?? 0}
                hasFilter={true}
            />
        </div>
    )
};

export default CategoryFilter;