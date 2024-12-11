import MainLayout from "@/layout";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCollections } from "@/api/collections/queries";
import { useBooks } from "@/api/books";
import { IFilterValue } from "@/ui/FilterBar/interface";
import BookCollection from "@/ui/BookCollection";
import { IReqParams } from "@/ui/BookCollection/interface";

const CollectionPage = () => {
    const [searchParams] = useSearchParams();
    const [collectionId, setCollectionId] = useState<string | null>(searchParams.get("id"))
    const { collections } = useCollections({ sort_by: "numOfBooks", order_by: "DESC", show_quantity: 1 });
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = []
        collections?.data.map((collection) => {
            result.push({
                id: collection.id,
                label: collection.name,
                quantity: collection.quantity
            })
        })
        return result;
    }, [collections]);

    useEffect(() => {
        if (searchParams.get("id")) {
            setCollectionId(searchParams.get("id"))
        } else {
            if (filterValues.length > 0) {
                setCollectionId(filterValues[0].id)
            }
        }
    }, [searchParams.get("id"), collections])

    const [bookParams, setBookParams] = useState<IReqParams>({
        page: parseInt(searchParams.get("page") || "0"),
        size: 12,
        ...(collectionId && { collection_id: collectionId })
    });

    useEffect(() => {
        if (collectionId) {
            setBookParams(prev => ({ ...prev, collection_id: collectionId }))
        }
    }, [collectionId])

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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

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
            <div className="pb-[144px] pt-[48px]">
                <BookCollection
                    title="collections"
                    searchField="collection_id"
                    books={newBooks}
                    havePagination={true}
                    setBookParams={setBookParams}
                    filterValues={filterValues}
                    hasTitle={false}
                    hasHeader={!isMobile}
                    firstIndex={books?.size != 0 && books?.size ? (books?.page ?? 0) * (books?.size ?? 0) + 1 : 0}
                    lastIndex={((books?.page ?? 0) + 1) * (books?.size ?? 0) < (books?.total_elements ?? 0) ? ((books?.page ?? 0) + 1) * (books?.size ?? 0) : (books?.total_elements ?? 0)}
                    totalElement={books?.total_elements ?? 0}
                    currentPage={books?.page ?? 0}
                    totalPage={books?.total_pages ?? 0}
                    bookParams={bookParams}
                    isIndividualPage={false}
                    hasFilter={!isMobile}
                />
            </div>
        </MainLayout>
    )
}

export default CollectionPage;