import { useEffect, useMemo, useState } from "react";
// import Collection from "@/ui/user/ItemCollection";
import { IReqParams, useBooks } from "@/api/books";
import { useSearchParams } from "react-router-dom";
import MainLayout from "@/layout";
import BookCollection from "../HomePage/components/BookCollection";
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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const { books } = useBooks({ ...bookParams });
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
                authorId: book?.author?.id,
                quantity: book?.book_inventories?.length,
                description: book?.description || '',
                author: book?.author?.name || '',
                image: book?.cover_image || '',
                id: book?.id,
            };
        }) || [];
    }, [books]);

    return (
        <MainLayout>
            <div>
                {
                    searchParams.get("search") == "1" && isMobile && (
                        <div className="h-[50px] mobile-regular border-b-[1px] border-[#8C8C8C] border-solid flex items-center z-20 bg-layout">
                            <text className="text-[#8C8C8C] mobile-regular" >kết quả tìm kiếm cho: <text className="italic">"{searchParams.get("name")}"</text></text>
                        </div>
                    )
                }
                <BookCollection
                    title="collections"
                    books={newBooks}
                    havePagination={true}
                    setBookParams={setBookParams}
                    bookParams={bookParams}
                    filterValues={filterValues}
                    hasTitle={false}
                    hasFilter={searchParams.get("search") == "1" ? false : true}
                    firstIndex={books?.total_elements != 0 ? (books?.page ?? 0) * (books?.size ?? 0) + 1 : 0}
                    lastIndex={((books?.page ?? 0) + 1) * (books?.size ?? 0) < (books?.total_elements ?? 0) ? ((books?.page ?? 0) + 1) * (books?.size ?? 0) : (books?.total_elements ?? 0)}
                    totalElement={books?.total_elements ?? 0}
                    currentPage={books?.page ?? 0}
                    totalPage={books?.total_pages ?? 0}
                    isSearch={searchParams.get("search") == "1" ? true : false}
                    searchText={searchParams.get("name") || ''}
                />
            </div>
        </MainLayout>
    )
}

export default BookPage;