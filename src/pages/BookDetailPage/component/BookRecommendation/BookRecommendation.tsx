import { useState } from "react";
import BookCard from "../../../../ui/ItemCard";
import Collection from "@/ui/Collection";

const BookRecommedation = (props: ICollectionProps) => {
  const [newBooks, setNewBooks] = useState<IItemCardProps[]>([
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
    {
      "link": '/book-detail/1',
      "name": "Người vợ cô đơn",
      "image": "/public/assets/images/book.png",
      "author": "Francois-Mauriac",
      "price": 700000,
      "quantity": 1,
      "description": 'Thuộc bộ tranh "Trăm dặm Li Giang" của họa sĩ Huang Ge Sheng, in năm 1986, gồm 47 bức, kích thước...'
    },
  ])


  const [filterValues, setFilterValues] = useState<string[]>([
    "văn học", "triết học", "lịch sử", "nghệ thụật", "ngoại văn", "cổ tích", "thiếu nhi", "tôn giáo", "kiến trúc"
  ])
  return (
    <div>
      <Collection
        title="có thể bạn biết"
        books={newBooks}
        havePagination={true}
        filterValues={filterValues}
        hasTitle={true}
      />
    </div>
  );
};

export default BookRecommedation;
