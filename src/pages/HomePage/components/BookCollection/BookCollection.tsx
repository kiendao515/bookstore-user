import BookCard from "@/ui/BookCard";
import { RightOutlined } from "@ant-design/icons";


const BookCollection = (props: IBookCollectionProps) => {
    const { title } = props;
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
                    [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
                        return (
                            <BookCard key={i} image="assets/images/book.png"
                                title="Người vợ cô đơn"
                                author="(Francois-Mauriac)"
                                price="700.000"
                                rating={4.5} />

                        )
                    })
                }
            </div>
        </div>
    )
};

export default BookCollection;