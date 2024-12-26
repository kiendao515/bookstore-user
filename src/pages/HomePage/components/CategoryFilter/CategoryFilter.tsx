import { useEffect, useMemo, useState } from "react";
import { useCategories } from "@/api/category";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IReqParams, useBooks } from "@/api/books";
import { IFilterValue } from "@/ui/FilterBar/interface";
import BookCollection from "@/ui/BookCollection";
import { ArrowRightOutlined } from "@ant-design/icons";

const CategoryFilter = () => {
    const [searchParams] = useSearchParams();
    const [bookParams, setBookParams] = useState<IReqParams>({
        page: parseInt(searchParams.get("page") || "0"),
        size: 36
    })
    const navigate = useNavigate()

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

    const { categories } = useCategories({ sort_by: "numOfBooks", order_by: "DESC" });
    const filterValues = useMemo(() => {
        const result: IFilterValue[] = []
        categories?.data?.map((category) => {
            result.push({
                id: category.id,
                label: category.name,
                quantity: category.num_of_books
            })

        })
        return result;
    }, [categories])

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
                authorName: book?.author_name || '',
                image: book?.cover_image || '',
                id: book?.id,
                soldCount: book?.sold_quantity
            };
        }) || [];
    }, [books]);
    return (
        <div className="w-full">
            <section className="flex items-center justify-between bg-gray-100 py-[10px] px-[10px] lg:px-[20px]  rounded-[5px]">
                <h2 className="lg:mobile-regular text-[15px] leading-[21px] font-semibold text-blue-600">{"Thể loại"}</h2>
                <div onClick={() => navigate("/collections?page=0")} className="flex text-[15px] leading-[21px] lg:mobile-regular items-center text-blue-600 hover:text-blue-800 cursor-pointer" >
                    Xem thêm <ArrowRightOutlined className="ml-1" />
                </div>
            </section>

            <div className="mt-[20px] lg:mt-[40px]">
                <BookCollection
                    books={newBooks}
                    setBookParams={setBookParams}
                    bookParams={bookParams}
                    filterValues={filterValues}
                    totalElements={books?.total_elements}
                    showFilter={true}
                />

            </div>
        </div>
    )
};

export default CategoryFilter;