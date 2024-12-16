import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { getUser } from "@/store/duck/auth/slice";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { Header } = Layout;

const AppHeader = (props: IHeaderProps) => {
    const { } = props;
    const { toggleAuth } = useAppSelector((state: RootState) => state.togglePopUp);
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="fixed top-0 w-full z-[50]">
            <div
                className="w-full flex justify-center"
                style={{ backgroundColor: "#fff", boxShadow: "0 2px 0px rgba(0, 0, 0, 0.1)" }}
            >
                <Header
                    className="2xl:w-[1500px]"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0",
                        backgroundColor: "#fff",
                        borderBottom: "0px"
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
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="/assets/icons/box_logo.svg"
                                alt="Logo"
                                style={{ width: "50px", height: "50px" }}
                                onClick={() => navigate('/')}
                            />
                        </div>
                        {/* Navigation */}
                        <Menu mode="horizontal" style={{ borderBottom: "none" }}>
                            <Menu.Item key="1" onClick={() => navigate("/introduction")}>
                                <span className={`${location.pathname?.includes("/introduction") ? "text-[#1677ff] font-[600]" : ""}`}>Giới thiệu</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => navigate("/category")}>
                                <span className={`${location.pathname?.includes("/category") ? "text-[#1677ff] font-[600]" : ""}`}>Thể loại</span>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => navigate("/collection")}>
                                <span className={`${location.pathname?.includes("/collection") ? "text-[#1677ff] font-[600]" : ""}`}>Bộ sưu tập</span>
                            </Menu.Item>
                            <Menu.Item key="4" onClick={() => navigate("/book-consignment")}>
                                Liên hệ ký gửi
                            </Menu.Item>
                            {/* <Menu.Item key="5">
                        Nhận tìm sách
                    </Menu.Item> */}
                        </Menu>
                    </div>

                    {/* User Action Section */}
                    <div className="flex gap-[10px]">
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
                    </div>
                </Header>
            </div>
        </div>
    )
}

export default AppHeader;