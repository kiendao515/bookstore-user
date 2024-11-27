import { IReqParams, useBooks } from "@/api/books";
import BookCard from "@/ui/BookCard";
import { RightOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";


const BookCollection = (props: IBookCollectionProps) => {
    const { title } = props;
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 8,
        created_at: "",
        updated_at: ""
    });
    const { books } = useBooks({ ...bookParams });
    const newBooks = useMemo(() => {
        return books?.data?.map(book => {
            const validInventories = book?.book_inventories?.filter(inventory => inventory.price > 0) || [];

            // Find the minimum price and its type
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
                // authorId: book?.author?.id,
                quantity: book?.number_of_books,
                description: book?.description || '',
                author: book?.author_name || '',
                image: book?.cover_image || '',
                id: book?.id,
                soldCount: book?.sold_quantity
            };
        }) || [];
    }, [books]);

    return (
        <div className="p-8">
            <section className="flex items-center justify-between bg-gray-100 p-4 mt-[100px] mb-[64px]">
                <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                <a href="#more" className="flex items-center text-blue-600 hover:text-blue-800">
                    Xem thêm <RightOutlined className="ml-1" />
                </a>
            </section>
            <div className="grid grid-cols-4 gap-[25px]">
                {
                    newBooks?.map(book => {
                        return (
                            <BookCard
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
            </div>
        </div>
    )
};

export default BookCollection;