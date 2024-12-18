import { useNavigate } from "react-router-dom";
import { IMenuBarMobileProps } from "./interface";
import { COOKIES, removeCookies } from "@/utils/cookies";
import { useDispatch } from "react-redux";
import { setLogout } from "@/store/duck/auth/slice";
import toast from "react-hot-toast";
import { Typography } from "antd";
const { Text } = Typography;

const MenuBarMobile = (props: IMenuBarMobileProps) => {
    const { index, setIndex } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menus = [
        { title: "Thông tin cá nhân", key: 1 },
        { title: "Địa chỉ nhận hàng", key: 2 },
        { title: "Đổi mật khẩu", key: 3 },
        { title: "Sách yêu thích", key: 4 },
        { title: "Đơn hàng", key: 5 },
    ];

    const handleMenuClick = ({ key }: { key: number }) => {
        if (key === 6) {
            removeCookies(COOKIES.user);
            removeCookies(COOKIES.token);
            dispatch(setLogout());
            toast.success("Đăng xuất thành công");
            navigate("/");
        } else {
            setIndex(key);
            navigate(`/account?index=${key}`);
        }
    };

    return (
        <div
            className="border border-x-0 border-gray-300 overflow-x-auto whitespace-nowrap no-scrollbar"
            style={{
                display: "flex",
            }}
        >
            {menus.map((menuItem) => (
                <div
                    key={menuItem.key}
                    onClick={() => handleMenuClick({ key: menuItem.key })}
                    style={{
                        backgroundColor: menuItem.key === index ? '#E6F7FF' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        padding: '10px 5px',
                        textAlign: 'center',
                        margin: '0', // Add spacing between items
                        whiteSpace: 'nowrap',
                        width: '100%',
                    }}
                    className={`hover:bg-[#bae7ff] ${menuItem.key === index ? 'ant-list-item-selected' : ''}`}
                >
                    <Text
                        strong={menuItem.key === index}
                        className="text-[16px]"
                        style={{ color: menuItem.key === index ? '#1890ff' : 'inherit' }}
                    >
                        {menuItem.title}
                    </Text>
                </div>
            ))}

        </div>
    );
};

export default MenuBarMobile;
