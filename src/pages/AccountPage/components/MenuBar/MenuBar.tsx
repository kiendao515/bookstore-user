import { Menu, Layout, Typography, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { IMenuBarProps } from "./interface";
import { COOKIES, removeCookies } from "@/utils/cookies";
import { setLogout } from "@/store/duck/auth/slice";
import { useDispatch } from "react-redux";

const { Sider } = Layout;
const { Text } = Typography;

const MenuBar = (props: IMenuBarProps) => {
    const { index, setIndex } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menus = [
        { title: "Thông tin cá nhân", key: "1" },
        { title: "Địa chỉ nhận hàng", key: "2" },
        { title: "Đổi mật khẩu", key: "3" },
        { title: "Sách yêu thích", key: "4" },
        { title: "Đơn hàng", key: "5" },
        { title: "Đăng xuất", key: "logout" },
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "logout") {
            removeCookies(COOKIES.user);
            removeCookies(COOKIES.token);
            dispatch(setLogout());
            notification.success({ message: "Đăng xuất thành công" });
            navigate("/");
        } else {
            setIndex(parseInt(key, 10));
            navigate(`/account?index=${key}`);
        }
    };

    return (
        <Sider width="240">
            <Menu
                mode="inline"
                selectedKeys={[index.toString()]}
                onClick={handleMenuClick}
                style={{ border: "none" }}
            >
                {menus.map((menu) => (
                    <Menu.Item key={menu.key} style={{ fontSize: "16px" }}>
                        {menu.title}
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default MenuBar;
