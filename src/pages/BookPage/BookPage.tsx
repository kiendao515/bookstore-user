import { useEffect, useMemo, useState } from "react";
import { IReqParams, useBooks } from "@/api/books";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/layout";
import { IFilterValue } from "@/ui/FilterBar/interface";
import { useCommonEntityDetail, usePersonDetail } from "@/api/bookmetadata/queries";
import BookCollection from "@/ui/BookCollection";
const BookPage = () => {
    const [searchParams] = useSearchParams();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 36,
        ...(searchParams.get("storeId") && { store_id: searchParams.get("storeId") }),
        ...(searchParams.get("name") && { name: searchParams.get("name") }),
        ...(searchParams.get("authorId") && { author_id: searchParams.get("authorId") }),
        ...(searchParams.get("tagId") && { tag_id: searchParams.get("tagId") }),
    })
    useEffect(() => {
        setBookParams({
            page: 0,
            size: 36,
            ...(searchParams.get("storeId") && { store_id: searchParams.get("storeId") }),
            ...(searchParams.get("name") && { name: searchParams.get("name") }),
            ...(searchParams.get("authorId") && { author_id: searchParams.get("authorId") }),
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
    const { person: author } = usePersonDetail(searchParams.get("authorId") || undefined);
    const { commonEntity: tag } = useCommonEntityDetail(searchParams.get("tagId") || undefined);
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = []
        if (author) {
            result.push({
                id: author?.data?.id || '',
                label: author?.data?.name || '',
                quantity: author?.data?.num_of_books
            })
        }
        if (tag) {
            result.push({
                id: tag?.data?.id || '',
                label: tag?.data?.name || '',
                quantity: tag?.data?.num_of_books
            })
        }
        return result;
    }, [author, tag])

    const searchField = useMemo(() => {
        if (author) return "author_id";
        if (tag) return "tag_id";
    }, [bookParams])



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
        <MainLayout>
            <div className="pb-[144px] pt-[48px] w-full">
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