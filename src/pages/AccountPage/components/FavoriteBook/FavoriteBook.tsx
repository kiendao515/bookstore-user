// import { IFavoriteBookProps } from "./interface";
// import { useEffect, useMemo, useState } from "react";
// import { IReqParams } from "@/api/bookStore";
// import { useBookFavorite, useBooks } from "@/api/books";
// import BookCard from "@/ui/user/BookCard";

// const FavoriteBook = (props: IFavoriteBookProps) => {
//     const { } = props;
//     const { bookFavorite } = useBookFavorite()
//     const [bookParams, setBookParams] = useState<IReqParams>({
//         page: 0,
//         size: 12,
//     })
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 1280);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const { books } = useBooks({ ...bookParams, book_search_ids: bookFavorite?.data?.book_ids.map(book => book).join(',') || null });

//     const newBooks = useMemo(() => {
//         return books?.data?.map(book => {
//             const { minPrice, type } = (book?.book_realities?.length > 0
//                 ? book.book_realities.reduce((acc, reality) => {
//                     if (reality.price != null && reality.price < acc.minPrice) {
//                         return { minPrice: reality.price, type: reality.type };
//                     }
//                     return acc;
//                 }, { minPrice: Number.MAX_VALUE, type: "OLD" })
//                 : { minPrice: 0, type: "OLD" });

//             return {
//                 link: `/book-detail/${book?.id}`,
//                 name: book?.name,
//                 price: minPrice,
//                 type: type,
//                 authorId: book?.author?.id,
//                 quantity: book?.book_realities?.length,
//                 description: book?.description || '',
//                 author: book?.author?.name || '',
//                 image: book?.cover_image?.link || '',
//                 id: book?.id
//             };
//         }) || [];
//     }, [books]);

//     return (
//         <div>
//             {
//                 !isMobile && (
//                     <text className="title text-[#888888]">[ sách yêu thích ]</text>
//                 )
//             }
//             <div className="grid grid-cols-2 mt-[30px] pb-[200px] gap-x-[20px]">
//                 {
//                     newBooks?.map((book, index) => {
//                         return (
//                             <div key={index} className="flex justify-center">
//                                 <BookCard
//                                     link={book.link}
//                                     author={book.author}
//                                     description={book.description}
//                                     image={book.image}
//                                     type={book.type}
//                                     name={book.name}
//                                     price={book.price}
//                                     quantity={book.quantity}
//                                     authorId={book.authorId}
//                                     id={book.id}
//                                 />
//                             </div>
//                         );
//                     })
//                 }

//             </div>
//         </div>

//     )
// }

// export default FavoriteBook;