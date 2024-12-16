import { useEffect, useMemo, useState } from "react";

import NarrowIcon from "@/icons/NarrowIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IBookRelativeProps } from "./interface";
import { IReqParams, useBooks } from "@/api/books";
import BookCollection from "@/ui/BookCollection";
import { ArrowRightOutlined } from "@ant-design/icons";

const BookRelative = (props: IBookRelativeProps) => {
    const { categoryId, currentBookId } = props
    let [searchParams] = useSearchParams();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: 0,
        size: 4,
        category_id: categoryId
    });

    useEffect(() => {
        setBookParams(prevParams => ({
            ...prevParams,
            category_id: categoryId
        }));
    }, [categoryId])

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const page = searchParams.get("page");
        const size = searchParams.get("size");
        if (page) {
            setBookParams(prevParams => ({
                ...prevParams,
                page: Number(page)
            }));
        }
        if (size) {
            setBookParams(prevParams => ({
                ...prevParams,
                size: Number(size)
            }));
        }
    }, [searchParams])

    // Effect to update size based on screen width
    useEffect(() => {
        const updateSize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1280 && screenWidth < 1536) {
                setBookParams(prevParams => ({
                    ...prevParams,
                    size: 6
                }));
            } else {
                setBookParams(prevParams => ({
                    ...prevParams,
                    size: 8
                }));
            }
        };

        // Call updateSize on component mount and on window resize
        updateSize();
        window.addEventListener('resize', updateSize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', updateSize);
        };
    }, []);

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
        <div>
            <section className="flex items-center justify-between bg-gray-100 py-[10px] px-[10px] lg:px-[20px]  rounded-[5px]">
                <h2 className="lg:mobile-regular text-[15px] leading-[21px] font-semibold text-blue-600">{"Có thể bạn quan tâm"}</h2>
                <div onClick={() => navigate(`/category?id=${categoryId}&page=0`)} className="flex text-[15px] leading-[21px] lg:mobile-regular items-center text-blue-600 hover:text-blue-800 cursor-pointer" >
                    Xem thêm <ArrowRightOutlined className="ml-1" />
                </div>
            </section>
            <BookCollection
                books={newBooks}
                bookParams={bookParams}
                setBookParams={setBookParams}
                showFilter={false}
            />
            {
                isMobile && (
                    <div className="w-full h-[35px] flex justify-center items-center gap-[5px] px-[10px] bg-white hover:bg-[#9BC3FF] mobile-regular mt-[30px] hover:cursor-pointer" onClick={() => navigate(`/category?id=${categoryId}&page=0`)}>
                        <NarrowIcon className="w-[15px] h-[14px] fill-current" />
                        tất
                    </div>
                )
            }
        </div>
    );
};

export default BookRelative;
