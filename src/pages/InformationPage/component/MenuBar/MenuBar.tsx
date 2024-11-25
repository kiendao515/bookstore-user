import { useNavigate } from "react-router-dom";
import { IMenuBarProps } from "./interface";

const MenuBar = (props: IMenuBarProps) => {
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
        <div className="sticky top-[130px]">
            <div className={"flex flex-col gap-[2px] w-full mt-[30px]"}>
                {
                    menus.map(menuItem => {
                        return (
                            <div className={`hover:cursor-pointer w-fit ${index == menuItem.index ? "bg-neon" : "hover:bg-[#9BC3FF]"}`} onClick={() => {
                                navigate("/introduction?index=" + menuItem.index)
                                setIndex(menuItem.index)
                            }}>
                                <text className="text-[18px]">{menuItem.title}</text>
                            </div>

                        )
                    })
                }
            </div >

        </div>
    )
}

export default MenuBar;