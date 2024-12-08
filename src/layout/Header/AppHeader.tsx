import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { getUser } from "@/store/duck/auth/slice";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const AppHeader = (props: IHeaderProps) => {
    const { } = props;
    const [count, setCount] = useState<number>(0);
    const cart = useAppSelector((state: RootState) => state.cart.items);
    const { toggleAuth } = useAppSelector((state: RootState) => state.togglePopUp);
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const navigate = useNavigate()

    useEffect(() => {
        setCount(cart.length);
    }, [cart]);


    return (
        <Header
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#fff",
                padding: "0 20px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Logo Section */}
            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="assets/icons/box_logo.svg"
                        alt="Logo"
                        style={{ width: "40px", height: "40px" }}
                        onClick={()=>navigate('/')}
                    />
                </div>
                {/* Navigation */}
                <Menu mode="horizontal" style={{ borderBottom: "none" }}>
                    <Menu.Item key="1" onClick={() => navigate("/introduction")}>
                        <span style={{ color: "#1677ff", fontWeight: "600" }}>Giới thiệu</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => navigate("/category")}>
                        Thể loại
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => navigate("/collection")}>
                        Bộ sưu tập
                    </Menu.Item>
                    <Menu.Item key="4">
                        Liên hệ ký gửi
                    </Menu.Item>
                    <Menu.Item key="5">
                        Nhận tìm sách
                    </Menu.Item>
                </Menu>
            </div>

            {/* User Action Section */}
            <Space size="large" align="center">
                <HeartOutlined style={{ fontSize: "20px", color: "#1677ff" }} />
                <ShoppingCartOutlined
                    style={{ fontSize: "20px", color: "#1677ff" }}
                    onClick={() => navigate("/cart")}
                />
                {user.id === "" ? (
                    <UserOutlined
                        style={{ fontSize: "20px", color: "#1677ff" }}
                        onClick={() =>
                            dispatch(setToggleByKey({ key: "toggleAuth", value: !toggleAuth }))
                        }
                    />
                ) : (
                    <UserOutlined
                        style={{ fontSize: "20px", color: "#1677ff" }}
                        onClick={() => navigate("/account")}
                    />
                )}
            </Space>
        </Header>
    )
}

export default AppHeader;