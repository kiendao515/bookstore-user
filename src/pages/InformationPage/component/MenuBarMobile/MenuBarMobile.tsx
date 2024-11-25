import { useNavigate } from "react-router-dom";
import { IMenuBarMobileProps } from "./interface";

const MenuBarMobile = (props: IMenuBarMobileProps) => {
    const { index, setIndex } = props;
    const navigate = useNavigate();
    const menus = [
        {
            title: "giới thiệu",
            index: 1
        },
        {
            title: "chính sách mua hàng - bảo mật",
            index: 2
        },
        {
            title: "khiếu nại",
            index: 3
        },
    ]
    return (
        <div className="flex items-center border-b-[1px] border-[#8C8C8C] border-solid overflow-x-auto gap-[25px] no-scrollbar py-[10px] bg-layout">
            {
                menus.map(menuItem => {
                    return (
                        <div className={`hover:cursor-pointer w-fit ${index == menuItem.index ? "bg-neon " : "hover:bg-[#9BC3FF]"}`} onClick={() => {
                            navigate("/introduction?index=" + menuItem.index)
                            setIndex(menuItem.index)
                        }}>
                            <text className="xt-[19px] leading-[26px] text-nowrap">{menuItem.title}</text>
                        </div>

                    )
                })
            }
        </div>
    )
}

export default MenuBarMobile;