import MainLayout from "@/layout";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBooks } from "@/api/books";
import { IFilterValue } from "@/ui/FilterBar/interface";
import BookCollection from "@/ui/BookCollection";
import { IReqParams } from "@/ui/BookCollection/interface";
import { useCategories } from "@/api/category";

const CategoryPage = () => {
    const [searchParams] = useSearchParams();
    const [categoryId, setCategoryId] = useState<string | null>(searchParams.get("id"))
    const { categories } = useCategories({ sort_by: "numOfBooks", order_by: "DESC" });
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        if (searchParams.get("id")) {
            setCategoryId(searchParams.get("id"))
        } else {
            if (filterValues.length > 0) {
                setCategoryId(filterValues[0].id)
            }
        }
    }, [searchParams.get("id"), categories])

    const [bookParams, setBookParams] = useState<IReqParams>({
        page: parseInt(searchParams.get("page") || "0"),
        size: 12,
        ...(categoryId && { collection_id: categoryId })
    });

    useEffect(() => {
        if (categoryId) {
            setBookParams(prev => ({ ...prev, category_id: categoryId }))
        }
    }, [categoryId])

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
        <MainLayout>
            <div className="lg:pb-[144px] pb-[40px] lg:pt-[30px] pt-[10px]">
                <BookCollection
                    books={newBooks}
                    setBookParams={setBookParams}
                    bookParams={bookParams}
                    filterValues={filterValues}
                    totalElements={books?.total_elements}
                    showFilter={true}
                />
            </div>
        </MainLayout>
    )
}

export default CategoryPage;