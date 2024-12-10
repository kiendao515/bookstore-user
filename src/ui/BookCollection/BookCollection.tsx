import Pagination from "@/ui/Pagination/Pagination";
import FilterBar from "../FilterBar";
import { IBookCollectionProps } from "./interface";
import BookCard from "../BookCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import NarrowIcon from "@/icons/NarrowIcon";
import { useState } from "react";
import { Button, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
const { Text } = Typography;

const BookCollection = (props: IBookCollectionProps) => {
    const { extendUrl = "/",
        title,
        books = [],
        havePagination = true,
        filterValues = [],
        hasTitle = false,
        hasHeader = true,
        setBookParams,
        bookParams,
        currentPage = 0,
        firstIndex = 0,
        lastIndex = 0,
        totalElement = 0,
        totalPage = 0,
        isIndividualPage = false,
        searchField,
        isSearch = false,
        hasFilter = false,
        searchText = ''
    } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)
    return (
        <div className="flex">
            <div className={`${!hasTitle ? "2xl:mt-[40px] mt-[20px]" : ""} w-full`} >
                {
                    hasTitle && hasHeader &&
                    <section className="flex items-center justify-between bg-gray-100 p-4 mb-[20px]">
                        <h2 className="text-lg font-semibold text-blue-600">{title}</h2>
                        <div onClick={() => navigate(extendUrl)} className="flex items-center text-blue-600 hover:text-blue-800 cursor-pointer" >
                            Xem thêm <RightOutlined className="ml-1" />
                        </div>
                    </section>
                }
                <div className={`${hasFilter || isSearch ? "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  sm:grid-cols-2 grid-cols-1" : ""} gap-[12px]`}>
                    {hasFilter &&
                        <div className={`xl:col-span-1 lg:col-span-1 md:col-span-2 col-span-1 lg:pt-[20px]`}>
                            <FilterBar filterValues={filterValues} isPage={true} setBookParams={setBookParams} bookParams={bookParams} searchField={searchField} />
                        </div>
                    }
                    {
                        !isMobile && isSearch &&
                        <div className={`xl:col-span-1 md:col-span-2 col-span-1 xl:pt-[43px]`}>
                            {
                                books.length > 0 && (
                                    <div>
                                        <div>
                                            <text className="text-[18px] leading-[21px] font-[400] italic">kết quả tìm kiếm cho:</text>
                                        </div>

                                        <div className="mt-[27px]">
                                            <text className="text-[18px] leading-[21px] font-[400] italic">"{searchText}"</text>
                                        </div>
                                    </div>

                                )
                            }
                            {
                                books.length === 0 && (
                                    <div>
                                        <div>
                                            <text className="text-[18px] leading-[21px] font-[400] italic">không có kết quả</text>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                    <div className={`${(hasFilter || isSearch) ? "xl:col-span-3 lg:col-span-2 md:col-span-4 col-span-1" : ""}`}>
                        {
                            !hasTitle && hasHeader && (
                                <div>
                                    {
                                        !isSearch && (
                                            <div className="mb-[15px]">
                                                <text className="text-[18px] leading-[21px] font-[400] menu-italic text-[#A8A8A8]">{`kết quả ${totalElement > 0 ? firstIndex : 0} - ${lastIndex} trong tổng số ${totalElement}`}</text>
                                            </div>
                                        )
                                    }
                                    {
                                        isSearch && (
                                            <div className="mb-[15px]">
                                                {
                                                    books.length > 0 && !isMobile && (
                                                        <text className="text-[18px] leading-[21px] font-[400] menu-italic text-[#A8A8A8]">{`có ${totalElement} kết quả`}</text>
                                                    )
                                                }
                                                {
                                                    books.length === 0 && (
                                                        <div className="xl:w-1/2 w-full">
                                                            <text className="mobile-regular font-[400]">
                                                                việc search không mang lại kết quả cụ thể, nhưng điều đó không có nghĩa là ở trên website không có quyển sách nào cho bạn, chỉ cần lang thang, đi dạo, tìm kiếm một chập thì kiểu gì cũng thấy (gì đó)
                                                            </text>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )

                                    }
                                </div>

                            )
                        }
                        <div className={`${(hasFilter || isSearch) ? "grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-2" : "grid lg:grid-cols-4 grid-cols-2 lg:gap-y-[24px] gap-y-[10px]"} 2xl:gap-x-[24px] xl:gap-x-[10px] gap-[12px] ${isIndividualPage ? "mt-[30px]" : ""}`}>
                            {
                                books?.map(book => {
                                    return (

                                        <div className="flex justify-center">
                                            <BookCard
                                                link={book.link}
                                                author={book.authorName}
                                                description={book.description}
                                                image={book.image}
                                                type={book.type}
                                                name={book.name}
                                                price={book.price}
                                                quantity={book.quantity}
                                                soldCount={book.soldCount}
                                                id={book.id}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>


                    </div>
                </div>
                {
                    havePagination && (
                        <div className={`flex w-full mt-[48px] justify-end`}>
                            <Pagination current={bookParams?.page || 0} total={totalElement} pageSize={bookParams?.size || 0} onChange={(page, pageSize) => {
                                setSearchParams({ ...Object.fromEntries(searchParams), page: (page - 1).toString() });
                                setBookParams(prev => ({ ...prev, page: page - 1, size: pageSize }));
                            }} />
                        </div>
                    )
                }
            </div >
        </div >
    )
};

export default BookCollection;