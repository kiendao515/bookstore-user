import { useEffect, useMemo, useState } from "react";
import { IReqParams, useBooks } from "@/api/books";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/layout";
import { IFilterValue } from "@/ui/FilterBar/interface";
import { useCommonEntityDetail } from "@/api/bookmetadata/queries";
import BookCollection from "@/ui/BookCollection";
const BookPage = () => {
    const [searchParams] = useSearchParams();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: parseInt(searchParams.get("page") || "0"),
        size: 36,
        ...(searchParams.get("storeId") && { store_id: searchParams.get("storeId") }),
        ...(searchParams.get("name") && { q: searchParams.get("name") }),
        ...(searchParams.get("authorName") && { author_name: searchParams.get("authorName") }),
        ...(searchParams.get("tagId") && { tag_id: searchParams.get("tagId") }),
    })
    useEffect(() => {
        setBookParams({
            page: parseInt(searchParams.get("page") || "0"),
            size: 36,
            ...(searchParams.get("storeId") && { store_id: searchParams.get("storeId") }),
            ...(searchParams.get("name") && { q: searchParams.get("name") }),
            ...(searchParams.get("authorName") && { author_name: searchParams.get("authorName") }),
            ...(searchParams.get("tagId") && { tag_id: searchParams.get("tagId") }),
        }
        )
    }, [searchParams])


    useEffect(() => {
        const page = searchParams.get("page");
        if (page) {
            setBookParams(prevParams => ({
                ...prevParams,
                page: Number(page)
            }));
        }

    }, [searchParams.get("page")])
    const { commonEntity: tag } = useCommonEntityDetail(searchParams.get("tagId") || undefined);
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = []
        if (tag) {
            result.push({
                id: tag?.data?.id || '',
                label: tag?.data?.name || '',
                quantity: tag?.data?.num_of_books
            })
        }
        return result;
    }, [tag])

    const searchField = useMemo(() => {
        if (tag) return "tag_id";
    }, [bookParams])



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
            <div className="pb-[50px] lg:pb-[144px] w-full">
                <BookCollection
                    filterValues={filterValues}
                    setBookParams={setBookParams}
                    bookParams={bookParams}
                    books={newBooks}
                    searchField={searchField}
                    totalElements={books?.total_elements || 0}
                    showFilter={filterValues.length > 0}
                />
            </div>
        </MainLayout>
    )
}

export default BookPage;