import { useEffect, useState, useMemo } from "react";
import { List, Row, Col, Card, Typography, Spin } from "antd";
import { IReqParams, useBookFavorite, useBooks } from "@/api/books";
import BookCard from "@/ui/BookCard";

const { Text } = Typography;

const FavoriteBook = () => {
    const { bookFavorite, isLoading: isFavoriteLoading } = useBookFavorite();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 12,
        created_at:"",
        updated_at:""
    });

    const { books, isLoading: isBooksLoading } = useBooks({
        ...bookParams,
        book_search_ids: bookFavorite?.data?.book_ids?.join(",") || null,
    });

    const newBooks = useMemo(() => {
        return books?.data?.map(book => {
            const validInventories = book?.book_inventories?.filter(inventory => inventory.price > 0) || [];
            const { minPrice, type } = validInventories.length > 0
                ? validInventories.reduce((acc, inventory) => {
                    if (inventory.price < acc.minPrice) {
                        return { minPrice: inventory.price, type: inventory.type };
                    }
                    return acc;
                }, { minPrice: Number.MAX_VALUE, type: "UNKNOWN" }) 
                : { minPrice: 0, type: "UNKNOWN" }; 

            return {
                link: `/book-detail/${book?.id}`,
                name: book?.name,
                price: minPrice,
                type: type,
                quantity: book?.number_of_books,
                description: book?.description || '',
                author: book?.author_name || '',
                image: book?.cover_image || '',
                id: book?.id,
                soldCount: book?.sold_quantity
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
        <div style={{  margin: "auto" }}>
            <Text style={{ color: "#888888" }}>[ Sách yêu thích ]</Text>
            <Row style={{marginTop: 20}} gutter={[16, 16]}>
                {
                    newBooks?.map(book => {
                        return (
                            <BookCard
                                id = {book.id}
                                link={book.link}
                                key={book.id}
                                image={book.image}
                                title={book.name}
                                author={book.author}
                                price={book.price}
                                soldCount={book.soldCount}
                            />

                        )
                    })
                }
            </Row>
        </div>
    );
};

export default FavoriteBook;
