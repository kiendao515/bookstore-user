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

export default CollectionPage;