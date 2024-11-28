import { updateBookFavorite } from "@/api/books";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { getUser } from "@/store/duck/auth/slice";
import { setBookFavorite } from "@/store/duck/bookFavorite/slice";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const BookCard: React.FC<BookCardProps> = ({ id, image, title, author, price, soldCount, link }) => {
    const { toggleCart, toggleAuth } = useAppSelector((state: RootState) => state.togglePopUp)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const { toggleAuthPopup } = useAuthToggle();
    const { bookIds = [] } = useSelector((state: RootState) => state.bookFavorite);
    const [redHeart, setRedHeart] = useState(false);
    useEffect(() => {
        if (bookIds.includes(id)) {
            setRedHeart(true);
        } else {
            setRedHeart(false);
        }

    }, [bookIds])

    const { mutate } = useMutation(updateBookFavorite, {
        onSuccess: async (data) => {
            if (data.result) {
                let newBookIds = [...bookIds]
                if (bookIds.includes(id)) {
                    newBookIds = newBookIds.filter((bookId) => bookId !== id);
                } else {
                    newBookIds.push(id);
                }
                dispatch(setBookFavorite({
                    userId: user.id,
                    bookIds: newBookIds
                }));
            } else {
                console.error('Failed to update favorite books:', data.reason);
            }
        },
        onError: (error) => {
            console.error('Error updating favorite books:', error);
        }
    });

    const handleFavoriteButtonClick = () => {
        if (user.id === "") {
            toggleAuthPopup();
            dispatch(setToggleByKey({
                key: "toggleAuth",
                value: !toggleAuth
            }))
        } else {
            mutate(id);
        }
    };
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
                <HeartTwoTone twoToneColor={redHeart ? "#eb2f96" : "#d9d9d9"} onClick={handleFavoriteButtonClick}
                    onMouseEnter={() => setRedHeart(true)}
                    onMouseLeave={() => {
                        if (!bookIds.includes(id)) {
                            setRedHeart(false);
                        }
                    }} />
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
