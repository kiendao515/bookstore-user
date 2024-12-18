import { useNavigate } from "react-router-dom";
import { IMenuBarMobileProps } from "./interface";
import { Typography } from "antd";

const { Text } = Typography;

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
    ];

    return (
        <div
            className="border border-x-0 border-gray-300 overflow-x-auto whitespace-nowrap no-scrollbar"
            style={{
                display: "flex",
            }}
        >
            {menus.map((menuItem) => (
                <div
                    key={menuItem.index}
                    onClick={() => {
                        navigate("/introduction?index=" + menuItem.index);
                        setIndex(menuItem.index);
                    }}
                    style={{
                        backgroundColor: menuItem.index === index ? '#E6F7FF' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        padding: '10px 5px',
                        textAlign: 'center',
                        margin: '0', // Add spacing between items
                        whiteSpace: 'nowrap',
                        width: '100%',
                    }}
                    className={`hover:bg-[#bae7ff] ${menuItem.index === index ? 'ant-list-item-selected' : ''}`}
                >
                    <Text
                        strong={menuItem.index === index}
                        className="text-[16px]"
                        style={{ color: menuItem.index === index ? '#1890ff' : 'inherit' }}
                    >
                        {menuItem.title}
                    </Text>
                </div>
            ))}
        </div>
    );
};

export default MenuBarMobile;
