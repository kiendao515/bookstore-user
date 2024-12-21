import { updateBookFavorite } from "@/api/books";
import { useAuthToggle } from "@/context/AuthToggleContext";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { getUser } from "@/store/duck/auth/slice";
import { setBookFavorite } from "@/store/duck/bookFavorite/slice";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { HeartTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TemporaryOut from "../TemporaryOut/TemporaryOut";

const BookCard: React.FC<BookCardProps> = ({ id, image, title, author, price, soldCount, link, quantity = 0 }) => {
    const { toggleAuth } = useAppSelector((state: RootState) => state.togglePopUp)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const { toggleAuthPopup } = useAuthToggle();
    const { bookIds = [] } = useSelector((state: RootState) => state.bookFavorite);
    const [redHeart, setRedHeart] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        if (bookIds.includes(id)) {
            setRedHeart(true);
        } else {
            setRedHeart(false);
        }

    }, [bookIds])


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


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
                    accountId: user.id,
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
        <div className={`flex flex-col w-full relative lg:p-[20px] p-[10px] rounded-[5px] border border-[#D9D9D9] shadow-sm`}>
            <div
                onClick={() => navigate(link)}
                className={`group relative hover:cursor-pointer flex items-center w-full h-0 pb-[100%] overflow-hidden justify-center`}
            >
                {
                    quantity == 0 && (
                        <div className="absolute right-[10px] top-0 z-10 p-[10px]">
                            <TemporaryOut isMobile={isMobile} />
                        </div>
                    )
                }
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover absolute top-0 left-0"
                />
            </div>

            {/* Title, Author, and Like Icon */}
            <div className="flex flex-col lg:pt-[10px] pt-[5px]">
                <div className="flex justify-between items-center gap-[5px]">
                    <div className="mobile-regular lg:text-regular  tracking-normal font-normal hover:cursor-pointer italic line-clamp-1" title={title} onClick={() => navigate(link)}>{title}</div>
                    <div className="w-fit h-full flex items-center justify-end">
                        <HeartTwoTone
                            className="mr-[2px] hover:cursor-pointer w-[20px] h-[20px]"
                            twoToneColor={redHeart ? "#ff0000" : "#d9d9d9"}
                            onClick={handleFavoriteButtonClick}
                            onMouseEnter={() => setRedHeart(true)}
                            onMouseLeave={() => {
                                if (!bookIds.includes(id)) {
                                    setRedHeart(false);
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="w-fit text-[#A8A8A8] mobile-regular hover:cursor-pointer font-normal hover:bg-gray-100" onClick={() => navigate('/book?authorName=' + author + '&search=1')}>{author}</div>

                <p className="mobile-regular font-semibold lg:mt-2">
                    {price.toLocaleString()} đ
                </p>
                <div className="flex lg:flex-row flex-col items-center justify-between mt-[5px] lg:mt-[10px]">
                    <div className="flex justify-start w-full">
                        <span className="text-[16px] leading-[21px] lg:mobile-regular text-gray-500">Đã bán <text className="font-semibold text-black">{soldCount}</text></span>
                    </div>

                    {
                        quantity > 0 && (

                            <button className="bg-[#1890FF] text-white text-sm h-[30px] lg:h-[30px] w-full lg:w-[114px] lg:mt-[0px] mt-[5px]">
                                Đặt hàng
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default BookCard;
