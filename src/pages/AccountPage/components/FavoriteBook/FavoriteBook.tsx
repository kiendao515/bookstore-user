import { useState, useMemo } from "react";
import { Typography, Spin } from "antd";
import { IReqParams, useBookFavorite, useBooks } from "@/api/books";
import BookCard from "@/ui/BookCard";

const { Text } = Typography;

const FavoriteBook = () => {
    const { bookFavorite, isLoading: isFavoriteLoading } = useBookFavorite();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 12,
        created_at: "",
        updated_at: ""
    });

    const { books, isLoading: isBooksLoading } = useBooks({
        ...bookParams,
        book_search_ids: bookFavorite?.data?.book_ids?.join(",") || null,
    });

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
                soldCount: book.sold_quantity || 0,
            };
        }) || [];
    }, [books]);


    if (isFavoriteLoading || isBooksLoading) {
        return (
            <div style={{ textAlign: "center", padding: "50px 0" }}>
                <Spin tip="Đang tải sách yêu thích..." size="large" />
            </div>
        );
    }

    return (
        <div style={{ margin: "auto" }}>
            <Text className="mobile-title" style={{ color: "#888888" }}>[ Sách yêu thích ]</Text>
            <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-y-[24px] gap-y-[10px] 2xl:gap-x-[24px] xl:gap-x-[10px] gap-[12px] mt-[20px] lg:mt-[40px]">
                {
                    newBooks?.map(book => {
                        return (
                            <BookCard
                                id={book.id}
                                link={book.link}
                                key={book.id}
                                image={book.image}
                                title={book.name}
                                author={book.authorName}
                                price={book.price}
                                soldCount={book.soldCount}
                                quantity={book.quantity}
                            />

                        )
                    })
                }
            </div>
        </div>
    );
};

export default FavoriteBook;
