import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { IMenuBarMobileProps } from "./interface";
import { COOKIES, removeCookies } from "@/utils/cookies";
import { useDispatch } from "react-redux";
import { setLogout } from "@/store/duck/auth/slice";
import toast from "react-hot-toast";

const MenuBarMobile = (props: IMenuBarMobileProps) => {
    const { index, setIndex } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const menus = [
        { title: "Thông tin cá nhân", key: "1" },
        { title: "Địa chỉ nhận hàng", key: "2" },
        { title: "Đổi mật khẩu", key: "3" },
        { title: "Sách yêu thích", key: "4" },
        { title: "Đơn hàng", key: "5" },
    ];

    const handleMenuClick = ({ key }: { key: string }) => {
        if (key === "logout") {
            removeCookies(COOKIES.user);
            removeCookies(COOKIES.token);
            dispatch(setLogout());
            toast.success("Đăng xuất thành công");
            navigate("/");
        } else {
            setIndex(parseInt(key, 10));
            navigate(`/account?index=${key}`);
        }
    };

    return (
        <Menu
            mode="horizontal"
            selectedKeys={[index.toString()]}
            onClick={handleMenuClick}
            style={{
                borderBottom: "1px solid #8C8C8C",
                overflowX: "auto",
                whiteSpace: "nowrap",
                backgroundColor: "var(--bg-layout-color)",
            }}
            className="z-20"
        >
            {menus.map((menuItem) => (
                <Menu.Item key={menuItem.key} style={{ fontSize: "18px" }}>
                    {menuItem.title}
                </Menu.Item>
            ))}
            <Menu.Item key="logout" style={{ fontSize: "18px" }}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );
};

export default MenuBarMobile;
