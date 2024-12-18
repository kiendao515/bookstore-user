import { Menu, Layout, Typography, notification, List } from "antd";
import { useNavigate } from "react-router-dom";
import { IMenuBarProps } from "./interface";
import { COOKIES, removeCookies } from "@/utils/cookies";
import { setLogout } from "@/store/duck/auth/slice";
import { useDispatch } from "react-redux";

const { Text } = Typography;

const MenuBar = (props: IMenuBarProps) => {
    const { index, setIndex } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menus = [
        { title: "Thông tin cá nhân", key: 1 },
        { title: "Địa chỉ nhận hàng", key: 2 },
        { title: "Đổi mật khẩu", key: 3 },
        { title: "Sách yêu thích", key: 4 },
        { title: "Đơn hàng", key: 5 },
        { title: "Đăng xuất", key: 6 },
    ];

    const handleMenuClick = ({ key }: { key: number }) => {
        if (key === 6) {
            removeCookies(COOKIES.user);
            removeCookies(COOKIES.token);
            dispatch(setLogout());
            notification.success({ message: "Đăng xuất thành công" });
            navigate("/");
        } else {
            setIndex(key);
            navigate(`/account?index=${key}`);
        }
    };

    return (
        <div className="border border-gray-300 rounded-[5px] ">
            <List
                size="small"
                dataSource={menus}
                renderItem={(menuItem) => {
                    return (
                        <List.Item
                            onClick={() => handleMenuClick({ key: menuItem.key })}
                            style={{
                                backgroundColor: menuItem.key == index ? '#E6F7FF' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                borderRadius: '5px',
                            }}
                            className={`hover:bg-[#bae7ff] ${menuItem.key == index ? 'ant-list-item-selected' : ''}`}
                        >
                            <Text
                                strong={menuItem.key == index}
                                className="text-[16px]"
                                style={{ color: menuItem.key == index ? '#1890ff' : 'inherit' }}
                            >
                                {menuItem.title}
                            </Text>
                        </List.Item>
                    );
                }}
            />
        </div>
    );
};

export default MenuBar;
