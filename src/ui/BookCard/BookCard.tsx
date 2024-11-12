import { HeartOutlined, StarFilled } from "@ant-design/icons";

const BookCard: React.FC<BookCardProps> = ({ image, title, author, price, rating }) => {
    return (
        <div className="max-w-xs rounded-lg border border-gray-200 p-4 shadow-sm">
            <img src={image} alt={title} className="w-full h-64 object-cover rounded-md mb-4" />

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-md font-medium">{title}</h3>
                    <p className="text-sm text-gray-600">{author}</p>
                </div>
                <HeartOutlined className="text-blue-600 text-lg cursor-pointer" />
            </div>

            {/* Price */}
            <p className="text-lg font-semibold text-black mt-2">{price} đ</p>

            {/* Rating and Order Button */}
            <div className="flex items-center justify-between mt-4">
                {/* Rating */}
                <div className="flex items-center text-yellow-500">
                    <StarFilled className="mr-1" />
                    <span className="text-sm">{rating}/5</span>
                </div>

                {/* Order Button */}
                <button className="bg-blue-600 text-white text-sm font-medium py-1 px-4 rounded">
                    Đặt hàng
                </button>
            </div>
        </div>
    );
};

export default BookCard;