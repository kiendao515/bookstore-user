import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { RootState } from "@/store";
import { getUser } from "@/store/duck/auth/slice";
import { setToggleByKey } from "@/store/duck/togglePopUp/slice";
import { HeartOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { Header } = Layout;

const AppHeader = (props: IHeaderProps) => {
    const { } = props;
    const { toggleAuth } = useAppSelector((state: RootState) => state.togglePopUp);
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    console.log("user", user)
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="fixed top-0 w-full z-[50]">
            <div
                className="flex  justify-between 2xl:w-[1500px] 2xl:mx-[auto] xl:w-[1149px] xl:mx-auto lg:mx-[50px] mx-[19px]"
                style={{ backgroundColor: "#fff", boxShadow: "0 2px 0px rgba(0, 0, 0, 0.1)" }}
            >
                <Header
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0",
                        backgroundColor: "#fff",
                        borderBottom: "0px",

                    }}
                >
                    {/* Logo Section */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        whiteSpace: "normal", // Ensure text wraps to the next line
                        overflow: "visible",  // Ensure full visibility of content
                        textOverflow: "unset",
                    }}>
                        <div
                            style={{
                                width: "50px",
                                height: "50px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                marginRight: "20px"
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
                        <div className="flex gap-[20px]">
                            <div key="1" onClick={() => navigate("/introduction")} className="hover:cursor-pointer text-[15px]">
                                <span className={`${location.pathname?.includes("/introduction") ? "text-[#1677ff]" : ""}`}>Giới thiệu</span>
                            </div>
                            <div key="2" onClick={() => navigate("/category")} className="hover:cursor-pointer text-[15px]">
                                <span className={`${location.pathname?.includes("/category") ? "text-[#1677ff]" : ""}`}>Thể loại</span>
                            </div>
                            <div key="3" onClick={() => navigate("/collection")} className="hover:cursor-pointer text-[15px]">
                                <span className={`${location.pathname?.includes("/collection") ? "text-[#1677ff]" : ""}`}>Bộ sưu tập</span>
                            </div>
                        </div>
                    </div>

                </Header>
                <div className="flex gap-[10px] items-center">
                    <HeartOutlined style={{ fontSize: "20px", color: "#1677ff" }} onClick={() => navigate("/account?index=4")} />
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
                        <div className="text-[15px] text-blue-700 font-semibold hover:cursor-pointer" onClick={() => navigate("/account")}>{user.name}</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AppHeader;