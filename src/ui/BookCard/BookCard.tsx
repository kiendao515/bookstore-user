import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const BookCard: React.FC<BookCardProps> = ({ image, title, author, price, soldCount, link }) => {
    return (
        <div className="max-w-xs rounded-lg border border-gray-200 p-4 shadow-sm">
            {/* Book Image */}
            <Link to={link}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover rounded-md mb-4"
                />
            </Link>

            {/* Title, Author, and Like Icon */}
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <Link to={link}>
                        <h3 className="text-md font-medium line-clamp-1" title={title}>
                            {title}
                        </h3>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-1" title={author}>
                        {author}
                    </p>
                </div>
                <HeartOutlined className="text-blue-600 text-lg cursor-pointer" />
            </div>

            {/* Price */}
            <p className="text-lg font-semibold text-black mt-2">
                {price.toLocaleString()} đ
            </p>

            {/* Sold Count and Order Button */}
            <div className="flex items-center justify-between mt-4">
                {/* Sold Count */}
                <span className="text-sm text-gray-500">Đã bán {soldCount}</span>

                {/* Order Button */}
                <button className="bg-blue-600 text-white text-sm font-medium py-1 px-4 rounded">
                    Đặt hàng
                </button>
            </div>
        </div>
    );
};

export default BookCard;
