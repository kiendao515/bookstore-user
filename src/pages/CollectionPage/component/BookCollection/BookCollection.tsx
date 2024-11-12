import Pagination from "@/ui/Pagination/Pagination";
import BookCard from "../../../../ui/BookCard";

const BookCollection = (props: IBookCollectionProps) => {
    const { title } = props;
    return (
        <div>
            <div>
                <div className="pb-[14px]" >
                    <text className="italic text-[#A8A8A8]">{title}</text>
                </div>
                <div className="grid grid-cols-3 gap-[25px]">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                            return (
                                <BookCard key={i} />

                            )
                        })
                    }
                </div>
                <div className="flex justify-end">
                    <Pagination />
                </div>


            </div>
        </div>
    )
};

export default BookCollection;