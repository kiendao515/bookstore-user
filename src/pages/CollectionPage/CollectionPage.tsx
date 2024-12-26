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

export default CollectionPage;