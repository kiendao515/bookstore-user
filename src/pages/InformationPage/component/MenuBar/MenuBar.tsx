import { useNavigate } from "react-router-dom";
import { IMenuBarProps } from "./interface";
import { List, Typography } from "antd";

const { Text } = Typography;

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
        <div className="border border-gray-300 rounded-[5px] ">
            <List
                size="small"
                dataSource={menus}
                renderItem={(menuItem) => {
                    return (
                        <List.Item
                            onClick={() => {
                                navigate("/introduction?index=" + menuItem.index)
                                setIndex(menuItem.index)
                            }}
                            style={{
                                backgroundColor: menuItem.index == index ? '#E6F7FF' : '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                borderRadius: '5px',
                            }}
                            className={`hover:bg-[#bae7ff] ${menuItem.index == index ? 'ant-list-item-selected' : ''}`}
                        >
                            <Text
                                strong={menuItem.index == index}
                                className="text-[16px]"
                                style={{ color: menuItem.index == index ? '#1890ff' : 'inherit' }}
                            >
                                {menuItem.title}
                            </Text>
                        </List.Item>
                    );
                }}
            />

        </div>
    )
}

export default MenuBar;