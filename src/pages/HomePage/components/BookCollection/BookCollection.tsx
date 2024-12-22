import { IReqParams, useBooks } from "@/api/books";
import BookCard from "@/ui/BookCard";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";


const BookCollection = (props: IBookCollectionProps) => {
    const { title, extendUrl } = props;
    const navigate = useNavigate()

    const [bookParams] = useState<IReqParams>({
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
                bookInventory: book?.book_inventories,
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
        <div className="w-full">
            <section className="flex items-center justify-between bg-gray-100 py-[10px] px-[10px] lg:px-[20px]  rounded-[5px]">
                <h2 className="lg:mobile-regular text-[15px] leading-[21px] font-semibold text-blue-600">{title}</h2>
                <div onClick={() => navigate(extendUrl)} className="flex text-[15px] leading-[21px] lg:mobile-regular items-center text-blue-600 hover:text-blue-800 cursor-pointer" >
                    Xem thêm <ArrowRightOutlined className="ml-1" />
                </div>
            </section>
            <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-y-[24px] gap-y-[10px] 2xl:gap-x-[24px] xl:gap-x-[10px] gap-[12px] mt-[20px] lg:mt-[40px]">
                {
                    newBooks?.map(book => {
                        return (
                            <BookCard
                                book={book.bookInventory}
                                id={book.id}
                                link={book.link}
                                key={book.id}
                                image={book.image}
                                title={book.name}
                                author={book.author}
                                price={book.price}
                                soldCount={book.soldCount}
                                quantity={book.quantity}
                            />

                        )
                    })
                }
            </div>
        </div >
    )
};

export default BookCollection;