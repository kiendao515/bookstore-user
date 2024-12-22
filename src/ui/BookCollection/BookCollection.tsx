import Pagination from "@/ui/Pagination/Pagination";
import FilterBar from "../FilterBar";
import { IBookCollectionProps } from "./interface";
import BookCard from "../BookCard";
import { useSearchParams } from "react-router-dom";

const BookCollection = (props: IBookCollectionProps) => {
  const { filterValues = [], setBookParams, bookParams, books = [], searchField = "", totalElements = 0, showFilter = true } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(books);
  
  return (
    <div>
      <div className="grid relative grid-cols-1 lg:grid-cols-4 lg:gap-5 col-span-1 mt-[20px] lg:mt-[40px]">
        {
          showFilter && (
            <div className="col-span-1 lg:sticky lg:top-[90px]">
              <FilterBar filterValues={filterValues} setBookParams={setBookParams} bookParams={bookParams} searchField={searchField} />
            </div>
          )
        }
        <div className={`${showFilter ? "col-span-3 lg:grid-cols-3" : "col-span-4 lg:grid-cols-4"} grid-cols-2 grid lg:gap-y-[24px] gap-y-[10px] 2xl:gap-x-[24px] xl:gap-x-[10px] gap-[12px] mt-[20px] lg:mt-[0px]`}>
          {
            books?.map(book => {
              return (
                <BookCard
                  book = {book}
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
      <div className={`flex w-full mt-[48px] justify-end`}>
        <Pagination current={bookParams?.page || 0} total={totalElements} pageSize={bookParams?.size || 0} onChange={(page, pageSize) => {
          setSearchParams({ ...Object.fromEntries(searchParams), page: (page - 1).toString() });
          setBookParams(prev => ({ ...prev, page: page - 1, size: pageSize }));
        }} />
      </div>
    </div >
  )
};

export default BookCollection;